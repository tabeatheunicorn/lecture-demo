import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsOverview } from './objects-overview';

describe('ObjectsOverview', () => {
  let component: ObjectsOverview;
  let fixture: ComponentFixture<ObjectsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectsOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectsOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
