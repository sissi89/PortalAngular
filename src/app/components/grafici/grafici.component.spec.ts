import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficiComponent } from './grafici.component';

describe('GraficiComponent', () => {
  let component: GraficiComponent;
  let fixture: ComponentFixture<GraficiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
