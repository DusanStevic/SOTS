import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeSpaceDetailsComponent } from './knowledge-space-details.component';

describe('KnowledgeSpaceDetailsComponent', () => {
  let component: KnowledgeSpaceDetailsComponent;
  let fixture: ComponentFixture<KnowledgeSpaceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeSpaceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeSpaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
