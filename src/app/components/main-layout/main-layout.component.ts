import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/client.interface';
import { ClientService } from 'src/app/client.service';
import { formatDate } from 'src/app/utils/utils';
import { UpdateComponentComponent } from '../client/update-component/update-component.component';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
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
