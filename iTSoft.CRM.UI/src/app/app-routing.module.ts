import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { AboutComponent } from './about';
import { AuthGuard } from './_guard';
import { NotFoundPageComponent } from './notfoundpage';
import { LoginComponent } from './login';
import { LoadingComponent } from './loading';


// const routes: Routes = [];

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "loading",
    component: LoadingComponent,
  },
  {
    path: "dashboard",
    loadChildren: () =>
    import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  , canActivate: [AuthGuard]
  },
  {
    path: "followup",
    loadChildren: () =>
      import('./followup/followup.module').then(m => m.FollowupModule)
    , canActivate: [AuthGuard]
  },
  {
    path: "about",
    component: AboutComponent
    , canActivate: [AuthGuard]
  },
  {
    path: "masters",
    loadChildren: () =>
      import('./masters/masters.module').then(m => m.MastersModule)
    , canActivate: [AuthGuard]
  },
  {
    path: "quotations",
    loadChildren: () =>
      import('./quotation/quotation.module').then(m => m.QuotationModule)
    , canActivate: [AuthGuard]
  },
  {
    path: "organizations",
    loadChildren: () =>
      import('./organization/organization.module').then(m => m.OrganizationModule)
    , canActivate: [AuthGuard]
  },
  {
    path: "employees",
    loadChildren: () =>
      import('./employee/employee.module').then(m => m.EmployeeModule)
    , canActivate: [AuthGuard]
  },
  {
    path: "clients",
    loadChildren: () =>
      import('./masters/client/client.module').then(m => m.ClientModule)
    , canActivate: [AuthGuard]
  },
  {
    path: "enquiries",
    loadChildren: () =>
      import('./enquiry/enquiry.module').then(m => m.EnquiryModule)
    , canActivate: [AuthGuard]
  },
  // {
  //   path: "orders",
  //   loadChildren: () =>
  //     import('./order/order.module').then(m => m.OrderModule)
  //   , canActivate: [AuthGuard]
  // },
  // {
  //   path: "products",
  //   loadChildren: () =>
  //     import('./product/product.module').then(m => m.ProductModule)
  //   , canActivate: [AuthGuard]
  // },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: "**",
    component: NotFoundPageComponent
  },
  
  // ]
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
