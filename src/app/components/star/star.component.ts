import { Component, Input } from '@angular/core';

@Component({
  selector: 'polygon[star]',
  imports: [],
  templateUrl: './star.component.html',
  styleUrl: './star.component.scss',
  host: {
    '[attr.points]': 'points',
    '[attr.numPoints]': 'numPoints',
    '[attr.innerRadius]': 'innerRadius',
    '[attr.outerRadius]': 'outerRadius',
    '[attr.fill]': 'fill',
    '[attr.stroke]': 'stroke',
    '[attr.stroke-width]': 'strokeWidth',
    '[attr.translate]':'translate',
    '[class]': 'starClass'
  }
})
export class StarComponent {
  @Input() numPoints: number = 8;
  @Input() innerRadius: number = 15; // Controls the "depth" of the points
  @Input() outerRadius: number = 30;
  @Input() fill: string = 'gold';
  @Input() stroke: string = 'black';
  @Input() strokeWidth: number = 1;
  @Input() translate = '';
  @Input() starClass = '';

  points: string = '';

  ngOnInit(): void {
    this.calculateStarPoints();
  }

  calculateStarPoints(): void {
    const centerX = 50;
    const centerY = 50;
    const angleStep = Math.PI / this.numPoints;

    let pointsArray = [];

    for (let i = 0; i < this.numPoints * 2; i++) {
      const radius = i % 2 === 0 ? this.outerRadius : this.innerRadius;
      const angle = i * angleStep;

      const x = centerX + radius * Math.sin(angle);
      const y = centerY - radius * Math.cos(angle);

      pointsArray.push(`${x},${y}`);
    }

    this.points = pointsArray.join(' ');
  }
}
