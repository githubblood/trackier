import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisersReportComponent } from './advertisers-report.component';

describe('AdvertisersReportComponent', () => {
  let component: AdvertisersReportComponent;
  let fixture: ComponentFixture<AdvertisersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisersReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
