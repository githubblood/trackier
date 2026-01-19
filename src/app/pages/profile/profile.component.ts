import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails = {
    name: 'David Arora',
    email: 'partners@spaxads.com',
    phone: '9958990708',
    status: 'Active'
  };

  settings = {
    role: 'admin',
    permissions: 'admin',
    emailNotifications: 'Subscribed',
    currency: 'INR',
    language: 'English'
  };

  application = {
    name: 'Spaxads Digital Media Pvt Ltd',
    defaultCurrency: 'INR',
    supportEmail: 'Aadi Arora',
    timeZone: 'NOT SET',
    uploadStatus: 'NOT SET',
    securityToken: '7e42f8b6a5d7c9e8f1a3b2c4d5e6f7a8',
    postbackUrl: 'https://spaxads.trackier.io/postback/track_url=CLICK_URL&token={token}&sub_landing_id={sub_landing_id}&token={token}&sub_id={sub_id}&sub_id_1={sub_id_1}&sub_id_2={sub_id_2}&sub_id_3={sub_id_3}&sub_id_4={sub_id_4}&sub_id_5={sub_id_5}'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editDetails(): void {
    this.router.navigate(['/profile/edit-details']);
  }

  editSettings(): void {
    this.router.navigate(['/profile/edit-settings']);
  }

  editSecurity(): void {
    this.router.navigate(['/profile/edit-password']);
  }

  editApplication(): void {
    this.router.navigate(['/profile/edit-application']);
  }
}
