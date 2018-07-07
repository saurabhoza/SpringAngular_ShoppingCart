import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
     {
         path: 'home',
         loadChildren: 'app/application/home/home.module#HomeModule'
         //loadChildren: () => HomeModule
     },
    {
        path: 'dashboard',
        loadChildren: 'app/application/dashboard/dashboard.module#DashboardModule'
        //loadChildren: () => DashboardModule
    },
    {
        path: 'registration',
        loadChildren: 'app/application/registration/registration.module#RegistrationModule'
        //loadChildren: () => RegistrationModule
    },
    {
        path: 'payment',
        loadChildren: 'app/application/payment/payment.module#PaymentModule'
        //loadChildren: () => RegistrationModule
    },

];
