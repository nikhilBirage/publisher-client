export class AppRouter {
  private currentRoute = 'home';

  navigate(route: string): void {
    this.currentRoute = route;
    this.updateUI(route);
  }

  getCurrentRoute(): string {
    return this.currentRoute;
  }

  private updateUI(route: string): void {
    // Hide all route components
    document
      .querySelectorAll('.route-component')
      .forEach((component: Element) => {
        component.classList.remove('active');
      });

    // Show selected route component
    const targetComponent = document.getElementById(`${route}-component`);
    if (targetComponent) {
      targetComponent.classList.add('active');
    }

    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach((link: Element) => {
      link.classList.remove('active');
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute === route) {
        link.classList.add('active');
      }
    });
  }
}
