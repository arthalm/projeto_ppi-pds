import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BuscarPaisService {

  private API_1 = 'https://restcountries.com/v3.1';
  private API_2 = 'https://servicodados.ibge.gov.br/api/v1';

  constructor(private http: HttpClient) {};

  buscarPais(nome: string): Observable<any> {
    return this.http.get<any>(`${this.API_1}/translation/${nome}`);
  };

  buscarInformacoesDoPais(iso: string): Observable<any> {
    return this.http.get<any>(`${this.API_2}/paises/${iso}`);
  };
};
