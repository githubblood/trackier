import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortReportComponent } from './cohort-report.component';

describe('CohortReportComponent', () => {
  let component: CohortReportComponent;
  let fixture: ComponentFixture<CohortReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CohortReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CohortReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
