import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { PagenotFoundComponent } from './components/pagenot-found/pagenot-found.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

@NgModule({
  declarations: [
    ValidationMessageComponent,
    HeaderComponent,
    LeftSidebarComponent,
    PagenotFoundComponent,
  ],
  imports: [CommonModule, TranslateModule],
  exports: [
    ValidationMessageComponent,
    HeaderComponent,
    LeftSidebarComponent,
    PagenotFoundComponent,
  ],
  providers: [],
})
export class SharedModule {}
