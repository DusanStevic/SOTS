import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GedDialogComponent } from './ged-dialog.component';

describe('GedDialogComponent', () => {
  let component: GedDialogComponent;
  let fixture: ComponentFixture<GedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
