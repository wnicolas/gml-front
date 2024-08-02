import { Component } from '@angular/core';
import { ClientService } from './client.service';
import { Client } from './client.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponentComponent } from './components/client/update-component/update-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) {}
  title = 'gml-front';
  clients: Client[] = [];

  ngOnInit() {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: () => {
        alert('Ocurrió un error en la consulta.');
      },
      complete: () => {},
    });
  }
  update(client: Client) {
    this.openDialog(client);
  }

  openDialog(client: Client): void {
    const dialogRef = this.dialog.open(UpdateComponentComponent, {
      width: '250px', // Tamaño del diálogo
      data: client, // Puedes pasar datos al diálogo si lo necesitas
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo se cerró');
    });
  }
}
