import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeSpacesComparisonComponent } from './knowledge-spaces-comparison.component';

describe('KnowledgeSpacesComparisonComponent', () => {
  let component: KnowledgeSpacesComparisonComponent;
  let fixture: ComponentFixture<KnowledgeSpacesComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeSpacesComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeSpacesComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
