import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsReportComponent } from './goals-report.component';

describe('GoalsReportComponent', () => {
  let component: GoalsReportComponent;
  let fixture: ComponentFixture<GoalsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
