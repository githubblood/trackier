import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersReportComponent } from './publishers-report.component';

describe('PublishersReportComponent', () => {
  let component: PublishersReportComponent;
  let fixture: ComponentFixture<PublishersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishersReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
