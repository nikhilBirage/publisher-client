import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SpecialIssuesComponent } from './components/issues/special-issues.component';
import { CurrentIssuesComponent } from './components/issues/current-issues.component';
import { GuideComponent } from './components/guide/guide.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/authguard.service';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'sissues', component: SpecialIssuesComponent, pathMatch: 'full' },
  { path: 'cissues', component: CurrentIssuesComponent, pathMatch: 'full' },
  { path: 'guide', component: GuideComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
