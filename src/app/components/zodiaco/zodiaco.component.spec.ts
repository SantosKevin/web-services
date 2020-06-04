import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZodiacoComponent } from './zodiaco.component';

describe('ZodiacoComponent', () => {
  let component: ZodiacoComponent;
  let fixture: ComponentFixture<ZodiacoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZodiacoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZodiacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
