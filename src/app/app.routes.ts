import {Routes} from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/signal-form',
    pathMatch: 'full',
  },
  {
    path: 'signal-form',
    loadComponent: () =>
      import('./pages/customers/customer-create-form/customer-create-form')
        .then(m => m.CustomerCreateForm),

  }
];
