import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsTeacherComponent } from './tests-teacher.component';

describe('TestsTeacherComponent', () => {
  let component: TestsTeacherComponent;
  let fixture: ComponentFixture<TestsTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
