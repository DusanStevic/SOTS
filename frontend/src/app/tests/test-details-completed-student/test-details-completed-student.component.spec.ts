import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDetailsCompletedStudentComponent } from './test-details-completed-student.component';

describe('TestDetailsCompletedStudentComponent', () => {
  let component: TestDetailsCompletedStudentComponent;
  let fixture: ComponentFixture<TestDetailsCompletedStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDetailsCompletedStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDetailsCompletedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
