import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { JadvalComponent } from './jadval/jadval.component';

const routes: Routes = [
  {path: "", redirectTo: 'jadval', pathMatch: "full"},
  {path: "jadval", component: JadvalComponent},
  {path: "qoshish", component: AddComponent},
  {path: "edit/:id", component: AddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
