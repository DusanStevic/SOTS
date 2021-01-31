import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDetailsUncompletedStudentComponent } from './test-details-uncompleted-student.component';

describe('TestDetailsUncompletedStudentComponent', () => {
  let component: TestDetailsUncompletedStudentComponent;
  let fixture: ComponentFixture<TestDetailsUncompletedStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDetailsUncompletedStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDetailsUncompletedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
