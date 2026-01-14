import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent {
  campaigns = [
    { id: 1024, name: 'Install App - IOS - US', advertiser: 'App Company', status: 'Active', geo: 'US', payout: '$2.00', revenue: '$3.50', visibility: 'Public' },
    { id: 1025, name: 'Sweepstakes Win', advertiser: 'AdNet', status: 'Paused', geo: 'GB', payout: '$1.50', revenue: '$2.00', visibility: 'Private' },
    { id: 1026, name: 'Utility Cleaner Android', advertiser: 'SoftInc', status: 'Active', geo: 'Global', payout: '$0.50', revenue: '$1.00', visibility: 'Public' },
    { id: 1027, name: 'Casino Royale', advertiser: 'BetKing', status: 'Disabled', geo: 'DE', payout: '$50.00', revenue: '$70.00', visibility: 'Private' },
    { id: 1028, name: 'Dating App Sign up', advertiser: 'DateMe', status: 'Active', geo: 'US, CA', payout: '$4.00', revenue: '$6.00', visibility: 'Public' },
  ];

  getStatusClass(status: string) {
    switch (status) {
      case 'Active': return 'badge bg-success';
      case 'Paused': return 'badge bg-warning text-dark';
      case 'Disabled': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
}
