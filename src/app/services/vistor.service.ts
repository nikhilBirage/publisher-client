export class VisitorService {
  private visitorCount = 15847;

  incrementVisitorCount(): void {
    const increment = Math.floor(Math.random() * 3) + 1;
    this.visitorCount += increment;
    this.updateUI();
  }

  private updateUI(): void {
    const element = document.getElementById('visitorCount');
    if (element) {
      element.textContent = this.visitorCount.toLocaleString();
    }
  }

  getVisitorCount(): number {
    return this.visitorCount;
  }
}
