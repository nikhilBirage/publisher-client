import { ChangeDetectorRef, Component } from '@angular/core';
import { IssueService } from '../../services/issues.service';
import { Issue } from '../../interfaces/app-interfaces';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cissues',
  templateUrl: './current-issues.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class CurrentIssuesComponent {
  public allIssues: Issue[] = [];
  loader: boolean = false;

  // The form group for our filters
  filterForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    publicationDateFrom: new FormControl(''),
    publicationDateTo: new FormControl(''),
  });

  filteredCurrentIssues: Issue[] = [];

  // Holds the data for the current page
  paginatedIssues: Issue[] = [];

  // Pagination state
  currentPage = 1;
  pageSize = 3;
  totalPages = 1;

  // Sorting state
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private issueService: IssueService, private cd: ChangeDetectorRef) {
    this.applyFilters({}); // Initial load with no filters
    // Listen for changes in the filter form
    this.filterForm.valueChanges.subscribe((filters) => {
      this.applyFilters(filters);
    });
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeData(): void {
    this.loader = true;
    this.issueService.getIssues('current').subscribe({
      next: (data) => {
        this.allIssues = data;
        console.log('all data:', JSON.stringify(data));
        this.loader = false;
        this.cd.detectChanges();
        this.applyFilters({});
      },
      error: (error) => {
        this.loader = false;
        console.log('all data error:', JSON.stringify(error));
      },
    });
    this.filteredCurrentIssues = this.allIssues;
  }

  applyFilters(filters: any) {
    this.filteredCurrentIssues = this.allIssues.filter((issue) => {
      // Name filter logic (unchanged)
      const nameMatch = filters.name
        ? issue.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;

      // Date range filter logic
      const issueDate = new Date(issue.publicationDate);
      const fromDate = filters.publicationDateFrom
        ? new Date(filters.publicationDateFrom)
        : null;
      const toDate = filters.publicationDateTo
        ? new Date(filters.publicationDateTo)
        : null;

      // To avoid issues with timezone, set hours to 0
      if (fromDate) fromDate.setHours(0, 0, 0, 0);
      if (toDate) toDate.setHours(0, 0, 0, 0);

      const dateMatch =
        (!fromDate || issueDate >= fromDate) &&
        (!toDate || issueDate <= toDate);

      return nameMatch && dateMatch;
    });

    this.sortIssues(); // Apply sorting after filtering
  }

  sortIssues() {
    this.filteredCurrentIssues.sort((a, b) => {
      const dateA = new Date(a.publicationDate).getTime();
      const dateB = new Date(b.publicationDate).getTime();
      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    this.currentPage = 1; // Reset to page 1 after sorting
    this.updatePagination();
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortIssues();
  }

  updatePagination() {
    this.totalPages = Math.ceil(
      this.filteredCurrentIssues.length / this.pageSize
    );
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedIssues = this.filteredCurrentIssues.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  resetFilters() {
    this.filterForm.reset();
  }

  public downloadIssue(id: number): void {
    const issue = this.allIssues.find((i) => i.id === id);

    if (issue) {
      this.showSuccessMessage(`Downloading "${issue.name}" PDF...`);
      this.issueService.updateDownloadCount(id, 'current');
    }
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

  public formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
