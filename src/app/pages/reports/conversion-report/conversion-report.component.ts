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
  filterView: 'old' | 'new' = 'old';
  reportOptionSearch = '';

  filters = {
    campaign: '',
    publisher: '',
    advertiser: '',
    conversionId: '',
    goalName: '',
    status: 'all',
    clickId: '',
    clickIp: '',
    conversionIp: '',
    txnId: '',
    source: '',
    conversionMethod: 'all',
    smartLink: '',
    externalOfferIds: ''
  };

  // Report Options - Column 1 (Publisher Info)
  reportOptionsCol1 = [
    { id: 'opt_publisher_name', label: 'Publisher Name', selected: true },
    { id: 'opt_publisher_id', label: 'Publisher ID', selected: false },
    { id: 'opt_publisher_manager', label: 'Publisher Manager', selected: false },
    { id: 'opt_publisher_username', label: 'Publisher Username', selected: false },
    { id: 'opt_source', label: 'Source', selected: true },
    { id: 'opt_p1', label: 'P1', selected: true },
    { id: 'opt_p2', label: 'P2', selected: false },
    { id: 'opt_p3', label: 'P3', selected: false },
    { id: 'opt_p4', label: 'P4', selected: false },
    { id: 'opt_p5', label: 'P5', selected: false },
    { id: 'opt_p6', label: 'P6', selected: false },
    { id: 'opt_p7', label: 'P7', selected: false },
    { id: 'opt_p8', label: 'P8', selected: false },
    { id: 'opt_p9', label: 'P9', selected: false },
    { id: 'opt_p10', label: 'P10', selected: false },
    { id: 'opt_gaid', label: 'GAID', selected: false },
    { id: 'opt_idfa', label: 'IDFA', selected: false },
    { id: 'opt_app_id', label: 'App ID', selected: false },
    { id: 'opt_app_name', label: 'App Name', selected: false },
    { id: 'opt_android_id', label: 'Android ID', selected: false }
  ];

  // Report Options - Column 2 (Advertiser & Sub-IDs)
  reportOptionsCol2 = [
    { id: 'opt_advertiser', label: 'Advertiser', selected: true },
    { id: 'opt_advertiser_manager', label: 'Advertiser Manager', selected: false },
    { id: 'opt_sub1', label: 'SUB1', selected: false },
    { id: 'opt_sub2', label: 'SUB2', selected: false },
    { id: 'opt_sub3', label: 'SUB3', selected: false },
    { id: 'opt_sub4', label: 'SUB4', selected: false },
    { id: 'opt_sub5', label: 'SUB5', selected: false },
    { id: 'opt_sub6', label: 'SUB6', selected: false },
    { id: 'opt_sub7', label: 'SUB7', selected: false },
    { id: 'opt_sub8', label: 'SUB8', selected: false },
    { id: 'opt_sub9', label: 'SUB9', selected: false },
    { id: 'opt_sub10', label: 'SUB10', selected: false },
    { id: 'opt_sub11', label: 'SUB11', selected: false },
    { id: 'opt_sub12', label: 'SUB12', selected: false },
    { id: 'opt_sub13', label: 'SUB13', selected: false },
    { id: 'opt_sub14', label: 'SUB14', selected: false },
    { id: 'opt_sub15', label: 'SUB15', selected: false },
    { id: 'opt_txn_id', label: 'Txn ID', selected: false },
    { id: 'opt_external_user_id', label: 'External User ID', selected: false },
    { id: 'opt_sale_amount', label: 'Sale Amount', selected: false },
    { id: 'opt_original_sale_amount', label: 'Original Sale Amount', selected: false },
    { id: 'opt_original_sale_currency', label: 'Original Sale Currency', selected: false }
  ];

  // Report Options - Column 3 (Campaign & Financials)
  reportOptionsCol3 = [
    { id: 'opt_campaign_name', label: 'Campaign Name', selected: true },
    { id: 'opt_external_offer_id', label: 'External Offer ID', selected: false },
    { id: 'opt_landing_page', label: 'Landing Page', selected: false },
    { id: 'opt_campaign_categories', label: 'Campaign Categories', selected: false },
    { id: 'opt_goal_id', label: 'Goal ID', selected: false },
    { id: 'opt_goal_name', label: 'Goal Name', selected: true },
    { id: 'opt_goal_value', label: 'Goal Value', selected: true },
    { id: 'opt_referrer_campaign', label: 'Referrer Campaign', selected: false },
    { id: 'opt_payout', label: 'Payout', selected: true },
    { id: 'opt_revenue', label: 'Revenue', selected: true },
    { id: 'opt_currency', label: 'Currency', selected: false },
    { id: 'opt_release_order_id', label: 'Release Order ID', selected: false },
    { id: 'opt_smart_link', label: 'Smart Link', selected: false }
  ];

  // Report Options - Column 4 (Geo & Technical)
  reportOptionsCol4 = [
    { id: 'opt_conversion_ip', label: 'Conversion IP', selected: false },
    { id: 'opt_click_ip', label: 'Click IP', selected: true },
    { id: 'opt_city', label: 'City', selected: true },
    { id: 'opt_region', label: 'Region', selected: true },
    { id: 'opt_country_iso', label: 'Country (ISO)', selected: false },
    { id: 'opt_carrier_isp', label: 'Carrier (ISP)', selected: false },
    { id: 'opt_latitude', label: 'Latitude', selected: false },
    { id: 'opt_longitude', label: 'Longitude', selected: false },
    { id: 'opt_connection_type', label: 'Connection Type', selected: false },
    { id: 'opt_browser', label: 'Browser', selected: true },
    { id: 'opt_os', label: 'Operating System (OS)', selected: true },
    { id: 'opt_device', label: 'Device', selected: true },
    { id: 'opt_device_language', label: 'Device Language', selected: false },
    { id: 'opt_click_user_agent', label: 'Click User Agent', selected: false }
  ];

  // Report Options - Column 5 (Conversion Details)
  reportOptionsCol5 = [
    { id: 'opt_conversion_id', label: 'Conversion ID', selected: true },
    { id: 'opt_click_id', label: 'Click ID', selected: true },
    { id: 'opt_click_to_conversion_time', label: 'Click to Conversion Time', selected: true },
    { id: 'opt_install_to_event_elapsed_time', label: 'Install to Event elapsed Time', selected: false },
    { id: 'opt_conversion_method', label: 'Conversion Method', selected: true },
    { id: 'opt_type', label: 'Type', selected: false },
    { id: 'opt_device_id', label: 'Device ID', selected: false },
    { id: 'opt_note', label: 'Note', selected: true },
    { id: 'opt_image_pixel_referrer', label: 'Image Pixel Referer', selected: false },
    { id: 'opt_click_referrer', label: 'Click Referer', selected: false },
    { id: 'opt_hold_period_expire_time', label: 'Hold Period Expire Time', selected: false },
    { id: 'opt_is_view_through_attribution', label: 'Is View Through Attribution', selected: false },
    { id: 'opt_attributed_via_privacy_postback', label: 'Attributed via Privacy Postback', selected: false },
    { id: 'opt_paid_at', label: 'Paid At', selected: false },
    { id: 'opt_attributed_touch_type', label: 'Attributed Touch Type', selected: false },
    { id: 'opt_fbclid', label: 'Fbclid', selected: false },
    { id: 'opt_conversion_geo', label: 'Conversion GEO', selected: false },
    { id: 'opt_ad_placement', label: 'Ad Placement', selected: false },
    { id: 'opt_demographic', label: 'Demographic', selected: false },
    { id: 'opt_deeplink_url', label: 'Deeplink url', selected: false },
    { id: 'opt_postback_reason', label: 'Postback Reason', selected: false },
    { id: 'opt_gclid', label: 'Gclid', selected: false },
    { id: 'opt_dbtid', label: 'dbtid', selected: false },
    { id: 'opt_created', label: 'Created', selected: true }
  ];

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

  // Filter Modal Methods
  switchFilterView(): void {
    this.filterView = this.filterView === 'old' ? 'new' : 'old';
  }

  selectAllReportOptions(): void {
    this.setAllReportOptions(true);
  }

  clearAllReportOptions(): void {
    this.setAllReportOptions(false);
  }

  private setAllReportOptions(value: boolean): void {
    this.reportOptionsCol1.forEach(opt => opt.selected = value);
    this.reportOptionsCol2.forEach(opt => opt.selected = value);
    this.reportOptionsCol3.forEach(opt => opt.selected = value);
    this.reportOptionsCol4.forEach(opt => opt.selected = value);
    this.reportOptionsCol5.forEach(opt => opt.selected = value);
  }

  getFilteredOptions(options: Array<{ id: string, label: string, selected: boolean }>): Array<{ id: string, label: string, selected: boolean }> {
    if (!this.reportOptionSearch) {
      return options;
    }
    const search = this.reportOptionSearch.toLowerCase();
    return options.filter(opt => opt.label.toLowerCase().includes(search));
  }

  // Fields Modal Methods
  showFieldsModal = false;

  openFieldsModal(): void {
    this.showFieldsModal = true;
  }

  closeFieldsModal(): void {
    this.showFieldsModal = false;
  }

  getAllReportOptions(): Array<{ id: string, label: string, selected: boolean }> {
    return [
      ...this.reportOptionsCol1,
      ...this.reportOptionsCol2,
      ...this.reportOptionsCol3,
      ...this.reportOptionsCol4,
      ...this.reportOptionsCol5
    ];
  }

  getSelectedFieldTags(): Array<{ id: string, label: string, selected: boolean }> {
    return this.getAllReportOptions().filter(opt => opt.selected).slice(0, 10);
  }

  removeField(fieldId: string): void {
    const allOptions = this.getAllReportOptions();
    const option = allOptions.find(opt => opt.id === fieldId);
    if (option) {
      option.selected = false;
    }
  }

  // Column mapping from report option ID to data key - MUST include ALL report options
  columnMapping: { [key: string]: { dataKey: string, label: string, type: string } } = {
    // Column 1 - Publisher Info
    'opt_publisher_name': { dataKey: 'publisher', label: 'Publisher Name', type: 'link' },
    'opt_publisher_id': { dataKey: 'publisherId', label: 'Publisher ID', type: 'text' },
    'opt_publisher_manager': { dataKey: 'publisherManager', label: 'Publisher Manager', type: 'text' },
    'opt_publisher_username': { dataKey: 'publisherUsername', label: 'Publisher Username', type: 'text' },
    'opt_source': { dataKey: 'source', label: 'Source', type: 'text' },
    'opt_p1': { dataKey: 'p1', label: 'P1', type: 'badge' },
    'opt_p2': { dataKey: 'p2', label: 'P2', type: 'badge' },
    'opt_p3': { dataKey: 'p3', label: 'P3', type: 'badge' },
    'opt_p4': { dataKey: 'p4', label: 'P4', type: 'badge' },
    'opt_p5': { dataKey: 'p5', label: 'P5', type: 'badge' },
    'opt_p6': { dataKey: 'p6', label: 'P6', type: 'badge' },
    'opt_p7': { dataKey: 'p7', label: 'P7', type: 'badge' },
    'opt_p8': { dataKey: 'p8', label: 'P8', type: 'badge' },
    'opt_p9': { dataKey: 'p9', label: 'P9', type: 'badge' },
    'opt_p10': { dataKey: 'p10', label: 'P10', type: 'badge' },
    'opt_gaid': { dataKey: 'gaid', label: 'GAID', type: 'code' },
    'opt_idfa': { dataKey: 'idfa', label: 'IDFA', type: 'code' },
    'opt_app_id': { dataKey: 'appId', label: 'App ID', type: 'text' },
    'opt_app_name': { dataKey: 'appName', label: 'App Name', type: 'text' },
    'opt_android_id': { dataKey: 'androidId', label: 'Android ID', type: 'code' },

    // Column 2 - Advertiser & Sub-IDs
    'opt_advertiser': { dataKey: 'advertiser', label: 'Advertiser', type: 'link' },
    'opt_advertiser_manager': { dataKey: 'advertiserManager', label: 'Advertiser Manager', type: 'text' },
    'opt_sub1': { dataKey: 'sub1', label: 'SUB1', type: 'text' },
    'opt_sub2': { dataKey: 'sub2', label: 'SUB2', type: 'text' },
    'opt_sub3': { dataKey: 'sub3', label: 'SUB3', type: 'text' },
    'opt_sub4': { dataKey: 'sub4', label: 'SUB4', type: 'text' },
    'opt_sub5': { dataKey: 'sub5', label: 'SUB5', type: 'text' },
    'opt_sub6': { dataKey: 'sub6', label: 'SUB6', type: 'text' },
    'opt_sub7': { dataKey: 'sub7', label: 'SUB7', type: 'text' },
    'opt_sub8': { dataKey: 'sub8', label: 'SUB8', type: 'text' },
    'opt_sub9': { dataKey: 'sub9', label: 'SUB9', type: 'text' },
    'opt_sub10': { dataKey: 'sub10', label: 'SUB10', type: 'text' },
    'opt_sub11': { dataKey: 'sub11', label: 'SUB11', type: 'text' },
    'opt_sub12': { dataKey: 'sub12', label: 'SUB12', type: 'text' },
    'opt_sub13': { dataKey: 'sub13', label: 'SUB13', type: 'text' },
    'opt_sub14': { dataKey: 'sub14', label: 'SUB14', type: 'text' },
    'opt_sub15': { dataKey: 'sub15', label: 'SUB15', type: 'text' },
    'opt_txn_id': { dataKey: 'txnId', label: 'TXN ID', type: 'text' },
    'opt_external_user_id': { dataKey: 'externalUserId', label: 'External User ID', type: 'text' },
    'opt_sale_amount': { dataKey: 'saleAmount', label: 'Sale Amount', type: 'currency' },
    'opt_original_sale_amount': { dataKey: 'originalSaleAmount', label: 'Original Sale Amount', type: 'currency' },
    'opt_original_sale_currency': { dataKey: 'originalSaleCurrency', label: 'Original Sale Currency', type: 'text' },

    // Column 3 - Campaign & Financials
    'opt_campaign_name': { dataKey: 'campaign', label: 'Campaign Name', type: 'link' },
    'opt_external_offer_id': { dataKey: 'externalOfferId', label: 'External Offer ID', type: 'text' },
    'opt_landing_page': { dataKey: 'landingPage', label: 'Landing Page', type: 'text' },
    'opt_campaign_categories': { dataKey: 'campaignCategories', label: 'Campaign Categories', type: 'text' },
    'opt_goal_id': { dataKey: 'goalId', label: 'Goal ID', type: 'text' },
    'opt_goal_name': { dataKey: 'goalName', label: 'Goal Name', type: 'text' },
    'opt_goal_value': { dataKey: 'goalValue', label: 'Goal Value', type: 'currency' },
    'opt_referrer_campaign': { dataKey: 'referrerCampaign', label: 'Referrer Campaign', type: 'text' },
    'opt_payout': { dataKey: 'payout', label: 'Payout', type: 'currency' },
    'opt_revenue': { dataKey: 'revenue', label: 'Revenue', type: 'currency' },
    'opt_currency': { dataKey: 'currency', label: 'Currency', type: 'text' },
    'opt_release_order_id': { dataKey: 'releaseOrderId', label: 'Release Order ID', type: 'text' },
    'opt_smart_link': { dataKey: 'smartLink', label: 'Smart Link', type: 'text' },

    // Column 4 - Geo & Technical
    'opt_conversion_ip': { dataKey: 'conversionIp', label: 'Conversion IP', type: 'code' },
    'opt_click_ip': { dataKey: 'clickIp', label: 'Click IP', type: 'code' },
    'opt_city': { dataKey: 'city', label: 'City', type: 'text' },
    'opt_region': { dataKey: 'region', label: 'Region', type: 'text' },
    'opt_country_iso': { dataKey: 'country', label: 'Country', type: 'country' },
    'opt_carrier_isp': { dataKey: 'carrier', label: 'Carrier (ISP)', type: 'text' },
    'opt_latitude': { dataKey: 'latitude', label: 'Latitude', type: 'text' },
    'opt_longitude': { dataKey: 'longitude', label: 'Longitude', type: 'text' },
    'opt_connection_type': { dataKey: 'connectionType', label: 'Connection Type', type: 'text' },
    'opt_browser': { dataKey: 'browser', label: 'Browser', type: 'text' },
    'opt_os': { dataKey: 'os', label: 'Operating System', type: 'text' },
    'opt_device': { dataKey: 'device', label: 'Device', type: 'text' },
    'opt_device_language': { dataKey: 'deviceLanguage', label: 'Device Language', type: 'text' },
    'opt_click_user_agent': { dataKey: 'clickUserAgent', label: 'Click User Agent', type: 'text' },

    // Column 5 - Conversion Details
    'opt_conversion_id': { dataKey: 'conversionId', label: 'Conversion ID', type: 'code' },
    'opt_click_id': { dataKey: 'clickId', label: 'Click ID', type: 'code' },
    'opt_click_to_conversion_time': { dataKey: 'clickToConversionTime', label: 'Click to Conversion Time', type: 'text' },
    'opt_install_to_event_elapsed_time': { dataKey: 'installToEventElapsedTime', label: 'Install to Event Elapsed Time', type: 'text' },
    'opt_conversion_method': { dataKey: 'conversionMethod', label: 'Conversion Method', type: 'badge' },
    'opt_type': { dataKey: 'type', label: 'Type', type: 'text' },
    'opt_device_id': { dataKey: 'deviceId', label: 'Device ID', type: 'code' },
    'opt_note': { dataKey: 'note', label: 'Note', type: 'text' },
    'opt_image_pixel_referrer': { dataKey: 'imagePixelReferrer', label: 'Image Pixel Referer', type: 'text' },
    'opt_click_referrer': { dataKey: 'clickReferrer', label: 'Click Referer', type: 'text' },
    'opt_hold_period_expire_time': { dataKey: 'holdPeriodExpireTime', label: 'Hold Period Expire Time', type: 'datetime' },
    'opt_is_view_through_attribution': { dataKey: 'isViewThroughAttribution', label: 'Is View Through Attribution', type: 'text' },
    'opt_attributed_via_privacy_postback': { dataKey: 'attributedViaPrivacyPostback', label: 'Attributed via Privacy Postback', type: 'text' },
    'opt_paid_at': { dataKey: 'paidAt', label: 'Paid At', type: 'datetime' },
    'opt_attributed_touch_type': { dataKey: 'attributedTouchType', label: 'Attributed Touch Type', type: 'text' },
    'opt_fbclid': { dataKey: 'fbclid', label: 'Fbclid', type: 'code' },
    'opt_conversion_geo': { dataKey: 'conversionGeo', label: 'Conversion GEO', type: 'text' },
    'opt_ad_placement': { dataKey: 'adPlacement', label: 'Ad Placement', type: 'text' },
    'opt_demographic': { dataKey: 'demographic', label: 'Demographic', type: 'text' },
    'opt_deeplink_url': { dataKey: 'deeplinkUrl', label: 'Deeplink URL', type: 'text' },
    'opt_postback_reason': { dataKey: 'postbackReason', label: 'Postback Reason', type: 'text' },
    'opt_gclid': { dataKey: 'gclid', label: 'Gclid', type: 'code' },
    'opt_dbtid': { dataKey: 'dbtid', label: 'dbtid', type: 'code' },
    'opt_created': { dataKey: 'created', label: 'Created', type: 'datetime' }
  };

  // Get visible columns based on selected report options
  getVisibleColumns(): Array<{ id: string, dataKey: string, label: string, type: string }> {
    const selectedOptions = this.getAllReportOptions().filter(opt => opt.selected);
    return selectedOptions
      .filter(opt => this.columnMapping[opt.id])
      .map(opt => ({
        id: opt.id,
        ...this.columnMapping[opt.id]
      }));
  }

  // Check if a specific column is visible
  isColumnVisible(optionId: string): boolean {
    const option = this.getAllReportOptions().find(opt => opt.id === optionId);
    return option ? option.selected : false;
  }

  // Get cell value for a given item and column
  getCellValue(item: any, dataKey: string): any {
    return item[dataKey] ?? '--';
  }
}
