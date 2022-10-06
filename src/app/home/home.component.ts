import { Component, OnInit } from '@angular/core';
import { product } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];

  constructor(private prodcutService: ProductService) { }

  ngOnInit(): void {
    this.prodcutService.popularProducts().subscribe((response) => {
      console.warn(response);
      this.popularProducts = response;
    });

    this.prodcutService.trendyProducts().subscribe((response) => {
      this.trendyProducts = response;
    });
  }

}
