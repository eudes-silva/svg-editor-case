import { Component, Input } from '@angular/core';

@Component({
  selector: 'rect[rectangle]',
  imports: [],
  templateUrl: './rectangle.component.html',
  styleUrl: './rectangle.component.scss',
  host: {
    '[attr.x]': 'x',
    '[attr.y]': 'y',
    '[attr.rx]': 'rx',
    '[attr.ry]': 'ry',
    '[attr.width]': 'width',
    '[attr.height]': 'height',
    '[attr.fill]': 'fill',
    '[attr.stroke]': 'stroke',
    '[attr.stroke-width]': 'strokeWidth',
    '[class]': 'rectClass'
  }
})
export class RectangleComponent {
  @Input() x: number = 10;
  @Input() y: number = 10;
  @Input() rx: number = 0;
  @Input() ry: number = 0;
  @Input() width: number | undefined = 100;
  @Input() height: number | undefined = 50;
  @Input() fill: string = '#4282D7';
  @Input() strokeWidth: number = 1;
  @Input() stroke: string = 'black';
  @Input() rectClass = '';
}
