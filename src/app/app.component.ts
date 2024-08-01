import { Component } from '@angular/core';
import {  ClientService } from './client.service';
import { Client } from './client.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private clientService: ClientService) {}
  title = 'gml-front';
  clients: Client[] = [];

  ngOnInit() {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: () => {
        alert("Ocurrió un error en la consulta.")
      },
      complete: () => {},
    });
  }
}
