import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreiosComponent } from './correios.component';

describe('CorreiosComponent', () => {
  let component: CorreiosComponent;
  let fixture: ComponentFixture<CorreiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorreiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorreiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
