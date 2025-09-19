import { Component } from '@angular/core';
import { Guideline } from '../../interfaces/app-interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'guide',
  templateUrl: './guide.component.html',
  imports: [CommonModule],
})
export class GuideComponent {
  // Static data
  guidelines: Guideline[] = [
    {
      category: 'Manuscript Submission',
      requirement: 'Original Research',
      details: 'All submissions must be original work not published elsewhere',
      deadline: 'Rolling basis',
    },
    {
      category: 'Formatting',
      requirement: 'APA Style',
      details: 'Follow APA 7th edition guidelines for citations and references',
      deadline: 'Before submission',
    },
    {
      category: 'Length',
      requirement: '3000-8000 words',
      details: 'Main text excluding references and appendices',
      deadline: 'N/A',
    },
    {
      category: 'Abstract',
      requirement: '150-250 words',
      details: 'Concise summary of research objectives and findings',
      deadline: 'Required',
    },
    {
      category: 'Keywords',
      requirement: '3-5 keywords',
      details: 'Relevant terms for indexing and searchability',
      deadline: 'Required',
    },
    {
      category: 'Figures and Tables',
      requirement: 'High Resolution',
      details: 'Minimum 300 DPI for images, clear table formatting',
      deadline: 'With submission',
    },
    {
      category: 'Review Process',
      requirement: 'Peer Review',
      details: 'Double-blind peer review by domain experts',
      deadline: '4-6 weeks',
    },
    {
      category: 'Revisions',
      requirement: 'Author Response',
      details: 'Address all reviewer comments with detailed response',
      deadline: '2 weeks',
    },
    {
      category: 'Copyright',
      requirement: 'Transfer Agreement',
      details: 'Authors retain rights while granting publication license',
      deadline: 'Upon acceptance',
    },
    {
      category: 'Ethics',
      requirement: 'IRB Approval',
      details: 'Human subjects research requires institutional approval',
      deadline: 'Before submission',
    },
  ];
  constructor() {}
}
