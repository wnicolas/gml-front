import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }
  getClientById(value: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${value}`);
  }
  updateClient(client: Client): Observable<Client> {
    console.log(client);
    return this.http.put<Client>(`${this.apiUrl}/${client.sharedKey}`, client);
  }
  createClient(client: Client): Observable<Client> {
    console.log(client);
    return this.http.post<Client>(`${this.apiUrl}`, client);
  }
}
