import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeSpacesComponent } from './knowledge-spaces.component';

describe('KnowledgeSpacesComponent', () => {
  let component: KnowledgeSpacesComponent;
  let fixture: ComponentFixture<KnowledgeSpacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeSpacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
