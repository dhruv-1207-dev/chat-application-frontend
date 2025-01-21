import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { PagenotFoundComponent } from './components/pagenot-found/pagenot-found.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

@NgModule({
  declarations: [
    ValidationMessageComponent,
    HeaderComponent,
    PagenotFoundComponent,
  ],
  imports: [CommonModule, TranslateModule],
  exports: [
    ValidationMessageComponent,
    HeaderComponent,
    PagenotFoundComponent,
  ],
  providers: [],
})
export class SharedModule {}
