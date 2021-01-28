import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsCompletedStudentComponent } from './tests-completed-student.component';

describe('TestsCompletedStudentComponent', () => {
  let component: TestsCompletedStudentComponent;
  let fixture: ComponentFixture<TestsCompletedStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsCompletedStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsCompletedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
