import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDetailsTeacherComponent } from './test-details-teacher.component';

describe('TestDetailsTeacherComponent', () => {
  let component: TestDetailsTeacherComponent;
  let fixture: ComponentFixture<TestDetailsTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDetailsTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDetailsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
