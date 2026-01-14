import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reports = [
    { name: 'Global Campaign Performance', type: 'Campaign', date: '2023-10-01 to 2023-10-07', format: 'CSV' },
    { name: 'Publisher Earnings Oct', type: 'Publisher', date: '2023-10-01 to 2023-10-31', format: 'Excel' },
    { name: 'Daily Conversions', type: 'Daily', date: 'Yesterday', format: 'CSV' },
  ];
}
