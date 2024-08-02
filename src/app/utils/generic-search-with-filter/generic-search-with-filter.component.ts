import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { GenericSearchWithFilterService } from '../generic-search-with-filter.service';


@Component({
  selector: 'app-generic-search-with-filter',
  templateUrl: './generic-search-with-filter.component.html',
  styleUrls: ['./generic-search-with-filter.component.css'],
})
export class GenericSearchWithFilterComponent implements OnInit {
  @Input() fields: any[] = [];
  @Input() table: string = '';
  @Output() searchedEmitter = new EventEmitter<any>();
  @Output() cleanEmitter = new EventEmitter<any>();
  form: FormGroup;
  keys: string[] = [];
  constructor(
    private genericSearchWithFilterService: GenericSearchWithFilterService,
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.fields.forEach((field) => {
      this.form.addControl(field.name, new FormControl(field.value || ''));
    });
  }

  search() {
    if (this.atLeastOneFieldValidator(this.form)) {
      this.genericSearchWithFilterService
        .getFiltro(this.form.value, this.table)
        .subscribe((response) => {
          console.log(response);
          this.searchedEmitter.emit(response);
        });
    } else {
      this.clean();
    }
  }

  clean() {
    this.form.reset();  // Reset form
    this.cleanEmitter.emit('ok');
  }

  atLeastOneFieldValidator(form: FormGroup): boolean {
    for (let controlName in form.controls) {
      if (
        form.controls[controlName].value &&
        form.controls[controlName].value !== ''
      ) {
        return true;
      }
    }
    return false;
  }
}
