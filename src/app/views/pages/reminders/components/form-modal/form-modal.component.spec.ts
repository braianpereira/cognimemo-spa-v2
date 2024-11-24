import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalComponent } from './form-modal.component';

describe('CreateComponent', () => {
  let component: FormModalComponent;
  let fixture: ComponentFixture<FormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should form-modal', () => {
    expect(component).toBeTruthy();
  });
});
