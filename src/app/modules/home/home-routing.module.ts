import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotFoundComponent } from 'src/app/shared/components/pagenot-found/pagenot-found.component';
import { HomeComponent } from './home.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'chat/:id',
        component: ChatComponent,
      },
      {
        path: '**',
        component: PagenotFoundComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
