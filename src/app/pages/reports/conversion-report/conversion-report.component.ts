import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-conversion-report',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './conversion-report.component.html',
  styleUrls: ['./conversion-report.component.scss']
})
export class ConversionReportComponent {
  searchQuery = '';
  showFilterPanel = false;
  showDownloadMenu = false;
  showNewReportModal = false;
  newReportName = '';
  startDate = '2026-01-14';
  endDate = '2026-01-15';
  selectAll = false;

  filters = {
    campaign: '',
    publisher: '',
    advertiser: '',
    conversionId: '',
    goalName: '',
    status: 'all'
  };

  // All columns for the conversion report
  columns = [
    { key: 'selected', label: '', type: 'checkbox' },
    { key: 'publisher', label: 'Publisher Name', type: 'link' },
    { key: 'source', label: 'Source', type: 'text' },
    { key: 'p1', label: 'P1', type: 'badge' },
    { key: 'campaign', label: 'Campaign Name', type: 'link' },
    { key: 'goalName', label: 'Goal Name', type: 'text' },
    { key: 'goalValue', label: 'Goal Value', type: 'currency' },
    { key: 'payout', label: 'Payout', type: 'currency' },
    { key: 'revenue', label: 'Revenue', type: 'currency' },
    { key: 'clickIp', label: 'Click IP', type: 'code' },
    { key: 'city', label: 'City', type: 'text' },
    { key: 'country', label: 'Country', type: 'country' },
    { key: 'region', label: 'Region', type: 'text' },
    { key: 'conversionId', label: 'Conversion ID', type: 'code' },
    { key: 'clickId', label: 'Click ID', type: 'code' },
    { key: 'clickToConversionTime', label: 'Click To Conversion Time', type: 'text' },
    { key: 'conversionMethod', label: 'Conversion Method', type: 'badge' },
    { key: 'advertiser', label: 'Advertiser', type: 'link' },
    { key: 'device', label: 'Device', type: 'text' },
    { key: 'os', label: 'OS', type: 'text' },
    { key: 'browser', label: 'Browser', type: 'text' },
    { key: 'note', label: 'Note', type: 'text' },
    { key: 'created', label: 'Created', type: 'datetime' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'action', label: 'Action', type: 'action' }
  ];

