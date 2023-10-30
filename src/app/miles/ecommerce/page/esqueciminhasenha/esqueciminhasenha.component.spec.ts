import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueciminhasenhaComponent } from './esqueciminhasenha.component';

describe('EsqueciminhasenhaComponent', () => {
  let component: EsqueciminhasenhaComponent;
  let fixture: ComponentFixture<EsqueciminhasenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsqueciminhasenhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsqueciminhasenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
