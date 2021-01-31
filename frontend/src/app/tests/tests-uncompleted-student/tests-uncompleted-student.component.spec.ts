import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsUncompletedStudentComponent } from './tests-uncompleted-student.component';

describe('TestsUncompletedStudentComponent', () => {
  let component: TestsUncompletedStudentComponent;
  let fixture: ComponentFixture<TestsUncompletedStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsUncompletedStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsUncompletedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
