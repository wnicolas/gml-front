import { Component } from '@angular/core';
import { ClientService } from './client.service';
import { Client } from './client.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponentComponent } from './components/client/update-component/update-component.component';
import { formatDate } from './utils/utils'; // Ajusta la ruta al archivo de utilidades
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;
  camposFiltro: any = [
    {
      name: 'sharedKey',
      label: '',
      type: 'text',
      value: '',
      placeholder: 'Shared Key',
    },
    {
      name: 'businessId',
      label: '',
      type: 'text',
      value: '',
      placeholder: 'Business ID',
    },
    {
      name: 'email',
      label: '',
      type: 'text',
      value: '',
      placeholder: 'Email',
    },
    {
      name: 'phone',
      label: '',
      type: 'text',
      value: '',
      placeholder: 'Phone',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      sharedKey: [''],
    });
  }
  title = 'gml-front';
  clients: Client[] = [];

  ngOnInit() {
    this.init();
  }

  update(client: Client) {
    this.openDialog(client);
  }

  init() {
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
  search() {
    if (this.form.get('sharedKey')?.value != '') {
      this.clientService
        .getClientById(this.form.get('sharedKey')?.value)
        .subscribe({
          next: (client) => {
            if (client) {
              this.clients = [];
              this.clients.push(client);
            } else {
              this.clients = [];
            }
          },
          error: () => {},
          complete: () => {},
        });
    } else {
      this.init();
    }
  }
  formatDate(date: string) {
    return formatDate(date);
  }
  openDialog(client: Client): void {
    const dialogRef = this.dialog.open(UpdateComponentComponent, {
      width: '250px', // Tamaño del diálogo
      data: client, // Puedes pasar datos al diálogo si lo necesitas
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.init();
      console.log('El diálogo se cerró');
    });
  }
  manageSearchedEmitter(event: Client[]) {
    this.clients = event;
  }
  manageCleanEmitter(event: any) {
    this.init();
  }
}
