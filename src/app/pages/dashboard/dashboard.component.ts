import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardData } from '../../core/models/dashboard.model';

interface MetricCard {
  title: string;
  today: string | number;
  yesterday: string | number;
  mtd: string | number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  metrics: MetricCard[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = null;

    this.dashboardService.getAdminDashboard().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.dashboardData = response.data;
          this.prepareMetrics();
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Failed to load dashboard data:', err);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
        // Set default/fallback metrics if needed
        this.setFallbackMetrics();
      }
    });
  }

  prepareMetrics(): void {
    if (!this.dashboardData) return;

    const stats = this.dashboardData.stats;

    this.metrics = [
      {
        title: 'Clicks',
        today: stats.clicks.today.toLocaleString(),
        yesterday: stats.clicks.yesterday.toLocaleString(),
        mtd: stats.clicks.mtd.toLocaleString(),
        color: 'primary'
      },
      {
        title: 'Unique Clicks',
        today: stats.unique_clicks.today.toLocaleString(),
        yesterday: stats.unique_clicks.yesterday.toLocaleString(),
        mtd: stats.unique_clicks.mtd.toLocaleString(),
        color: 'secondary'
      },
      {
        title: 'Conversions',
        today: stats.conversions.today.toLocaleString(),
        yesterday: stats.conversions.yesterday.toLocaleString(),
        mtd: stats.conversions.mtd.toLocaleString(),
        color: 'success'
      },
      {
        title: 'Impressions',
        today: stats.impressions.today.toLocaleString(),
        yesterday: stats.impressions.yesterday.toLocaleString(),
        mtd: stats.impressions.mtd.toLocaleString(),
        color: 'info'
      },
      {
        title: 'Payout',
        today: `$${stats.payout.today.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        yesterday: `$${stats.payout.yesterday.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        mtd: `$${stats.payout.mtd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        color: 'warning'
      },
      {
        title: 'Revenue',
        today: `$${stats.revenue.today.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        yesterday: `$${stats.revenue.yesterday.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        mtd: `$${stats.revenue.mtd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        color: 'danger'
      }
    ];
  }

  setFallbackMetrics(): void {
    this.metrics = [
      { title: 'Clicks', today: '-', yesterday: '-', mtd: '-', color: 'primary' },
      { title: 'Unique Clicks', today: '-', yesterday: '-', mtd: '-', color: 'secondary' },
      { title: 'Conversions', today: '-', yesterday: '-', mtd: '-', color: 'success' },
      { title: 'Impressions', today: '-', yesterday: '-', mtd: '-', color: 'info' },
      { title: 'Payout', today: '-', yesterday: '-', mtd: '-', color: 'warning' },
      { title: 'Revenue', today: '-', yesterday: '-', mtd: '-', color: 'danger' }
    ];
  }

  get campaignStatus() {
    return this.dashboardData?.campaign_status;
  }

  get analytics() {
    return this.dashboardData?.analytics || [];
  }
}
