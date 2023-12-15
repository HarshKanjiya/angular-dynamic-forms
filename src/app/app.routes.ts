import { Routes } from '@angular/router';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ViewformComponent } from './components/viewform/viewform.component';
import { ResComponent } from './components/res/res.component';

export const routes: Routes = [
  {
    path: "", component: CreateFormComponent
  },
  {
    path: "view", component: ViewformComponent
  },
  {
    path: "res", component: ResComponent
  },

];
