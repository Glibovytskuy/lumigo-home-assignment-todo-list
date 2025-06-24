import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() items!: number[];

  get totalSum(): number {
    return this.items.reduce((prev, next) => prev + next);
  }

  get percentage(): string[] {
    return [this.items[0]/this.totalSum * 100 + '%', this.items[1]/this.totalSum * 100 + '%', this.items[2]/this.totalSum * 100 + '%'];
  }

}
