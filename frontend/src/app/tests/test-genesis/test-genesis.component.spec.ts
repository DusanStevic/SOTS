import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGenesisComponent } from './test-genesis.component';

describe('TestGenesisComponent', () => {
  let component: TestGenesisComponent;
  let fixture: ComponentFixture<TestGenesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGenesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGenesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
