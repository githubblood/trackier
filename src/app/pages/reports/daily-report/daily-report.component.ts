import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-daily-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent {
  viewMode: 'table' | 'chart' = 'table';
  startDate = '2026-01-08';
  endDate = '2026-01-15';
  searchQuery = '';
  groupBySearch = '';
  metricsSearch = '';
  showFilterPanel = false;
  showNewReportModal = false;
  newReportName = '';
  showDownloadMenu = false;

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
    { key: 'publisher', label: 'Publisher', checked: false },
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
    { key: 'date', label: 'Date', checked: true },
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

  reportData = [
    { date: '2026-01-15', grossClicks: 2718, approvedConversions: 1, payout: 1.00, revenue: 1.00, profit: 0 },
    { date: '2026-01-14', grossClicks: 5234, approvedConversions: 17, payout: 17.00, revenue: 22.50, profit: 5.50 },
    { date: '2026-01-13', grossClicks: 4892, approvedConversions: 12, payout: 12.00, revenue: 15.80, profit: 3.80 },
    { date: '2026-01-12', grossClicks: 6120, approvedConversions: 24, payout: 24.00, revenue: 31.50, profit: 7.50 },
    { date: '2026-01-11', grossClicks: 5567, approvedConversions: 18, payout: 18.00, revenue: 23.70, profit: 5.70 },
    { date: '2026-01-10', grossClicks: 4890, approvedConversions: 15, payout: 15.00, revenue: 19.75, profit: 4.75 },
    { date: '2026-01-09', grossClicks: 5123, approvedConversions: 21, payout: 21.00, revenue: 27.65, profit: 6.65 },
    { date: '2026-01-08', grossClicks: 4756, approvedConversions: 14, payout: 14.00, revenue: 18.45, profit: 4.45 }
  ];

  savedReportsList = [{ value: '', label: '--' }, { value: 'report1', label: 'Weekly Daily Overview' }];

  get totals() {
    return {
      grossClicks: this.reportData.reduce((sum, item) => sum + item.grossClicks, 0),
      approvedConversions: this.reportData.reduce((sum, item) => sum + item.approvedConversions, 0),
      payout: this.reportData.reduce((sum, item) => sum + item.payout, 0),
      revenue: this.reportData.reduce((sum, item) => sum + item.revenue, 0),
      profit: this.reportData.reduce((sum, item) => sum + item.profit, 0)
    };
  }

  get filteredGroupByOptions() {
    if (!this.groupBySearch) return this.groupByOptions;
    return this.groupByOptions.filter(opt => opt.label.toLowerCase().includes(this.groupBySearch.toLowerCase()));
  }

  get filteredMetricsOptions() {
    if (!this.metricsSearch) return this.metricsOptions;
    return this.metricsOptions.filter(opt => opt.label.toLowerCase().includes(this.metricsSearch.toLowerCase()));
  }

  get filteredData() {
    if (!this.searchQuery) return this.reportData;
    return this.reportData.filter(item => item.date.includes(this.searchQuery));
  }

  setViewMode(mode: 'table' | 'chart') { this.viewMode = mode; }
  toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
  closeFilterPanel() { this.showFilterPanel = false; }
  applyFilters() { console.log('Applying filters:', this.filters); this.closeFilterPanel(); }
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
  formatCurrency(value: number): string { return '₹ ' + value.toFixed(2); }
  formatNumber(value: number): string { return value.toLocaleString(); }
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
