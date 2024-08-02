import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSearchWithFilterComponent } from './generic-search-with-filter.component';

describe('GenericSearchWithFilterComponent', () => {
  let component: GenericSearchWithFilterComponent;
  let fixture: ComponentFixture<GenericSearchWithFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericSearchWithFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericSearchWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
