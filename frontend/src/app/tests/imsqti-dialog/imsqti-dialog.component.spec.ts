import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsqtiDialogComponent } from './imsqti-dialog.component';

describe('ImsqtiDialogComponent', () => {
  let component: ImsqtiDialogComponent;
  let fixture: ComponentFixture<ImsqtiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsqtiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsqtiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
