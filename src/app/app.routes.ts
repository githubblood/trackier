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
import { ManageAdvertisersComponent } from './pages/advertisers/manage-advertisers/manage-advertisers.component';
import { AdvertiserDetailComponent } from './pages/advertisers/advertiser-detail/advertiser-detail.component';
import { EditAdvertiserComponent } from './pages/advertisers/edit-advertiser/edit-advertiser.component';
import { PostbackHitsReceivedComponent } from './pages/advertisers/postback-hits-received/postback-hits-received.component';
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
import { PostbacksPixelsComponent } from './pages/publishers/postbacks-pixels/postbacks-pixels.component';
import { EditPostbackComponent } from './pages/publishers/postbacks-pixels/edit-postback/edit-postback.component';
import { PostbackPixelLogsComponent } from './pages/publishers/postbacks-pixels/postback-logs/postback-pixel-logs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditDetailsComponent } from './pages/profile/edit-details/edit-details.component';
import { EditSettingsComponent } from './pages/profile/edit-settings/edit-settings.component';
import { EditPasswordComponent } from './pages/profile/edit-password/edit-password.component';
import { EditApplicationComponent } from './pages/profile/edit-application/edit-application.component';
import { TeamMembersComponent } from './pages/team-members/team-members.component';
import { TeamMemberDetailComponent } from './pages/team-members/team-member-detail/team-member-detail.component';
import { PublisherSignupComponent } from './pages/signup/publisher-signup/publisher-signup.component';
import { AdvertiserSignupComponent } from './pages/signup/advertiser-signup/advertiser-signup.component';

// Guards
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Public Routes (Guest Guard - redirects logged-in users)
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'signup/publisher', component: PublisherSignupComponent, canActivate: [guestGuard] },
  { path: 'signup/advertiser', component: AdvertiserSignupComponent, canActivate: [guestGuard] },

  // Protected Routes (Auth Guard - requires login)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Dashboard - Admin only (full access)
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },

      // Campaigns - Admin only
      {
        path: 'campaigns/manage',
        component: CampaignsComponent,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'campaigns/create',
        component: CreateCampaignComponent,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'campaigns/wizard',
        component: CampaignWizardComponent,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'campaigns/access',
        component: CampaignAccessComponent,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'campaigns/:id',
        component: CampaignDetailComponent,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },

      // Reports - Admin only
      { path: 'reports/campaign', component: ReportsComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/publishers', component: PublishersReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/advertisers', component: AdvertisersReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/daily', component: DailyReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/goals', component: GoalsReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/cohort', component: CohortReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/click', component: ClickReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/conversion', component: ConversionReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/impression', component: ImpressionReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/postback-logs', component: PostbackLogsComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/recent-exports', component: RecentExportsComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/scheduled', component: ScheduledReportsComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/cap', component: CapReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/sampling', component: SamplingReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/comparison', component: ComparisonReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'reports/referral', component: ReferralReportComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },

      // Publishers - Admin only
      { path: 'publishers/manage', component: PublishersComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'publishers/postbacks-pixels', component: PostbacksPixelsComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'publishers/postbacks-pixels/edit/:id', component: EditPostbackComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'publishers/postbacks-pixels/logs/:id', component: PostbackPixelLogsComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'publishers/:id', component: PublisherDetailComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },

      // Advertisers - Admin only
      { path: 'advertisers/manage', component: ManageAdvertisersComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'advertisers/postback-hits', component: PostbackHitsReceivedComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'advertisers/edit/:id', component: EditAdvertiserComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'advertisers/:id', component: AdvertiserDetailComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },

      // Profile - All authenticated users
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit-details', component: EditDetailsComponent },
      { path: 'profile/edit-settings', component: EditSettingsComponent },
      { path: 'profile/edit-password', component: EditPasswordComponent },
      { path: 'profile/edit-application', component: EditApplicationComponent },

      // Team Members - Admin only
      { path: 'team-members', component: TeamMembersComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'team-members/:id', component: TeamMemberDetailComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },

      // Publisher Dashboard Route
      {
        path: 'publisher/dashboard',
        component: DashboardComponent, // Use same dashboard or create PublisherDashboardComponent
        canActivate: [roleGuard],
        data: { roles: ['publisher'] }
      },

      // Advertiser Dashboard Route
      {
        path: 'advertiser/dashboard',
        component: DashboardComponent, // Use same dashboard or create AdvertiserDashboardComponent
        canActivate: [roleGuard],
        data: { roles: ['advertiser'] }
      }
    ]
  },

  // Fallback - redirect to login
  { path: '**', redirectTo: 'login' }
];
