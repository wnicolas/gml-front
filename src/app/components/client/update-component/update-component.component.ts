import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/client.interface';
import { ClientService } from '../../../client.service';
import { formatDate } from '../../../utils/utils'; // Ajusta la ruta al archivo de utilidades

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.css'],
})
export class UpdateComponentComponent implements OnInit {
  clientForm: FormGroup;
  update: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client | null,
    private clientService: ClientService
  ) {
    this.data ? (this.update = true) : (this.update = false);
    if (data) {
      this.clientForm = this.fb.group({
        sharedKey: [data.sharedKey, Validators.required],
        businessId: [data.businessId, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        phone: [data.phone, Validators.required],
        dateAdded: [formatDate(data.dateAdded), Validators.required],
      });
      console.log(this.clientForm.value);
    } else {
      this.clientForm = this.fb.group({
        sharedKey: ['', Validators.required],
        businessId: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        dateAdded: [new Date(), Validators.required],
      });
    }
  }

  ngOnInit(): void {}
  save() {
    if (this.clientForm.valid) {
      console.log(this.clientForm.value);
      if (this.data) {
        this.clientService.updateClient(this.clientForm.value).subscribe({
          next: () => {
            alert('Se ha actualizado el cliente');
          },
          error: () => {
            alert('Ha fallado la actualización');
          },
          complete: () => {
            this.close();
          },
        });
      } else {
        this.clientService.createClient(this.clientForm.value).subscribe({
          next: () => {
            alert('Se ha creado el cliente');
          },
          error: () => {
            alert('Ha fallado la creación');
          },
          complete: () => {
            this.close();
          },
        });
      }
      this.dialogRef.close(this.clientForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
