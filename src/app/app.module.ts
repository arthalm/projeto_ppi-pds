import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { BuscarPaisEuropeuComponent } from './buscar-pais-europeu/buscar-pais-europeu.component';
import { ConverterMoedasComponent } from './converter-moedas/converter-moedas.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarPaisEuropeuComponent,
    ConverterMoedasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})

export class AppModule {};
