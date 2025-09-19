import { Component } from '@angular/core';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  /**
   *
   */
  constructor() {
    this.bindContactForm();
  }

  private bindContactForm(): void {
    const contactForm = document.getElementById(
      'contactForm'
    ) as HTMLFormElement;
    if (contactForm) {
      contactForm.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        this.handleContactForm(contactForm);
      });
    }
  }

  private handleContactForm(form: HTMLFormElement): void {
    // Simulate form submission with validation
    setTimeout(() => {
      this.showSuccessMessage(
        'Thank you for your message! We will get back to you soon.'
      );
      form.reset();
    }, 500);
  }

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
