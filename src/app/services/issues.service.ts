import { HttpClient } from '@angular/common/http';
import { Issue } from '../interfaces/app-interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private currentIssues: Issue[] = [];
  private specialIssues: Issue[] = [];

  private readonly API_URL =
    'https://publisher-api-cbf8aaggghf4bucg.centralindia-01.azurewebsites.net/api/issues';

  constructor(private http: HttpClient) {}

  getIssues(type: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.API_URL}?type=${type}`);
  }

  // private initializeData(): void {
  //   // this.currentIssues = [
  //   //   {
  //   //     id: 1,
  //   //     name: 'Technology Trends 2025',
  //   //     publicationDate: '2025-08-20',
  //   //     description: 'Latest developments in AI and machine learning',
  //   //     downloads: 245,
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     name: 'Digital Transformation',
  //   //     publicationDate: '2025-08-15',
  //   //     description: 'How businesses are adapting to digital change',
  //   //     downloads: 189,
  //   //   },
  //   //   {
  //   //     id: 3,
  //   //     name: 'Future of Work',
  //   //     publicationDate: '2025-08-10',
  //   //     description: 'Remote work and hybrid models analysis',
  //   //     downloads: 167,
  //   //   },
  //   //   {
  //   //     id: 4,
  //   //     name: 'Sustainable Technology',
  //   //     publicationDate: '2025-08-05',
  //   //     description: 'Green tech innovations and environmental impact',
  //   //     downloads: 203,
  //   //   },
  //   //   {
  //   //     id: 5,
  //   //     name: 'Cybersecurity Insights',
  //   //     publicationDate: '2025-07-30',
  //   //     description: 'Latest threats and protection strategies',
  //   //     downloads: 178,
  //   //   },
  //   //   {
  //   //     id: 6,
  //   //     name: 'Healthcare Innovation',
  //   //     publicationDate: '2025-07-25',
  //   //     description: 'Medical technology breakthroughs',
  //   //     downloads: 156,
  //   //   },
  //   //   {
  //   //     id: 7,
  //   //     name: 'Smart Cities Initiative',
  //   //     publicationDate: '2025-07-20',
  //   //     description: 'Urban planning and IoT integration',
  //   //     downloads: 134,
  //   //   },
  //   //   {
  //   //     id: 8,
  //   //     name: 'Educational Technology',
  //   //     publicationDate: '2025-07-15',
  //   //     description: 'E-learning platforms and digital classrooms',
  //   //     downloads: 145,
  //   //   },
  //   //   {
  //   //     id: 9,
  //   //     name: 'Fintech Revolution',
  //   //     publicationDate: '2025-07-10',
  //   //     description: 'Digital banking and cryptocurrency trends',
  //   //     downloads: 198,
  //   //   },
  //   //   {
  //   //     id: 10,
  //   //     name: 'AI Ethics Guidelines',
  //   //     publicationDate: '2025-07-05',
  //   //     description: 'Responsible AI development practices',
  //   //     downloads: 167,
  //   //   },
  //   //   {
  //   //     id: 11,
  //   //     name: 'Cloud Computing Strategies',
  //   //     publicationDate: '2025-06-30',
  //   //     description: 'Enterprise cloud migration best practices',
  //   //     downloads: 143,
  //   //   },
  //   //   {
  //   //     id: 12,
  //   //     name: 'Data Privacy Regulations',
  //   //     publicationDate: '2025-06-25',
  //   //     description: 'GDPR compliance and global data protection',
  //   //     downloads: 156,
  //   //   },
  //   //   {
  //   //     id: 13,
  //   //     name: '5G Technology Impact',
  //   //     publicationDate: '2025-06-20',
  //   //     description: 'Next-generation connectivity and applications',
  //   //     downloads: 189,
  //   //   },
  //   //   {
  //   //     id: 14,
  //   //     name: 'Blockchain Applications',
  //   //     publicationDate: '2025-06-15',
  //   //     description: 'Beyond cryptocurrency: practical blockchain uses',
  //   //     downloads: 134,
  //   //   },
  //   //   {
  //   //     id: 15,
  //   //     name: 'Quantum Computing Basics',
  //   //     publicationDate: '2025-06-10',
  //   //     description: 'Introduction to quantum technology potential',
  //   //     downloads: 112,
  //   //   },
  //   // ];

  //   // this.specialIssues = [
  //   //   {
  //   //     id: 1,
  //   //     name: 'Annual Tech Review 2024',
  //   //     publicationDate: '2025-01-15',
  //   //     description: 'Comprehensive yearly technology analysis',
  //   //     downloads: 456,
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     name: 'COVID-19 Tech Response',
  //   //     publicationDate: '2024-12-01',
  //   //     description: 'How technology helped during the pandemic',
  //   //     downloads: 389,
  //   //   },
  //   //   {
  //   //     id: 3,
  //   //     name: 'Women in Technology',
  //   //     publicationDate: '2024-10-15',
  //   //     description: 'Celebrating female leaders in tech industry',
  //   //     downloads: 278,
  //   //   },
  //   //   {
  //   //     id: 4,
  //   //     name: 'Startup Success Stories',
  //   //     publicationDate: '2024-08-20',
  //   //     description: 'Profiles of breakthrough technology startups',
  //   //     downloads: 234,
  //   //   },
  //   //   {
  //   //     id: 5,
  //   //     name: 'Climate Tech Solutions',
  //   //     publicationDate: '2024-06-15',
  //   //     description: 'Technology addressing climate change',
  //   //     downloads: 345,
  //   //   },
  //   //   {
  //   //     id: 6,
  //   //     name: 'Future of Transportation',
  //   //     publicationDate: '2024-04-10',
  //   //     description: 'Autonomous vehicles and smart mobility',
  //   //     downloads: 267,
  //   //   },
  //   //   {
  //   //     id: 7,
  //   //     name: 'Space Technology Advances',
  //   //     publicationDate: '2024-02-28',
  //   //     description: 'Private space exploration and satellite tech',
  //   //     downloads: 198,
  //   //   },
  //   //   {
  //   //     id: 8,
  //   //     name: 'Emerging Markets Tech',
  //   //     publicationDate: '2023-12-15',
  //   //     description: 'Technology adoption in developing countries',
  //   //     downloads: 156,
  //   //   },
  //   // ];

  //   // Sort by date (newest first)
  //   this.currentIssues.sort(
  //     (a, b) =>
  //       new Date(b.publicationDate).getTime() -
  //       new Date(a.publicationDate).getTime()
  //   );
  //   this.specialIssues.sort(
  //     (a, b) =>
  //       new Date(b.publicationDate).getTime() -
  //       new Date(a.publicationDate).getTime()
  //   );
  // }

  // getCurrentIssues(): Issue[] {
  //   return this.currentIssues;
  // }

  // getSpecialIssues(): Issue[] {
  //   return this.specialIssues;
  // }

  addIssue(issue: Omit<Issue, 'id'>, type: 'current' | 'special'): void {
    const newIssue: Issue = {
      ...issue,
      id: Date.now(),
    };

    if (type === 'current') {
      this.currentIssues.unshift(newIssue);
    } else {
      this.specialIssues.unshift(newIssue);
    }
  }

  updateDownloadCount(id: number, type: 'current' | 'special'): void {
    const issues = type === 'current' ? this.currentIssues : this.specialIssues;
    const issue = issues.find((issue) => issue.id === id);
    if (issue) {
      issue.downloads++;
    }
  }

  searchAndFilterIssues(
    issues: Issue[],
    searchTerm: string = '',
    fromDate: string = '',
    toDate: string = ''
  ): Issue[] {
    return issues.filter((issue) => {
      const matchesSearch = issue.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const issueDate = new Date(issue.publicationDate);
      const matchesFromDate = !fromDate || issueDate >= new Date(fromDate);
      const matchesToDate = !toDate || issueDate <= new Date(toDate);

      return matchesSearch && matchesFromDate && matchesToDate;
    });
  }
}
