import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FazerConversaoService {

  private API = 'https://api.invertexto.com/v1';
  private token = '16497|H8mvNo4Qf0jOmRkxNW79DgL0v7WMhJFs';

  constructor(private http: HttpClient) {};

  fazerConversaoMoeda(cod_moeda: string): Observable<any> {
    return this.http.get<any>(`${this.API}/currency/${cod_moeda}_BRL?token=${this.token}`);
  };
};
