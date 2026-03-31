import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SocialComponent } from './components/social/social.component';
import { HomeContentComponent } from './components/home-content/home-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, SocialComponent, HomeContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
