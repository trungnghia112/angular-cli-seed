import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SharedBoxNoDataComponent } from './box-nodata.component';

describe('SharedBoxNoDataComponent', () => {
  let component: SharedBoxNoDataComponent;
  let fixture: ComponentFixture<SharedBoxNoDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SharedBoxNoDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedBoxNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
