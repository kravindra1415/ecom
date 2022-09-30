import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { product } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})

export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  @ViewChild('addProd') addProductForm: NgForm | undefined;
  //addProd => is the template reference variable of the addProduct form 
  constructor(private addProductService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct(data: product) {
    this.addProductService.addProduct(data).subscribe((response) => {
      console.warn(response);
      if (response) {
        this.addProductMessage = "Product is added Successfully.."
      }
      setTimeout(() => this.addProductMessage = undefined, 3000)

      //to reset the via viewchild
      this.addProductForm?.resetForm();
    })
  }
}
