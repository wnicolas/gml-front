import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/client.interface';

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
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {
    this.clientForm = this.fb.group({
      sharedKey: [
        { value: data.sharedKey, disabled: true },
        Validators.required,
      ],
      businessId: [data.businessId, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required],
      dateAdded: [data.dateAdded, Validators.required],
    });
  }

  ngOnInit(): void {}
  save() {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
