import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompletionDialogComponent } from './test-completion-dialog.component';

describe('TestCompletionDialogComponent', () => {
  let component: TestCompletionDialogComponent;
  let fixture: ComponentFixture<TestCompletionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCompletionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCompletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
