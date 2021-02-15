import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGenesisKnowledgeSpaceViewComponent } from './test-genesis-knowledge-space-view.component';

describe('TestGenesisKnowledgeSpaceViewComponent', () => {
  let component: TestGenesisKnowledgeSpaceViewComponent;
  let fixture: ComponentFixture<TestGenesisKnowledgeSpaceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGenesisKnowledgeSpaceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGenesisKnowledgeSpaceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
