import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSellDetailsComponent } from './for-sell-details.component';

describe('ForSellDetailsComponent', () => {
  let component: ForSellDetailsComponent;
  let fixture: ComponentFixture<ForSellDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForSellDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForSellDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
