import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisationsPanelComponent } from './realisations-panel.component';

describe('RealisationsPanelComponent', () => {
  let component: RealisationsPanelComponent;
  let fixture: ComponentFixture<RealisationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealisationsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealisationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
