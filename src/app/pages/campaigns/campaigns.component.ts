import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent {
  campaigns = [
    { id: 1024, name: 'Install App - IOS - US', advertiser: 'App Company', status: 'Active', geo: 'US', payout: '$2.00', revenue: '$3.50', visibility: 'Public', selected: false },
    { id: 1025, name: 'Sweepstakes Win', advertiser: 'AdNet', status: 'Paused', geo: 'GB', payout: '$1.50', revenue: '$2.00', visibility: 'Private', selected: false },
    { id: 1026, name: 'Utility Cleaner Android', advertiser: 'SoftInc', status: 'Active', geo: 'Global', payout: '$0.50', revenue: '$1.00', visibility: 'Public', selected: false },
    { id: 1027, name: 'Casino Royale', advertiser: 'BetKing', status: 'Disabled', geo: 'DE', payout: '$50.00', revenue: '$70.00', visibility: 'Private', selected: false },
    { id: 1028, name: 'Dating App Sign up', advertiser: 'DateMe', status: 'Active', geo: 'US, CA', payout: '$4.00', revenue: '$6.00', visibility: 'Public', selected: false },
  ];

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
    console.log('Visible columns:', this.columns);
    this.showFilterPanel = false;
  }

  exportFiltered() {
    console.log('Exporting with filters:', this.filters);
  }
}
