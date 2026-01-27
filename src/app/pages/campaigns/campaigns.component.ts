import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignService } from '../../core/services/campaign.service';
import { Campaign, CampaignListParams } from '../../core/models/campaign.model';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgbPaginationModule],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent implements OnInit {
  campaigns: any[] = [];
  loading = false;
  total = 0;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50, 100];

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

  // Displayed columns - these are applied when Search is clicked
  displayedColumns: { [key: string]: boolean } = {};

  // Column definitions with labels and data keys
  columnDefinitions = [
    { key: 'id', label: 'ID', dataKey: 'id' },
    { key: 'title', label: 'Title', dataKey: 'name' },
    { key: 'status', label: 'Status', dataKey: 'status' },
    { key: 'advertiserId', label: 'Advertiser ID', dataKey: 'advertiser_id' },
    { key: 'advertiser', label: 'Advertiser', dataKey: 'advertiser' },
    { key: 'category', label: 'Category', dataKey: 'category' },
    { key: 'visibility', label: 'Visibility', dataKey: 'visibility' },
    { key: 'assignedPubs', label: 'Assigned Pubs', dataKey: 'assignedPubs' },
    { key: 'objective', label: 'Objective', dataKey: 'objective' },
    { key: 'geo', label: 'Geo', dataKey: 'geo' },
    { key: 'payout', label: 'Payout', dataKey: 'payout' },
    { key: 'revenue', label: 'Revenue', dataKey: 'revenue' },
    { key: 'externalOfferId', label: 'External Offer ID', dataKey: 'externalOfferId' },
    { key: 'device', label: 'Device', dataKey: 'device' },
    { key: 'operatingSystem', label: 'Operating System', dataKey: 'operatingSystem' },
    { key: 'dailyConversionCap', label: 'Daily Conversion CAP', dataKey: 'dailyConversionCap' },
    { key: 'appIdBundleId', label: 'App ID/Bundle ID', dataKey: 'appIdBundleId' },
    { key: 'appName', label: 'App Name', dataKey: 'appName' },
    { key: 'primaryTrackingDomain', label: 'Primary Tracking Domain', dataKey: 'primaryTrackingDomain' },
    { key: 'trackingMethod', label: 'Tracking Method', dataKey: 'trackingMethod' },
    { key: 'conversionTrackingDomain', label: 'Conversion Tracking Domain', dataKey: 'conversionTrackingDomain' },
    { key: 'expiryDate', label: 'Expiry Date', dataKey: 'expiryDate' },
    { key: 'todayConversion', label: 'Today Conversion', dataKey: 'todayConversion' },
    { key: 'blockedPublisher', label: 'Blocked Publisher', dataKey: 'blockedPublisher' },
    { key: 'createdDate', label: 'Created Date', dataKey: 'createdDate' },
    { key: 'redirectType', label: 'Redirect Type', dataKey: 'redirectType' },
    { key: 'trackMultipleConversions', label: 'Track Multiple Conversions', dataKey: 'trackMultipleConversions' },
    { key: 'tags', label: 'Tags', dataKey: 'tags' }
  ];

  constructor(private campaignService: CampaignService) {
    // Initialize displayedColumns with current column visibility
    this.applyColumnSelection();
  }

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.loading = true;
    const params: CampaignListParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    // Apply search filter (title)
    if (this.filters.title) {
      params.search = this.filters.title;
    }

    // Apply status filter
    if (this.filters.status) {
      params.status = this.filters.status.toLowerCase();
    }

    // Apply advertiser filter (extract ID if needed)
    if (this.filters.advertiser) {
      // If advertiser is a name, we need to handle it - for now assume it could be ID or name
      const advertiserId = parseInt(this.filters.advertiser, 10);
      if (!isNaN(advertiserId)) {
        params.advertiser_id = advertiserId;
      }
    }

    // Apply visibility filter
    if (this.filters.visibility) {
      params.visibility = this.filters.visibility.toLowerCase().replace(' ', '_');
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
          // Use pagination total if available, otherwise use data array length
          this.total = response.pagination?.total ?? response.data.length;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load campaigns', err);
        this.loading = false;
      }
    });
  }

  // Pagination handlers
  onPageChange(page: number): void {
    this.currentPage = page;
    this.selectAll = false;
    this.loadCampaigns();
  }

  onPageSizeChange(): void {
    this.currentPage = 1; // Reset to first page when changing page size
    this.selectAll = false;
    this.loadCampaigns();
  }

  // Calculate pagination info
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.total ? this.total : end;
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
    this.applyColumnSelection(); // Apply column selection when Search is clicked
    this.currentPage = 1; // Reset to first page
    this.loadCampaigns();
    this.showFilterPanel = false;
  }

  // Apply column selection - copies current checkbox state to displayedColumns
  applyColumnSelection() {
    this.displayedColumns = { ...this.columns };
  }

  // Get only the visible columns based on displayedColumns
  getVisibleColumns() {
    return this.columnDefinitions.filter(col => this.displayedColumns[col.key]);
  }

  // Get column value from campaign data
  getColumnValue(campaign: any, dataKey: string): any {
    return campaign[dataKey] ?? '-';
  }

  exportFiltered() {
    console.log('Exporting with filters:', this.filters);
  }
}
