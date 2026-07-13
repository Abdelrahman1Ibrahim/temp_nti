import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  cards = [
    {
      title: 'Component',
      description: 'Built with Angular 21 standalone components',
      icon: '⚙️',
    },
    {
      title: 'Layout',
      description: 'Responsive header, content, and footer structure',
      icon: '📐',
    },
    {
      title: 'Styling',
      description: 'Modern CSS with gradient backgrounds and animations',
      icon: '🎨',
    },
  ];
}
