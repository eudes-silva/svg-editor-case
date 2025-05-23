import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

interface Btn {
  id: number;
  selectedType?: string;
  selected?: boolean,
  value: string;
  trigger: () => void;
}

@Component({
  selector: 'controls',
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {

  btns = [
    { id: 1, selectedType: 'rect', selected: false, value: 'Adicionar retângulo', trigger: () => this.addRectangle() },
    { id: 2, selectedType: 'star', selected: false, value: 'Adicionar estrela', trigger: () => this.addStar() },
    { id: 3, selectedType: 'clear', value: 'Limpar', trigger: () => this.clear() }
  ];

  trackByBtnId(index: number, btn: Btn): number {
    return btn.id ?? index;
  }

  @Output() addRectangleClick = new EventEmitter<string>();
  @Output() addStarClick = new EventEmitter<string>();
  @Output() clearClick = new EventEmitter<void>();

  private setSelected(id: number) {
    this.btns.forEach(btn => btn.selected = btn.id === id);
  }

  addRectangle() {
    this.setSelected(1);
    this.addRectangleClick.emit('rect');
  }

  addStar() {
    this.setSelected(2);
    this.addStarClick.emit('star');
  }

  clear(){
    this.setSelected(0);
    this.clearClick.emit();
  }
}
