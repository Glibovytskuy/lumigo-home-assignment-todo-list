import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionListComponent } from './components/action-list/action-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActionListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
