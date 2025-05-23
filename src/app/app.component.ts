import { Component } from '@angular/core';
import { CanvasSvgComponent } from "./components/canvas-svg/canvas-svg.component";
import { RectangleComponent } from './components/rectangle/rectangle.component';
import { ControlsComponent } from './components/controls/controls.component';
import { StarComponent } from './components/star/star.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CanvasSvgComponent, RectangleComponent, StarComponent, ControlsComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'svg-editor-case';
  selectedShapeType = '';

  shapes: Array<{
    type: string;
    id: number;
    x: number;
    y: number;
    rx?: number;
    ry?: number;
    width?: number;
    height?: number;
    numPoints?: number;
    innerRadius?: number;
    outerRadius?: number;
  }> = [];

  getMousePosition(event: MouseEvent) {
    const svg = event.currentTarget as SVGSVGElement;

    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

    if (this.selectedShapeType === 'rect') {
      this.shapes.push({
        type: 'rect',
        id: +Math.random().toString().slice(2, 11),
        x: svgPoint.x - 50, 
        y: svgPoint.y - 25, 
        width: 100,
        height: 50,
        rx: 0,
        ry: 0
      });
    } else if (this.selectedShapeType === 'star') {
      this.shapes.push({
        type: 'star',
        id: +Math.random().toString().slice(2, 11),
        x: svgPoint.x - 50, 
        y: svgPoint.y - 50, 
        numPoints: 5, 
        innerRadius: 15,
        outerRadius: 30
      });
    }
  }

  handleAddRectangleClick(value: string) {
    this.selectedShapeType = value;
  }

  handleAddStarClick(value: string) {
    this.selectedShapeType = value;
  }

  handleClearClick(){
    this.shapes = [];
    this.selectedShapeType = '';
    this.selectedRectId = null;
    this.selectedStarId = null;
  }

  selectedRectId: number | null = null;
  private _rectCornerRound = '0';
  
  get rectCornerRound(): string {
    return this._rectCornerRound;
  }
  
  set rectCornerRound(value: string) {
    this._rectCornerRound = value;
    this.updateSelectedRect();
  }
  
  onRectClick(id: number) {
    this.selectedRectId = id;
    this._rectCornerRound = `${this.shapes.find(shape=>shape.id ===id)?.rx}`;
;  }
  
  private updateSelectedRect() {
    if (!this.selectedRectId) return;
    const cornerValue = +this.rectCornerRound || 0;
    this.shapes = this.shapes.map(shape => 
      shape.id === this.selectedRectId && shape.type === 'rect'
        ? { ...shape, rx: cornerValue, ry: cornerValue }
        : shape
    );
  }

  selectedStarId: number | null = null;
  private _starPoints = '5';
  private _starPointsDepthLevel = '15';
  
  get starPoints(): string {
    return this._starPoints;
  }
  
  set starPoints(value: string) {
    this._starPoints = value;
    this.updateSelectedStar();
  }

  get starPointsDepthLevel(): string {
    return this._starPointsDepthLevel;
  }
  
  set starPointsDepthLevel(value: string) {
    this._starPointsDepthLevel = value;
    this.updateSelectedStar();
  }

  onStarClick(id: number) {
    this.selectedStarId = id;
    this._starPoints = `${this.shapes.find(shape=>shape.id ===id)?.numPoints}`;
    this._starPointsDepthLevel = `${this.shapes.find(shape=>shape.id ===id)?.innerRadius}`;
  }
  
  private updateSelectedStar() {
    if (!this.selectedStarId) return;
    const starPoints = +this.starPoints || 5;
    const starPointsDepthLevel = +this.starPointsDepthLevel || 15;
    this.shapes = this.shapes.map(shape => 
      shape.id === this.selectedStarId && shape.type === 'star'
        ? { ...shape, numPoints: starPoints, innerRadius: starPointsDepthLevel }
        : shape
    );
  }

  onKeyPress(event: KeyboardEvent, id: number): void {
    if(event.key==='Delete'){
      event.stopPropagation(); 
      event.preventDefault(); 
      this.shapes = this.shapes.filter(shape=>shape.id!==id);
    }
  }
}
