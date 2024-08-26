import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalBreakComponent } from './technical-break.component';

describe('TechnicalBreakComponent', () => {
  let component: TechnicalBreakComponent;
  let fixture: ComponentFixture<TechnicalBreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalBreakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
