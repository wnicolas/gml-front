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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private clientService: ClientService
  ) {
    this.clientForm = this.fb.group({
      sharedKey: [data.sharedKey, Validators.required],
      businessId: [data.businessId, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required],
      dateAdded: [formatDate(data.dateAdded), Validators.required],
    });
    console.log(this.clientForm.value)
  }

  ngOnInit(): void {}
  save() {
    if (this.clientForm.valid) {
      console.log(this.clientForm.value);
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
      this.dialogRef.close(this.clientForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
