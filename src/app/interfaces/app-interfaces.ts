export interface Issue {
  id: number;
  name: string;
  publicationDate: string;
  description: string;
  downloads: number;
  filename: string;
  fileLocation: string;
}

export interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export interface Guideline {
  category: string;
  requirement: string;
  details: string;
  deadline: string;
}

export interface Publisher {
  name: string;
  contactNumber: string;
  address: string;
  email: string;
  website: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  whatsapp: string;
}

export interface UploadItem {
  name: string;
  type: 'current' | 'special';
  date: string;
}
