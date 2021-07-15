import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDisplacementComponent } from './manual-displacement.component';

describe('ManualDisplacementComponent', () => {
  let component: ManualDisplacementComponent;
  let fixture: ComponentFixture<ManualDisplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualDisplacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDisplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
