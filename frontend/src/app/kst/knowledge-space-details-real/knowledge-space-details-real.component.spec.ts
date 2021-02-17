import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeSpaceDetailsRealComponent } from './knowledge-space-details-real.component';

describe('KnowledgeSpaceDetailsRealComponent', () => {
  let component: KnowledgeSpaceDetailsRealComponent;
  let fixture: ComponentFixture<KnowledgeSpaceDetailsRealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeSpaceDetailsRealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeSpaceDetailsRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
