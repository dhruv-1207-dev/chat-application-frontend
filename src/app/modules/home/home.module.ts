import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

// import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    // DashboardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    
    SharedModule,
    TranslateModule,
  ]
})
export class HomeModule { }
