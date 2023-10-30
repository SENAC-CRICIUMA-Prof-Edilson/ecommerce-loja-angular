import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDeliveryComponent } from './self-delivery.component';

describe('SelfDeliveryComponent', () => {
  let component: SelfDeliveryComponent;
  let fixture: ComponentFixture<SelfDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
