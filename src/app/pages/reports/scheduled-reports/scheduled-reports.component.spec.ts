import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledReportsComponent } from './scheduled-reports.component';

describe('ScheduledReportsComponent', () => {
  let component: ScheduledReportsComponent;
  let fixture: ComponentFixture<ScheduledReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
