import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { VisitorService } from './services/vistor.service';
import { AppRouter } from './services/app-router.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Services (Dependency Injection simulation)
  private visitorService: VisitorService;
  private router: AppRouter;

  // A signal to hold the name of the active navigation link
  activeItem = signal<string>('home');

  constructor(public authService: AuthService) {
    this.visitorService = new VisitorService();
    this.router = new AppRouter();

    this.init();
  }

  // ===========================
  // LIFECYCLE HOOKS (ngOnInit simulation)
  // ===========================

  private init(): void {
    // Start visitor count updates
    setInterval(() => {
      this.visitorService.incrementVisitorCount();
    }, 30000);

    this.router.navigate('home');
  }

  logout(): void {
    this.authService.logout();
    // this.router.navigate('home');
    this.showSuccessMessage('Logged out successfully.');
  }

  // Method to set the active navigation item
  setActive(item: string) {
    this.activeItem.set(item);
  }

  // ===========================
  // UTILITY METHODS
  // ===========================

  private showSuccessMessage(message: string): void {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message fade-in';
    successDiv.textContent = message;

    const container = document.querySelector('.container');
    if (container) {
      container.insertBefore(successDiv, container.firstChild);

      setTimeout(() => {
        if (successDiv.parentNode) {
          successDiv.parentNode.removeChild(successDiv);
        }
      }, 3000);
    }
  }
}
