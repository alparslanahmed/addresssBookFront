import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PersonComponent} from "./person.component";

const routes: Routes = [
  {path: '', component: PersonComponent},
  {path: "**", redirectTo: "", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule {
}
