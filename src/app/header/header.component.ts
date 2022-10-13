import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];

  constructor(private route: Router, private prodcutService: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((value: any) => {
      //console.warn(value.url)
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          console.warn("in seller area");
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }
        else {
          //console.warn("outside seller");
          this.menuType = 'default';
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProduct(queryData: KeyboardEvent) {
    if (queryData) {
      const element = queryData.target as HTMLTextAreaElement;
      //console.warn(element.value);
      this.prodcutService.searchProduct(element.value).subscribe((data) => {
        //console.warn(data);
        if (data.length > 5) {
          data.length = 5;
        }
        this.searchResult = data;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(data: string) {
    //console.warn(data);
    this.route.navigate([`search/${data}`]);
  }

  redirectToDown(id: number) {
    this.route.navigate(['/details/' + id]);

  }
}
