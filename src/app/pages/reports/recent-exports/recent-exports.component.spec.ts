import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentExportsComponent } from './recent-exports.component';

describe('RecentExportsComponent', () => {
  let component: RecentExportsComponent;
  let fixture: ComponentFixture<RecentExportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentExportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
