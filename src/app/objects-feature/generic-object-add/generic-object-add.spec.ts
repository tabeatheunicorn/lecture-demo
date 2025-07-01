import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericObjectAdd } from './generic-object-add';

describe('GenericObjectAdd', () => {
  let component: GenericObjectAdd;
  let fixture: ComponentFixture<GenericObjectAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericObjectAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericObjectAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
