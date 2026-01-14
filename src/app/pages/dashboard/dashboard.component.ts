import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  metrics = [
    { title: 'Clicks', today: '120', yesterday: '100', mtd: '3,400', color: 'primary' },
    { title: 'Conversions', today: '5', yesterday: '2', mtd: '150', color: 'success' },
    { title: 'Impressions', today: '5,000', yesterday: '4,800', mtd: '120,000', color: 'info' },
    { title: 'Payout', today: '$120.00', yesterday: '$50.00', mtd: '$3,400.00', color: 'warning' },
    { title: 'Revenue', today: '$200.00', yesterday: '$150.00', mtd: '$5,000.00', color: 'danger' },
    { title: 'Unique Clicks', today: '90', yesterday: '80', mtd: '2,800', color: 'secondary' }
  ];
}
