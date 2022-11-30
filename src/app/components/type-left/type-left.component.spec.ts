import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeLeftComponent } from './type-left.component';

describe('TypeLeftComponent', () => {
  let component: TypeLeftComponent;
  let fixture: ComponentFixture<TypeLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