  conversions = [
    {
      selected: false,
      publisher: 'GF Gaming Pub Jan\'26', publisherId: '553',
      source: '', p1: '',
      campaign: 'Boho- CA- Dec\'25', campaignId: '943',
      goalName: 'registration', goalValue: 0.01, payout: 0.01, revenue: 0.01,
      clickIp: '260x.3d09.s716.8a00.d581.29c7.4318.8155', city: 'Blairmore',
      country: 'CA', countryCode: 'CA', region: 'Alberta',
      conversionId: 'CNV001', clickId: 'CLK001',
      clickToConversionTime: '2m 34s', conversionMethod: 'Postback',
      advertiser: 'Gulfstream Dec\'25', advertiserId: '529',
      device: 'Desktop', os: 'Windows 10', browser: 'Chrome',
      note: '', created: '2026-01-14 10:23:45', status: 'approved'
    },
    {
      selected: false,
      publisher: 'GF Gaming Pub Jan\'26', publisherId: '553',
      source: '', p1: '',
      campaign: 'Boho- CA- Dec\'25', campaignId: '943',
      goalName: 'registration', goalValue: 0.01, payout: 0.01, revenue: 0.01,
      clickIp: '192.30.234.90', city: 'Trenton',
      country: 'CA', countryCode: 'CA', region: 'Ontario',
      conversionId: 'CNV002', clickId: 'CLK002',
      clickToConversionTime: '5m 12s', conversionMethod: 'Postback',
      advertiser: 'Gulfstream Dec\'25', advertiserId: '529',
      device: 'Mobile', os: 'iOS 17', browser: 'Safari',
      note: '', created: '2026-01-14 10:22:30', status: 'approved'
    },
    {
      selected: false,
      publisher: 'GF Gaming Pub Jul\'26', publisherId: '553',
      source: '', p1: '',
      campaign: 'Boho- CA- Dec\'25', campaignId: '943',
      goalName: 'registration', goalValue: 0.01, payout: 0.01, revenue: 0.01,
      clickIp: '192.168.1.3', city: 'Brampton',
      country: 'CA', countryCode: 'CA', region: 'Ontario',
      conversionId: 'CNV003', clickId: 'CLK003',
      clickToConversionTime: '1m 45s', conversionMethod: 'Pixel',
      advertiser: 'Gulfstream Dec\'25', advertiserId: '529',
      device: 'Tablet', os: 'Android 13', browser: 'Firefox',
      note: '', created: '2026-01-14 10:21:15', status: 'approved'
    },
    {
      selected: false,
      publisher: 'KA David Pub- Jan\'26', publisherId: '510',
      source: '', p1: '',
      campaign: 'Winner Casino CA', campaignId: '992',
      goalName: 'Complete_Registration', goalValue: 1.00, payout: 1.00, revenue: 1.30,
      clickIp: '142.188.100.35', city: 'Brampton',
      country: 'CA', countryCode: 'CA', region: 'Ontario',
      conversionId: 'CNV004', clickId: 'CLK004',
      clickToConversionTime: '8m 22s', conversionMethod: 'Postback',
      advertiser: 'Winner Casino', advertiserId: '530',
      device: 'Desktop', os: 'macOS 14', browser: 'Safari',
      note: '', created: '2026-01-14 10:20:00', status: 'approved'
    },
    {
      selected: false,
      publisher: 'Betmen Pub Jan\'26', publisherId: '560',
      source: '', p1: '',
      campaign: 'Spingranny- CA- Jan\'26', campaignId: '964',
      goalName: 'registration', goalValue: 0.01, payout: 0.01, revenue: 0.01,
      clickIp: '192.80.164.50', city: 'Burnaby',
      country: 'CA', countryCode: 'CA', region: 'BC',
      conversionId: 'CNV005', clickId: 'CLK005',
      clickToConversionTime: '3m 15s', conversionMethod: 'Postback',
      advertiser: 'Spingranny', advertiserId: '531',
      device: 'Mobile', os: 'Android 14', browser: 'Chrome',
      note: '', created: '2026-01-14 10:19:45', status: 'pending'
    },
    {
      selected: false,
      publisher: 'KA David Pub- Jan\'26', publisherId: '510',
      source: '', p1: '',
      campaign: 'Winner Casino CA', campaignId: '992',
      goalName: 'Complete_Registration', goalValue: 1.00, payout: 1.00, revenue: 1.30,
      clickIp: '2607.fea8.6080.0500.b4d7.4b70.b818.b6b4', city: 'Cambridge',
      country: 'CA', countryCode: 'CA', region: 'Ontario',
      conversionId: 'CNV006', clickId: 'CLK006',
      clickToConversionTime: '12m 08s', conversionMethod: 'Postback',
      advertiser: 'Winner Casino', advertiserId: '530',
      device: 'Desktop', os: 'Windows 11', browser: 'Edge',
      note: '', created: '2026-01-14 10:18:30', status: 'approved'
    },
    {
      selected: false,
      publisher: 'KA David Pub- Jan\'26', publisherId: '510',
      source: '', p1: '',
      campaign: 'Winner Casino CA', campaignId: '992',
      goalName: 'Complete_Registration', goalValue: 1.00, payout: 1.00, revenue: 1.30,
      clickIp: '2001.569f.9706.6800.3068.81db.5399.235x', city: 'Kamloops',
      country: 'CA', countryCode: 'CA', region: 'BC',
      conversionId: 'CNV007', clickId: 'CLK007',
      clickToConversionTime: '4m 56s', conversionMethod: 'Postback',
      advertiser: 'Winner Casino', advertiserId: '530',
      device: 'Mobile', os: 'iOS 16', browser: 'Safari',
      note: '', created: '2026-01-14 10:17:15', status: 'approved'
    },
    {
      selected: false,
      publisher: 'KA David Pub- Jan\'26', publisherId: '510',
      source: '', p1: '',
      campaign: 'Winner Casino CA', campaignId: '992',
      goalName: 'Complete_Registration', goalValue: 1.00, payout: 1.00, revenue: 1.30,
      clickIp: '24.150.254.369', city: 'St Catharines',
      country: 'CA', countryCode: 'CA', region: 'Ontario',
      conversionId: 'CNV008', clickId: 'CLK008',
      clickToConversionTime: '6m 33s', conversionMethod: 'Pixel',
      advertiser: 'Winner Casino', advertiserId: '530',
      device: 'Desktop', os: 'Linux', browser: 'Firefox',
      note: '', created: '2026-01-14 10:16:00', status: 'rejected'
    },
    {
      selected: false,
      publisher: 'Gentle Partners Pub Gaming Jan\'26', publisherId: '553',
      source: '', p1: '',
      campaign: 'Spinsto- DE- Jan\'26', campaignId: '962',
      goalName: 'Registration', goalValue: 0.01, payout: 0.01, revenue: 0.01,
      clickIp: '2a02.8109.9ca3.1700.b1b2.7ad8c.9fc4.dc80', city: 'Berlin',
      country: 'DE', countryCode: 'DE', region: 'Berlin',
      conversionId: 'CNV009', clickId: 'CLK009',
      clickToConversionTime: '2m 18s', conversionMethod: 'Postback',
      advertiser: 'Spinsto', advertiserId: '532',
      device: 'Desktop', os: 'Windows 10', browser: 'Chrome',
      note: '', created: '2026-01-14 10:15:45', status: 'approved'
    },
    {
      selected: false,
      publisher: 'Gentle Partners Pub Gaming Jan\'26', publisherId: '553',
      source: '', p1: '',
      campaign: 'Oceanpoq- DE- Jan\'26', campaignId: '963',
      goalName: 'Registration', goalValue: 0.01, payout: 0.01, revenue: 0.01,
      clickIp: '2a02.8070.185b.6a8b.9cae.efbc.919bc.c54a', city: 'Stuttgart',
      country: 'DE', countryCode: 'DE', region: 'BW',
      conversionId: 'CNV010', clickId: 'CLK010',
      clickToConversionTime: '9m 41s', conversionMethod: 'Postback',
      advertiser: 'Oceanpoq', advertiserId: '533',
      device: 'Mobile', os: 'Android 12', browser: 'Samsung Internet',
      note: '', created: '2026-01-14 10:14:30', status: 'approved'
    }
  ];

