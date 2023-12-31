import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonSearchComponent } from './person-search/person-search.component';

const routes: Routes = [  
  {
    path: '',
    component: PersonSearchComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
