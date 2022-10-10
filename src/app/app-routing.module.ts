import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SellingAuthComponent } from './selling-auth/selling-auth.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
