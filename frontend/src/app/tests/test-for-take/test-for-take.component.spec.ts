import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestForTakeComponent } from './test-for-take.component';

describe('TestForTakeComponent', () => {
  let component: TestForTakeComponent;
  let fixture: ComponentFixture<TestForTakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestForTakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestForTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
