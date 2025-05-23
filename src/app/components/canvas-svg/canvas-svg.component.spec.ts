import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSvgComponent } from './canvas-svg.component';

describe('CanvasSvgComponent', () => {
  let component: CanvasSvgComponent;
  let fixture: ComponentFixture<CanvasSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
