import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomBandComponent } from './random-band.component';

describe('RandomBandComponent', () => {
  let component: RandomBandComponent;
  let fixture: ComponentFixture<RandomBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomBandComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
