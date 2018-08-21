import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  { path: '',								redirectTo: 'formelements/datepicker', 		pathMatch: 'full' },
  { path: 'formelements/datepicker',					redirectTo: 'formelements/datepicker', 	pathMatch: 'full' },
  { path: '**',								redirectTo: 'exception/404', 	pathMatch: 'full' },
  { path: 'formelements/textinput', 		redirectTo: 'formelements/textinput', }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
