import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SellingAuthComponent } from './selling-auth/selling-auth.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'seller-auth', component: SellingAuthComponent
  },
  {
    path: 'seller-home', component: SellerHomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [AuthGuard]
  },
  {
    path: 'seller-update-product/:id', component: SellerUpdateProductComponent, canActivate: [AuthGuard]
  },
  {
    path: 'search/:query', component: SearchComponent
  },
  {
    path: 'details/:productId', component: DetailsComponent
  },
  {
    path: 'user-auth', component: UserAuthComponent
  },
  {
    path: 'cart-page', component: CartPageComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'myorder', component: MyOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
