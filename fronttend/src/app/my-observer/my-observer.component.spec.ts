import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyObserverComponent } from './my-observer.component';

describe('MyObserverComponent', () => {
  let component: MyObserverComponent;
  let fixture: ComponentFixture<MyObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyObserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
