import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: product[] | undefined;
  prodMsg = '';
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query');
    console.warn(query);

    query && this.productService.searchProduct(query).
      subscribe((result) => {
        this.searchResult = result;
        //this.prodMsg = "";

        if (this.searchResult == null) {
          this.prodMsg = 'Product Not Found!!';
        }
        //this.prodMsg = "";
      })
  }
}
