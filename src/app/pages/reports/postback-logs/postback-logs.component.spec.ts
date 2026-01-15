import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostbackLogsComponent } from './postback-logs.component';

describe('PostbackLogsComponent', () => {
  let component: PostbackLogsComponent;
  let fixture: ComponentFixture<PostbackLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostbackLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostbackLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
