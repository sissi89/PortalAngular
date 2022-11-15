import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicazioneComponent } from './comunicazione.component';

describe('ComunicazioneComponent', () => {
  let component: ComunicazioneComponent;
  let fixture: ComponentFixture<ComunicazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComunicazioneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
