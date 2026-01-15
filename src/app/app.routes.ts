import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { CreateCampaignComponent } from './pages/campaigns/create-campaign/create-campaign.component';
import { CampaignWizardComponent } from './pages/campaigns/campaign-wizard/campaign-wizard.component';
import { CampaignAccessComponent } from './pages/campaigns/campaign-access/campaign-access.component';
import { CampaignDetailComponent } from './pages/campaigns/campaign-detail/campaign-detail.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PublishersComponent } from './pages/publishers/publishers.component';
import { PublisherDetailComponent } from './pages/publishers/publisher-detail/publisher-detail.component';
import { AdvertisersComponent } from './pages/advertisers/advertisers.component';
import { PublishersReportComponent } from './pages/reports/publishers-report/publishers-report.component';
import { AdvertisersReportComponent } from './pages/reports/advertisers-report/advertisers-report.component';
import { DailyReportComponent } from './pages/reports/daily-report/daily-report.component';
import { GoalsReportComponent } from './pages/reports/goals-report/goals-report.component';
import { CohortReportComponent } from './pages/reports/cohort-report/cohort-report.component';
import { ClickReportComponent } from './pages/reports/click-report/click-report.component';
import { ConversionReportComponent } from './pages/reports/conversion-report/conversion-report.component';
import { ImpressionReportComponent } from './pages/reports/impression-report/impression-report.component';
import { PostbackLogsComponent } from './pages/reports/postback-logs/postback-logs.component';
import { RecentExportsComponent } from './pages/reports/recent-exports/recent-exports.component';
import { ScheduledReportsComponent } from './pages/reports/scheduled-reports/scheduled-reports.component';
import { CapReportComponent } from './pages/reports/cap-report/cap-report.component';
import { SamplingReportComponent } from './pages/reports/sampling-report/sampling-report.component';
import { ComparisonReportComponent } from './pages/reports/comparison-report/comparison-report.component';
import { ReferralReportComponent } from './pages/reports/referral-report/referral-report.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'campaigns/manage', component: CampaignsComponent },
      { path: 'campaigns/create', component: CreateCampaignComponent },
      { path: 'campaigns/wizard', component: CampaignWizardComponent },
      { path: 'campaigns/access', component: CampaignAccessComponent },
      { path: 'campaigns/:id', component: CampaignDetailComponent },
      { path: 'reports/campaign', component: ReportsComponent },
      { path: 'reports/publishers', component: PublishersReportComponent },
      { path: 'reports/advertisers', component: AdvertisersReportComponent },
      { path: 'reports/daily', component: DailyReportComponent },
      { path: 'reports/goals', component: GoalsReportComponent },
      { path: 'reports/cohort', component: CohortReportComponent },
      { path: 'reports/click', component: ClickReportComponent },
      { path: 'reports/conversion', component: ConversionReportComponent },
      { path: 'reports/impression', component: ImpressionReportComponent },
      { path: 'reports/postback-logs', component: PostbackLogsComponent },
      { path: 'reports/recent-exports', component: RecentExportsComponent },
      { path: 'reports/scheduled', component: ScheduledReportsComponent },
      { path: 'reports/cap', component: CapReportComponent },
      { path: 'reports/sampling', component: SamplingReportComponent },
      { path: 'reports/comparison', component: ComparisonReportComponent },
      { path: 'reports/referral', component: ReferralReportComponent },
      { path: 'publishers/manage', component: PublishersComponent },
      { path: 'publishers/:id', component: PublisherDetailComponent },
      { path: 'advertisers/manage', component: AdvertisersComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
