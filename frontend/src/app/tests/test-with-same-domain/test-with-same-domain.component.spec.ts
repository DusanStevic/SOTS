import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWithSameDomainComponent } from './test-with-same-domain.component';

describe('TestWithSameDomainComponent', () => {
  let component: TestWithSameDomainComponent;
  let fixture: ComponentFixture<TestWithSameDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestWithSameDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWithSameDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
