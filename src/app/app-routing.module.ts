import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {Level1Component} from './level1/level1.component';
import {TestComponent} from './test/test.component';
import {HeaderComponent} from "./header/header.component";
import {AuthGuard} from './auth.guard';




const appRoutes: Routes = [
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard], children: [
      {path: 'level', component: Level1Component},
      {path: 'test', component: TestComponent}
    ]},
  {path: '', component: HeaderComponent}
];


@NgModule({

  imports: [
    RouterModule.forRoot(appRoutes)
  ],

  exports: [RouterModule]

})

export class AppRoutingModule { }
