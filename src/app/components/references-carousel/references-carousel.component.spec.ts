import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesCarouselComponent } from './references-carousel.component';

describe('ReferencesCarouselComponent', () => {
  let component: ReferencesCarouselComponent;
  let fixture: ComponentFixture<ReferencesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferencesCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferencesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
