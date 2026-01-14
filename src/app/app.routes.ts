import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PublishersComponent } from './pages/publishers/publishers.component';
import { AdvertisersComponent } from './pages/advertisers/advertisers.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'campaigns/manage', component: CampaignsComponent },
      { path: 'reports/campaign', component: ReportsComponent },
      { path: 'publishers/manage', component: PublishersComponent },
      { path: 'advertisers/manage', component: AdvertisersComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
