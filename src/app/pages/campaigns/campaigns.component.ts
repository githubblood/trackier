import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CampaignService } from '../../core/services/campaign.service';
import { Campaign, CampaignListParams } from '../../core/models/campaign.model';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent implements OnInit {
  campaigns: any[] = [];
  loading = false;
  total = 0;
  currentPage = 1;
  pageSize = 10;

  bulkActions = [
    { icon: 'fa-check', label: 'Active', action: 'active' },
    { icon: 'fa-times', label: 'Pause', action: 'pause' },
    { icon: 'fa-clock', label: 'Pending', action: 'pending' },
    { icon: 'fa-clone', label: 'Clone', action: 'clone' },
    { icon: 'fa-ban', label: 'Disable', action: 'disable' },
    { icon: 'fa-trash', label: 'Delete', action: 'delete' },
    { icon: 'fa-eye', label: 'Make Public', action: 'make-public' },
    { icon: 'fa-eye-slash', label: 'Make Private', action: 'make-private' },
    { icon: 'fa-lock', label: 'Make Permission Required', action: 'permission-required' },
    { icon: 'fa-folder', label: 'Assign Categories', action: 'assign-categories' },
    { icon: 'fa-user-slash', label: 'Block Publishers', action: 'block-publishers' },
    { icon: 'fa-user-check', label: 'Unblock Publishers', action: 'unblock-publishers' },
    { icon: 'fa-flask', label: 'Test Offer', action: 'test-offer' },
    { icon: 'fa-file-csv', label: 'Export CSV', action: 'export-csv' },
    { icon: 'fa-link', label: 'Export Tracking Links & Payouts', action: 'export-tracking' },
    { icon: 'fa-user-plus', label: 'Assign Publishers', action: 'assign-publishers' },
    { icon: 'fa-user-minus', label: 'Unassign Publishers', action: 'unassign-publishers' },
    { icon: 'fa-tags', label: 'Assign Tags', action: 'assign-tags' },
  ];

  selectAll = false;
  showFilterPanel = false;

  // Filter fields
  filters = {
    campaignId: '',
    title: '',
    category: '',
    advertiser: '',
    advertiserManager: '',
    objective: '',
    status: '',
    geo: '',
    visibility: '',
    device: '',
    appIdPackageName: '',
    appName: '',
    externalOfferId: '',
    minPayout: '',
    maxPayout: '',
    addDateRange: false
  };

  // Column visibility
  columns = {
    id: true,
    title: true,
    status: true,
    advertiserId: true,
    advertiser: true,
    category: true,
    visibility: true,
    assignedPubs: true,
    objective: true,
    geo: true,
    payout: true,
    revenue: true,
    externalOfferId: false,
    device: false,
    operatingSystem: false,
    dailyConversionCap: true,
    appIdBundleId: false,
    appName: false,
    primaryTrackingDomain: false,
    trackingMethod: true,
    conversionTrackingDomain: false,
    expiryDate: false,
    todayConversion: false,
    blockedPublisher: false,
    createdDate: false,
    redirectType: false,
    trackMultipleConversions: false,
    tags: false
  };

  columnSearch = '';
  onlyExportSelectedField = false;

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.loading = true;
    const params: CampaignListParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    // Apply status filter if set
    if (this.filters.status) {
      params.status = this.filters.status.toLowerCase();
    }

    // Apply search if set
    if (this.filters.title) {
      params.search = this.filters.title;
    }

    this.campaignService.getCampaigns(params).subscribe({
      next: (response) => {
        if (response.success) {
          this.campaigns = response.data.map(c => ({
            ...c,
            name: c.title,
            advertiser: c.advertiser_name || `Advertiser ID: ${c.advertiser_id}`,
            status: c.status.charAt(0).toUpperCase() + c.status.slice(1),
            geo: Array.isArray(c.geo_coverage) ? c.geo_coverage.join(', ') : c.geo_coverage,
            // Default values for fields not in list API
            payout: 'N/A',
            revenue: 'N/A',
            visibility: c.visibility.charAt(0).toUpperCase() + c.visibility.slice(1),
            selected: false
          }));
          this.total = response.pagination.total;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load campaigns', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Active': return 'badge bg-success';
      case 'Paused': return 'badge bg-warning text-dark';
      case 'Disabled': return 'badge bg-danger';
      case 'Pending': return 'badge bg-info';
      default: return 'badge bg-secondary';
    }
  }

  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    this.campaigns.forEach(c => c.selected = this.selectAll);
  }

  getSelectedCount(): number {
    return this.campaigns.filter(c => c.selected).length;
  }

  executeBulkAction(action: string) {
    const selectedCampaigns = this.campaigns.filter(c => c.selected);
    if (selectedCampaigns.length === 0) {
      alert('Please select at least one campaign');
      return;
    }
    console.log(`Executing ${action} on ${selectedCampaigns.length} campaigns`);
  }

  toggleFilterPanel() {
    this.showFilterPanel = !this.showFilterPanel;
  }

  closeFilterPanel() {
    this.showFilterPanel = false;
  }

  clearFilters() {
    this.filters = {
      campaignId: '',
      title: '',
      category: '',
      advertiser: '',
      advertiserManager: '',
      objective: '',
      status: '',
      geo: '',
      visibility: '',
      device: '',
      appIdPackageName: '',
      appName: '',
      externalOfferId: '',
      minPayout: '',
      maxPayout: '',
      addDateRange: false
    };
    this.loadCampaigns(); // Reload on clear
  }

  selectAllColumns() {
    Object.keys(this.columns).forEach(key => {
      (this.columns as any)[key] = true;
    });
  }

  clearColumns() {
    Object.keys(this.columns).forEach(key => {
      (this.columns as any)[key] = false;
    });
  }

  applyFilters() {
    console.log('Applying filters:', this.filters);
    this.currentPage = 1; // Reset to first page
    this.loadCampaigns();
    this.showFilterPanel = false;
  }

  exportFiltered() {
    console.log('Exporting with filters:', this.filters);
  }
}