  get filteredData() {
    return this.conversions.filter(item => {
      const matchesSearch = !this.searchQuery ||
        item.publisher.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.campaign.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.filters.status === 'all' || item.status === this.filters.status;
      return matchesSearch && matchesStatus;
    });
  }

  get totalConversions(): number {
    return this.conversions.length;
  }

  toggleSelectAll(): void {
    this.conversions.forEach(item => item.selected = this.selectAll);
  }

  toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
  closeFilterPanel() { this.showFilterPanel = false; }
  applyFilters() { this.closeFilterPanel(); }
  toggleDownloadMenu() { this.showDownloadMenu = !this.showDownloadMenu; }
  downloadCSV() { console.log('Downloading CSV'); this.showDownloadMenu = false; }
  downloadExcel() { console.log('Downloading Excel'); this.showDownloadMenu = false; }
  downloadPDF() { console.log('Downloading PDF'); this.showDownloadMenu = false; }
  createNewReport() { this.newReportName = ''; this.showNewReportModal = true; }
  closeNewReportModal() { this.showNewReportModal = false; this.newReportName = ''; }
  confirmNewReport() {
    if (this.newReportName.trim()) {
      alert('Report "' + this.newReportName + '" created successfully!');
      this.closeNewReportModal();
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-success';
      case 'pending': return 'bg-warning text-dark';
      case 'rejected': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getFlagEmoji(countryCode: string): string {
    if (!countryCode) return '';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
}
