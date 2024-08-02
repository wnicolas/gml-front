import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericSearchWithFilterService {
  specificEndPoint = 'http://localhost:8080';
  errorForm: boolean = false;

  constructor(private http: HttpClient) {}
  getFiltro(parametros: any, table: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();

    for (const key in parametros) {
      if (parametros.hasOwnProperty(key)) {
        params = params.set(key, parametros[key]);
      }
    }
    let options = {
      headers: headers,
      params: params,
    };
    return this.http.get<any>(
      this.specificEndPoint + `/${table}` + `/advanced-search`,
      options,
    );
  }
}
