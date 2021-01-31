import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestForStudentComponent } from './test-for-student.component';

describe('TestForStudentComponent', () => {
  let component: TestForStudentComponent;
  let fixture: ComponentFixture<TestForStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestForStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});