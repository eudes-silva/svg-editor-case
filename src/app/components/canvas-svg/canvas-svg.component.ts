import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[canvasSvg]',
  imports: [],
  templateUrl: './canvas-svg.component.html',
  styleUrl: './canvas-svg.component.scss',
  host: {
    '[attr.width]': 'width',
    '[attr.height]': 'height',
    '[attr.viewBox]': 'viewBox',
    '[attr.xmlns]': '"http://www.w3.org/2000/svg"',
    '[class]': 'canvasSvgClass'
  }
})
export class CanvasSvgComponent {
  @Input() width: number = 1000;
  @Input() height: number = 600;
  @Input() viewBox: string = '0 0 600 400';
  @Input() canvasSvgClass: string = '';
}
