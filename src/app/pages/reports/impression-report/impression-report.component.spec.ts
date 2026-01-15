import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionReportComponent } from './impression-report.component';

describe('ImpressionReportComponent', () => {
  let component: ImpressionReportComponent;
  let fixture: ComponentFixture<ImpressionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpressionReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpressionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
