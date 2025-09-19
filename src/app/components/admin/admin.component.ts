import { Component } from '@angular/core';
import { UploadItem } from '../../interfaces/app-interfaces';
import { IssueService } from '../../services/issues.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class AdminComponent {
  // Component state
  recentUploads: UploadItem[] = [];

  uploadForm: FormGroup;
  selectedFile: File | null = null;
  uploadSuccess = false;
  constructor(private fb: FormBuilder, private issueService: IssueService) {
    this.uploadForm = this.fb.group({
      name: ['', Validators.required],
      type: ['current', Validators.required], // Default value
      date: ['', Validators.required],
      description: [''],
      file: [null, Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      // Set the file value in the form
      this.uploadForm.patchValue({ file: this.selectedFile });
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('name', this.uploadForm.get('name')?.value);
      formData.append('type', this.uploadForm.get('type')?.value);
      formData.append('date', this.uploadForm.get('date')?.value);
      formData.append('description', this.uploadForm.get('description')?.value);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

      const name = formData.get('name')?.toString();
      const description = formData.get('description')?.toString();
      const date = formData.get('date')?.toString();
      const itype = formData.get('type')?.toString();

      // In a real application, you would send `formData` to a server
      // For example: this.http.post('/api/upload', formData).subscribe(...)
      console.log('Form data to be sent:', {
        name: formData.get('name'),
        type: formData.get('type'),
        date: formData.get('date'),
        file: formData.get('file'),
      });

      // // Add new issue through service
      // this.issueService.addIssue(
      //   {
      //     name: name ?? '',
      //     publicationDate: date ?? '',
      //     description: description ?? '',
      //     downloads: 0,
      //   },
      //   itype as 'current' | 'special'
      // );

      // Add to recent uploads
      this.recentUploads.unshift({
        name: name ?? '',
        type: itype as 'current' | 'special',
        date: new Date().toISOString().split('T')[0],
      });

      this.uploadSuccess = true;
      this.uploadForm.reset({ type: 'current', file: null }); // Reset form but keep default type
      this.selectedFile = null;

      // Hide success message after 3 seconds
      setTimeout(() => (this.uploadSuccess = false), 3000);
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
