import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDagComponent } from './read-dag.component';

describe('ReadDagComponent', () => {
  let component: ReadDagComponent;
  let fixture: ComponentFixture<ReadDagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadDagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
