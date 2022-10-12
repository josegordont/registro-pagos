import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeESEC from '@angular/common/locales/es-EC';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { DATE_FORMAT_LOCAL } from './directives/constants';
import { PagosModule } from './pagos/pagos.module';
import { AuthInterceptor } from './_helpers/auth-interceptor';

registerLocaleData(localeESEC);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagosModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot(),
    FormsModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: DATE_FORMAT_LOCAL
    },
    {
      provide: LOCALE_ID,
      useValue: DATE_FORMAT_LOCAL
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
