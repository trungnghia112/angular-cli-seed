import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SharedBoxLoadingComponent } from './box-loading.component';

describe('SharedBoxLoadingComponent', () => {
  let component: SharedBoxLoadingComponent;
  let fixture: ComponentFixture<SharedBoxLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SharedBoxLoadingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedBoxLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
