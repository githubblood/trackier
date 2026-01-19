import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-edit-application',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss']
})
export class EditApplicationComponent implements OnInit {
  preferences = {
    sidebarColor: '#1589c2',
    sidebarTextColor: '#000000',
    backgroundTheme: 'light',
    headingColor: '#1589c2',
    dashboardData: 'Approved'
  };

  twoFASettings = {
    teamMembers: false,
    publisher: false,
    advertiser: false
  };

  securitySettings = {
    maxDays: 7,
    maxFailedAttempts: 3
  };

  sidebarColorPresets = [
    '#1589c2', '#2d3748', '#1976d2', '#1565c0', '#0d47a1',
    '#2e7d32', '#f9a825', '#ff8f00', '#e65100', '#ad1457'
  ];

  panelLayout = {
    organizationName: 'Spaxads Digital Media Pvt Ltd',
    currency: 'INR',
    language: 'English',
    timezone: 'Asia/Kolkata',
    iframeLoading: 'sameorigin',
    supportEmail: '',
    skypeId: '',
    telegramId: '',
    whatsappId: '',
    termsUrl: '',
    privacyUrl: '',
    publisherRegUrl: '',
    advertiserRegUrl: '',
    advertiserTermsUrl: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void { }

  save(): void {
    console.log('Saving application settings');
    console.log('Preferences:', this.preferences);
    console.log('2FA Settings:', this.twoFASettings);
    console.log('Security Settings:', this.securitySettings);
    this.router.navigate(['/profile']);
  }
}
