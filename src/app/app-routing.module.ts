import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'person',
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule)
  },
  {
    path: 'person-addresses/:id',
    loadChildren: () => import('./address/address.module').then(m => m.AddressModule)
  },
  {path: "**", redirectTo: "person", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
