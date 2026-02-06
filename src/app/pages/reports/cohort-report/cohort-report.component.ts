import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import moment, { Moment } from 'moment';

interface CohortMetric {
  field: string;
  values: { [key: string]: string | number };
}

interface CohortPublisher {
  publisher: string;
  publisherId: number;
  metrics: CohortMetric[];
}

@Component({
  selector: 'app-cohort-report',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDaterangepickerMd],
  templateUrl: './cohort-report.component.html',
  styleUrls: ['./cohort-report.component.scss']
})
export class CohortReportComponent {
  viewMode: 'table' | 'chart' = 'table';
  searchQuery = '';
  groupBySearch = '';
  metricsSearch = '';
  showFilterPanel = false;
  showNewReportModal = false;
  newReportName = '';
  showDownloadMenu = false;

  // Date columns for cohort view
  dateColumns: string[] = [];

  // Date range picker
  selected: { startDate: Moment | null, endDate: Moment | null } = {
    startDate: moment().subtract(6, 'days'),
    endDate: moment()
  };

  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };

  locale: any = {
    format: 'YYYY-MM-DD',
    displayFormat: 'YYYY-MM-DD',
    separator: ' - ',
    cancelLabel: 'Cancel',
    applyLabel: 'Submit',
    customRangeLabel: 'Custom'
  };

  get startDate(): string {
    return this.selected.startDate ? this.selected.startDate.format('YYYY-MM-DD') : '';
  }

  get endDate(): string {
    return this.selected.endDate ? this.selected.endDate.format('YYYY-MM-DD') : '';
  }

  choosedDate(e: any): void {
    if (e.startDate && e.endDate) {
      this.selected = { startDate: e.startDate, endDate: e.endDate };
      this.generateDateColumns();
    }
  }

  // Main filters - Same as Campaign Report
  filters = {
    campaign: '',
    campaignSearchById: false,
    publisher: '',
    publisherSearchById: false,
    advertiser: '',
    advertiserSearchById: false,
    campaignGeo: false,
    teamMember: false,
    advertiserTags: false,
    publisherTags: false,
    campaignAppId: false,
    category: false,
    smartLink: false
  };

  // Group By options - Complete list from Trackier
  groupByOptions = [
    { key: 'campaign', label: 'Campaign', checked: false },
    { key: 'campaignId', label: 'Campaign ID', checked: false },
    { key: 'campaignLongId', label: 'Campaign Long ID', checked: false },
    { key: 'campaignStatus', label: 'Campaign Status', checked: false },
    { key: 'campaignGeo', label: 'Campaign GEO', checked: false },
    { key: 'campaignAppName', label: 'Campaign App Name', checked: false },
    { key: 'objective', label: 'Objective', checked: false },
    { key: 'publisher', label: 'Publisher', checked: true },
    { key: 'publisherId', label: 'Publisher ID', checked: false },
    { key: 'publisherLongId', label: 'Publisher Long ID', checked: false },
    { key: 'source', label: 'Source (Sub Publisher)', checked: false },
    { key: 'publisherManager', label: 'Publisher Manager', checked: false },
    { key: 'advertiser', label: 'Advertiser', checked: false },
    { key: 'advertiserId', label: 'Advertiser ID', checked: false },
    { key: 'currency', label: 'Currency', checked: false },
    { key: 'advertiserManager', label: 'Advertiser Manager', checked: false },
    { key: 'goalName', label: 'Goal Name', checked: false },
    { key: 'goalId', label: 'Goal ID', checked: false },
    { key: 'smartLink', label: 'Smart Link', checked: false },
    { key: 'referrerCampaign', label: 'Referrer Campaign', checked: false },
    { key: 'referrerCampaignId', label: 'Referrer Campaign ID', checked: false },
    { key: 'releaseOrderId', label: 'Release Order ID', checked: false },
    { key: 'landingPage', label: 'Landing Page', checked: false },
    { key: 'landingPageId', label: 'Landing Page ID', checked: false },
    { key: 'device', label: 'Device', checked: false },
    { key: 'os', label: 'Operating System', checked: false },
    { key: 'country', label: 'Country (GEO)', checked: false },
    { key: 'date', label: 'Date', checked: false },
    { key: 'month', label: 'Month', checked: false },
    { key: 'week', label: 'Week', checked: false },
    { key: 'year', label: 'Year', checked: false },
    { key: 'category', label: 'Category', checked: false }
  ];

  // Report Options / Metrics - Complete list from Trackier
  metricsOptions = [
    { key: 'uniqueClicks', label: 'Unique Clicks', checked: false },
    { key: 'rejectedClicks', label: 'Rejected Clicks', checked: false },
    { key: 'clicks', label: 'Clicks', checked: false },
    { key: 'grossClicks', label: 'Gross Clicks', checked: true },
    { key: 'approvedConversions', label: 'Approved Conversions', checked: true },
    { key: 'pendingConversions', label: 'Pending Conversions', checked: false },
    { key: 'cancelledConversions', label: 'Cancelled Conversions', checked: false },
    { key: 'rejectedConversions', label: 'Rejected Conversions', checked: false },
    { key: 'extendedConversions', label: 'Extended Conversions', checked: false },
    { key: 'sampledConversions', label: 'Sampled Conversions', checked: false },
    { key: 'grossConversions', label: 'Gross Conversions', checked: false },
    { key: 'conversionRate', label: 'Conversion Rate (CR)', checked: false },
    { key: 'impressions', label: 'Impressions', checked: false },
    { key: 'campaignPayout', label: 'Campaign Payout', checked: false },
    { key: 'campaignRevenue', label: 'Campaign Revenue', checked: false },
    { key: 'payout', label: 'Payout', checked: true },
    { key: 'revenue', label: 'Revenue', checked: true },
    { key: 'profit', label: 'Profit', checked: true },
    { key: 'pendingPayout', label: 'Pending Payout', checked: false },
    { key: 'pendingRevenue', label: 'Pending Revenue', checked: false },
    { key: 'sampledPayout', label: 'Sampled Payout', checked: false },
    { key: 'sampledRevenue', label: 'Sampled Revenue', checked: false },
    { key: 'grossPayout', label: 'Gross Payout', checked: false },
    { key: 'grossRevenue', label: 'Gross Revenue', checked: false },
    { key: 'grossProfit', label: 'Gross Profit', checked: false },
    { key: 'extendedPayout', label: 'Extended Payout', checked: false },
    { key: 'extendedRevenue', label: 'Extended Revenue', checked: false },
    { key: 'cancelledPayout', label: 'Cancelled Payout', checked: false },
    { key: 'cancelledRevenue', label: 'Cancelled Revenue', checked: false },
    { key: 'rejectedPayout', label: 'Rejected Payout', checked: false },
    { key: 'rejectedRevenue', label: 'Rejected Revenue', checked: false },
    { key: 'epc', label: 'Earning Per Click (EPC)', checked: false },
    { key: 'ctr', label: 'Click Through Rate (CTR)', checked: false },
    { key: 'saleAmount', label: 'Sale Amount', checked: false },
    { key: 'pendingSaleAmount', label: 'Pending Sale Amount', checked: false },
    { key: 'extendedSaleAmount', label: 'Extended Sale Amount', checked: false },
    { key: 'cancelledSaleAmount', label: 'Cancelled Sale Amount', checked: false },
    { key: 'rejectedSaleAmount', label: 'Rejected Sale Amount', checked: false },
    { key: 'sampledSaleAmount', label: 'Sampled Sale Amount', checked: false },
    { key: 'grossSaleAmount', label: 'Gross Sale Amount', checked: false },
    { key: 'netConversions', label: 'Net Conversions', checked: false },
    { key: 'netSaleAmount', label: 'Net Sale Amount', checked: false },
    { key: 'netPayout', label: 'Net Payout', checked: false },
    { key: 'netRevenue', label: 'Net Revenue', checked: false },
    { key: 'netProfit', label: 'Net Profit', checked: false }
  ];

  otherOptions = {
    onlyShowRowsHavingConversions: false,
    onlyShowRowsHavingRevenue: false,
    showManagerId: false,
    showInProfileCurrency: false,
    hideDecimalValues: false
  };

  conditions: any[] = [];

  // Cohort data structure - grouped by publisher with metrics as rows
  cohortData: CohortPublisher[] = [
    {
      publisher: '360 Pub Gaming dec 25',
      publisherId: 303,
      metrics: [
        { field: 'Gross Clicks', values: { '2026-01-08': 2, '2026-01-09': 1, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } },
        { field: 'Approved Conversions', values: { '2026-01-08': 0, '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } },
        { field: 'Payout', values: { '2026-01-08': '₹ 0', '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } },
        { field: 'Revenue', values: { '2026-01-08': '₹ 0', '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } },
        { field: 'Profit', values: { '2026-01-08': '₹ 0', '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } }
      ]
    },
    {
      publisher: 'GF Gaming Pub Dec\'2',
      publisherId: 405,
      metrics: [
        { field: 'Gross Clicks', values: { '2026-01-08': 3, '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } },
        { field: 'Approved Conversions', values: { '2026-01-08': 0, '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } },
        { field: 'Payout', values: { '2026-01-08': '₹ 0', '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } },
        { field: 'Revenue', values: { '2026-01-08': '₹ 0', '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } },
        { field: 'Profit', values: { '2026-01-08': '₹ 0', '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } }
      ]
    },
    {
      publisher: 'XA David Publisher D ec\'25',
      publisherId: 424,
      metrics: [
        { field: 'Gross Clicks', values: { '2026-01-08': 3, '2026-01-09': 220, '2026-01-10': 0, '2026-01-11': 1, '2026-01-12': 0, '2026-01-13': 1, '2026-01-14': 1 } },
        { field: 'Approved Conversions', values: { '2026-01-08': 0, '2026-01-09': 0, '2026-01-10': 0, '2026-01-11': 0, '2026-01-12': 0, '2026-01-13': 0, '2026-01-14': 0 } },
        { field: 'Payout', values: { '2026-01-08': '₹ 0', '2026-01-09': '₹ 0', '2026-01-10': 0, '2026-01-11': '₹ 0', '2026-01-12': 0, '2026-01-13': '₹ 0', '2026-01-14': '₹ 0' } },
        { field: 'Revenue', values: { '2026-01-08': '₹ 0', '2026-01-09': '₹ 0', '2026-01-10': 0, '2026-01-11': '₹ 0', '2026-01-12': 0, '2026-01-13': '₹ 0', '2026-01-14': '₹ 0' } },
        { field: 'Profit', values: { '2026-01-08': '₹ 0', '2026-01-09': '₹ 0', '2026-01-10': 0, '2026-01-11': '₹ 0', '2026-01-12': 0, '2026-01-13': '₹ 0', '2026-01-14': '₹ 0' } }
      ]
    }
  ];

  savedReportsList = [{ value: '', label: '--' }, { value: 'report1', label: 'Weekly Cohort Overview' }];

  constructor() {
    this.generateDateColumns();
  }

  generateDateColumns() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    this.dateColumns = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      this.dateColumns.push(d.toISOString().split('T')[0]);
    }
  }

  get filteredGroupByOptions() {
    if (!this.groupBySearch) return this.groupByOptions;
    return this.groupByOptions.filter(opt => opt.label.toLowerCase().includes(this.groupBySearch.toLowerCase()));
  }

  get filteredMetricsOptions() {
    if (!this.metricsSearch) return this.metricsOptions;
    return this.metricsOptions.filter(opt => opt.label.toLowerCase().includes(this.metricsSearch.toLowerCase()));
  }

  get filteredData(): CohortPublisher[] {
    if (!this.searchQuery) return this.cohortData;
    return this.cohortData.filter(item => item.publisher.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  formatDateHeader(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  setViewMode(mode: 'table' | 'chart') { this.viewMode = mode; }
  toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
  closeFilterPanel() { this.showFilterPanel = false; }
  applyFilters() {
    console.log('Applying filters:', this.filters);
    this.generateDateColumns();
    this.closeFilterPanel();
  }
  clearGroupBy() { this.groupByOptions.forEach(opt => opt.checked = false); }
  selectAllGroupBy() { this.filteredGroupByOptions.forEach(opt => opt.checked = true); }
  clearMetrics() { this.metricsOptions.forEach(opt => opt.checked = false); }
  selectAllMetrics() { this.filteredMetricsOptions.forEach(opt => opt.checked = true); }
  toggleDownloadMenu() { this.showDownloadMenu = !this.showDownloadMenu; }
  downloadCSV() { console.log('Downloading CSV'); this.showDownloadMenu = false; }
  downloadExcel() { console.log('Downloading Excel'); this.showDownloadMenu = false; }
  downloadPDF() { console.log('Downloading PDF'); this.showDownloadMenu = false; }
  createNewReport() { this.newReportName = ''; this.showNewReportModal = true; }
  closeNewReportModal() { this.showNewReportModal = false; this.newReportName = ''; }
  addCondition() { this.conditions.push({ field: '', operator: 'equals', value: '' }); }
  removeCondition(index: number) { this.conditions.splice(index, 1); }
  confirmNewReport() {
    if (this.newReportName.trim()) {
      this.savedReportsList.push({ value: 'report_' + Date.now(), label: this.newReportName });
      alert('Report "' + this.newReportName + '" created successfully!');
      this.closeNewReportModal();
    } else { alert('Please enter a report name'); }
  }
}
