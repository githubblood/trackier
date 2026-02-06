import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../core/services/reports.service';
import { CampaignReportItem } from '../../core/models/report.model';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDaterangepickerMd],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  // API State
  loading = false;
  error = '';
  currentPage = 1;
  totalItems = 0;

  // Applied filters state (updated only on Submit)
  appliedGroupByOptions: any[] = [];
  appliedMetricsOptions: any[] = [];

  // View toggle
  viewMode: 'table' | 'chart' = 'table';

  // Date range picker
  selected: { startDate: Moment | null, endDate: Moment | null } = {
    startDate: moment(),
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

  // Keep for backward compatibility
  get startDate(): string {
    return this.selected.startDate ? this.selected.startDate.format('YYYY-MM-DD') : '';
  }

  get endDate(): string {
    return this.selected.endDate ? this.selected.endDate.format('YYYY-MM-DD') : '';
  }

  // Dropdowns
  switchReport = 'campaign';
  savedReports = '';

  // Search
  searchQuery = '';
  groupBySearch = '';
  metricsSearch = '';

  // Filter panel
  showFilterPanel = false;

  // New Report Modal
  showNewReportModal = false;
  newReportName = '';

  // Main filters
  filters = {
    campaign: '',
    campaignSearchById: false,
    publisher: '',
    publisherSearchById: false,
    advertiser: '',
    advertiserSearchById: false,
    // Quick toggle filters
    campaignGeo: false,
    teamMember: false,
    advertiserTags: false,
    publisherTags: false,
    campaignAppId: false,
    category: false,
    smartLink: false
  };

  // Group By options (complete list from Trackier)
  groupByOptions = [
    { key: 'campaign', label: 'Campaign', checked: true },
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
    { key: 'date', label: 'Date', checked: false },
    { key: 'month', label: 'Month', checked: false },
    { key: 'week', label: 'Week', checked: false },
    { key: 'year', label: 'Year', checked: false },
    { key: 'category', label: 'Category', checked: false }
  ];

  // Report Options / Metrics (complete list from Trackier)
  metricsOptions = [
    // Clicks
    { key: 'uniqueClicks', label: 'Unique Clicks', checked: false },
    { key: 'rejectedClicks', label: 'Rejected Clicks', checked: false },
    { key: 'clicks', label: 'Clicks', checked: false },
    { key: 'grossClicks', label: 'Gross Clicks', checked: true },
    // Conversions
    { key: 'approvedConversions', label: 'Approved Conversions', checked: true },
    { key: 'pendingConversions', label: 'Pending Conversions', checked: false },
    { key: 'cancelledConversions', label: 'Cancelled Conversions', checked: false },
    { key: 'rejectedConversions', label: 'Rejected Conversions', checked: false },
    { key: 'extendedConversions', label: 'Extended Conversions', checked: false },
    { key: 'sampledConversions', label: 'Sampled Conversions', checked: false },
    { key: 'grossConversions', label: 'Gross Conversions', checked: false },
    { key: 'conversionRate', label: 'Conversion Rate (CR)', checked: false },
    // Financial
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
    // EPC, CTR
    { key: 'epc', label: 'Earning Per Click (EPC)', checked: false },
    { key: 'ctr', label: 'Click Through Rate (CTR)', checked: false },
    // Sale Amount
    { key: 'saleAmount', label: 'Sale Amount', checked: false },
    { key: 'pendingSaleAmount', label: 'Pending Sale Amount', checked: false },
    { key: 'extendedSaleAmount', label: 'Extended Sale Amount', checked: false },
    { key: 'cancelledSaleAmount', label: 'Cancelled Sale Amount', checked: false },
    { key: 'rejectedSaleAmount', label: 'Rejected Sale Amount', checked: false },
    { key: 'sampledSaleAmount', label: 'Sampled Sale Amount', checked: false },
    { key: 'grossSaleAmount', label: 'Gross Sale Amount', checked: false },
    // Net values
    { key: 'netConversions', label: 'Net Conversions', checked: false },
    { key: 'netSaleAmount', label: 'Net Sale Amount', checked: false },
    { key: 'netPayout', label: 'Net Payout', checked: false },
    { key: 'netRevenue', label: 'Net Revenue', checked: false },
    { key: 'netProfit', label: 'Net Profit', checked: false }
  ];

  // Other options
  otherOptions = {
    onlyShowRowsHavingConversions: false,
    onlyShowRowsHavingRevenue: false,
    showManagerId: false,
    showInProfileCurrency: false,
    hideDecimalValues: false
  };

  // Conditions
  conditions: any[] = [];

  // Download menu
  showDownloadMenu = false;

  // Report data
  reportData = [
    { campaign: 'Boho- CA- Dec\'25', grossClicks: 0, approvedConversions: 1, payout: 1, revenue: 1, profit: 0 },
    { campaign: 'Myrista - Loop', grossClicks: 2684, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Dragonia- CA- Jan\'26', grossClicks: 2, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'BloodySlots GB', grossClicks: 0, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Stox Razor', grossClicks: 14, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Oceanpin- DE- Nov\'25', grossClicks: 1, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Betsanc1ty- NL- Oct\'25', grossClicks: 1, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Spinmania- CA- Dec\'25', grossClicks: 1, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Bitsslot- NL- Nov\'25', grossClicks: 2, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Golden Reels- NZ- Dec\'25', grossClicks: 2, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Vipersain- AU- Dec\'25', grossClicks: 1, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Tikitaka- NL- Nov\'25', grossClicks: 2, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Loki Casino- UK- Dec\'25', grossClicks: 1, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Cashpot- CA', grossClicks: 1, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Rollstabo- CA- Jan\'26', grossClicks: 1, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Winner Casino CA', grossClicks: 1, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Velobet- AU- Nov\'25', grossClicks: 2, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 },
    { campaign: 'Spingranny- AU- Dec\'25', grossClicks: 1, approvedConversions: 0, payout: 0, revenue: 0, profit: 0 }
  ];

  // Report type options
  reportTypes = [
    { value: 'campaign', label: 'Campaign Report' },
    { value: 'publisher', label: 'Publisher Report' },
    { value: 'advertiser', label: 'Advertiser Report' },
    { value: 'daily', label: 'Daily Report' },
    { value: 'goals', label: 'Goals Report' }
  ];

  // Saved reports
  savedReportsList = [
    { value: '', label: '--' },
    { value: 'report1', label: 'Weekly Overview' },
    { value: 'report2', label: 'Monthly Summary' }
  ];

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    // Initialize applied options with currently checked options
    this.appliedGroupByOptions = this.groupByOptions.filter(opt => opt.checked);
    this.appliedMetricsOptions = this.metricsOptions.filter(opt => opt.checked);

    this.loadCampaignReport();
  }

  // Date range picker change handler
  choosedDate(e: any): void {
    if (e.startDate && e.endDate) {
      this.selected = {
        startDate: e.startDate,
        endDate: e.endDate
      };
      // Auto-load report when date range is selected
      this.loadCampaignReport();
    }
  }

  submitDateRange(): void {
    // Validate date range
    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    if (new Date(this.startDate) > new Date(this.endDate)) {
      alert('Start date cannot be after end date');
      return;
    }

    // Load campaign report with selected date range
    this.loadCampaignReport();
  }

  loadCampaignReport(): void {
    this.loading = true;
    this.error = '';

    const params: any = {
      start_date: this.startDate,
      end_date: this.endDate,
      page: this.currentPage,
      limit: 10
    };

    // Add campaign_id if search by ID is enabled and value is a number
    if (this.filters.campaign && this.filters.campaignSearchById) {
      const campaignId = parseInt(this.filters.campaign, 10);
      if (!isNaN(campaignId)) {
        params.campaign_id = campaignId;
      }
    }

    this.reportsService.getCampaignReport(params).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.reportData = response.data.map(item => this.mapApiToReportData(item));
          this.totalItems = response.pagination?.total || this.reportData.length;
        } else {
          this.error = response.error?.message || 'Failed to load campaign report';
          console.error('Campaign report error:', response.error);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading campaign report:', err);
        this.error = 'Failed to load campaign report. Please try again.';
        this.loading = false;
      }
    });
  }

  mapApiToReportData(item: CampaignReportItem): any {
    return {
      // Group By fields
      campaign: item.campaign_name,
      campaignId: item.campaign_id,
      date: item.date,

      // Metrics from API
      clicks: item.clicks,
      uniqueClicks: item.unique_clicks,
      grossClicks: item.clicks,
      approvedConversions: item.conversions,
      payout: item.payout,
      revenue: item.revenue,
      profit: item.revenue - item.payout,
      cr: item.cr,
      epc: item.epc,
      conversionRate: item.cr,

      // Placeholder values for other fields (can be extended based on API)
      pendingConversions: 0,
      cancelledConversions: 0,
      rejectedConversions: 0,
      rejectedClicks: 0,
      impressions: 0
    };
  }

  // Selected group by options (checked items)
  get selectedGroupByOptions() {
    return this.groupByOptions.filter(opt => opt.checked);
  }

  // Selected metrics options (checked items)
  get selectedMetricsOptions() {
    return this.metricsOptions.filter(opt => opt.checked);
  }

  // Totals
  get totals() {
    const total: any = {};

    // Calculate totals for all possible metrics
    const numericMetrics = [
      'grossClicks', 'uniqueClicks', 'rejectedClicks', 'clicks',
      'approvedConversions', 'pendingConversions', 'cancelledConversions',
      'rejectedConversions', 'extendedConversions', 'sampledConversions',
      'grossConversions', 'impressions',
      'payout', 'revenue', 'profit',
      'pendingPayout', 'pendingRevenue', 'sampledPayout', 'sampledRevenue',
      'grossPayout', 'grossRevenue', 'grossProfit',
      'extendedPayout', 'extendedRevenue', 'cancelledPayout', 'cancelledRevenue',
      'rejectedPayout', 'rejectedRevenue',
      'saleAmount', 'pendingSaleAmount', 'extendedSaleAmount',
      'cancelledSaleAmount', 'rejectedSaleAmount', 'sampledSaleAmount',
      'grossSaleAmount', 'netConversions', 'netSaleAmount',
      'netPayout', 'netRevenue', 'netProfit', 'campaignPayout', 'campaignRevenue'
    ];

    numericMetrics.forEach(metric => {
      total[metric] = this.reportData.reduce((sum: number, item: any) => {
        return sum + (item[metric] || 0);
      }, 0);
    });

    // Calculate averages for rate metrics
    if (this.reportData.length > 0) {
      total.conversionRate = (total.approvedConversions / total.grossClicks * 100) || 0;
      total.cr = total.conversionRate;
      total.epc = (total.payout / total.grossClicks) || 0;
      total.ctr = (total.clicks / total.impressions * 100) || 0;
    }

    return total;
  }

  // Filtered group by options
  get filteredGroupByOptions() {
    if (!this.groupBySearch) return this.groupByOptions;
    return this.groupByOptions.filter(opt =>
      opt.label.toLowerCase().includes(this.groupBySearch.toLowerCase())
    );
  }

  // Filtered metrics options
  get filteredMetricsOptions() {
    if (!this.metricsSearch) return this.metricsOptions;
    return this.metricsOptions.filter(opt =>
      opt.label.toLowerCase().includes(this.metricsSearch.toLowerCase())
    );
  }

  // View toggle
  setViewMode(mode: 'table' | 'chart') {
    this.viewMode = mode;
  }

  // Filter panel
  toggleFilterPanel() {
    this.showFilterPanel = !this.showFilterPanel;
  }

  closeFilterPanel() {
    this.showFilterPanel = false;
  }

  applyFilters() {
    console.log('Applying filters:', {
      filters: this.filters,
      groupBy: this.groupByOptions.filter(o => o.checked),
      metrics: this.metricsOptions.filter(o => o.checked),
      otherOptions: this.otherOptions,
      conditions: this.conditions
    });

    // Update applied options with currently selected options
    this.appliedGroupByOptions = this.groupByOptions.filter(opt => opt.checked);
    this.appliedMetricsOptions = this.metricsOptions.filter(opt => opt.checked);

    // Reload data with new filter settings
    this.loadCampaignReport();

    this.closeFilterPanel();
  }

  // Clear all group by
  clearGroupBy() {
    this.groupByOptions.forEach(opt => opt.checked = false);
  }

  // Select all group by
  selectAllGroupBy() {
    this.filteredGroupByOptions.forEach(opt => opt.checked = true);
  }

  // Clear all metrics
  clearMetrics() {
    this.metricsOptions.forEach(opt => opt.checked = false);
  }

  // Select all metrics
  selectAllMetrics() {
    this.filteredMetricsOptions.forEach(opt => opt.checked = true);
  }

  // Add condition
  addCondition() {
    this.conditions.push({
      field: '',
      operator: 'equals',
      value: ''
    });
  }

  // Remove condition
  removeCondition(index: number) {
    this.conditions.splice(index, 1);
  }

  // Download menu
  toggleDownloadMenu() {
    this.showDownloadMenu = !this.showDownloadMenu;
  }

  downloadCSV() {
    const headers = 'Campaign,Gross Clicks,Approved Conversions,Payout,Revenue,Profit\n';
    const csv = headers + this.reportData.map(item =>
      `"${item.campaign}",${item.grossClicks},${item.approvedConversions},${item.payout},${item.revenue},${item.profit}`
    ).join('\n');

    this.downloadFile(csv, 'campaign_report.csv', 'text/csv');
    this.showDownloadMenu = false;
  }

  downloadExcel() {
    const headers = 'Campaign\tGross Clicks\tApproved Conversions\tPayout\tRevenue\tProfit\n';
    const excel = headers + this.reportData.map(item =>
      `${item.campaign}\t${item.grossClicks}\t${item.approvedConversions}\t${item.payout}\t${item.revenue}\t${item.profit}`
    ).join('\n');

    this.downloadFile(excel, 'campaign_report.xls', 'application/vnd.ms-excel');
    this.showDownloadMenu = false;
  }

  downloadPDF() {
    alert('PDF export - In production, use a library like jsPDF');
    this.showDownloadMenu = false;
  }

  downloadFile(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // New report modal
  createNewReport() {
    this.newReportName = '';
    this.showNewReportModal = true;
  }

  closeNewReportModal() {
    this.showNewReportModal = false;
    this.newReportName = '';
  }

  confirmNewReport() {
    if (this.newReportName.trim()) {
      console.log('Creating new report:', this.newReportName);
      // Add the new report to saved reports list
      this.savedReportsList.push({
        value: 'report_' + Date.now(),
        label: this.newReportName
      });
      alert('Report "' + this.newReportName + '" created successfully!');
      this.closeNewReportModal();
    } else {
      alert('Please enter a report name');
    }
  }

  // Format currency
  formatCurrency(value: number): string {
    return '₹ ' + value.toFixed(2);
  }

  // Format number
  formatNumber(value: number): string {
    return value.toLocaleString();
  }

  // Get column value for Group By columns
  getColumnValue(item: any, key: string): string {
    // Map the key to actual data field
    const value = item[key];

    if (value === undefined || value === null) {
      return '-';
    }

    // Special handling for different column types
    if (key === 'date') {
      return new Date(value).toLocaleDateString();
    }

    return value.toString();
  }

  // Format metric value for Report Options columns
  formatMetricValue(item: any, key: string): string {
    const value = item[key];

    if (value === undefined || value === null) {
      return '0';
    }

    // Currency metrics
    const currencyMetrics = [
      'payout', 'revenue', 'profit', 'campaignPayout', 'campaignRevenue',
      'pendingPayout', 'pendingRevenue', 'sampledPayout', 'sampledRevenue',
      'grossPayout', 'grossRevenue', 'grossProfit',
      'extendedPayout', 'extendedRevenue', 'cancelledPayout', 'cancelledRevenue',
      'rejectedPayout', 'rejectedRevenue',
      'saleAmount', 'pendingSaleAmount', 'extendedSaleAmount',
      'cancelledSaleAmount', 'rejectedSaleAmount', 'sampledSaleAmount',
      'grossSaleAmount', 'netSaleAmount', 'netPayout', 'netRevenue', 'netProfit'
    ];

    // Percentage metrics
    const percentageMetrics = ['conversionRate', 'cr', 'ctr'];

    if (currencyMetrics.includes(key)) {
      return this.formatCurrency(value);
    } else if (percentageMetrics.includes(key)) {
      return value.toFixed(2) + '%';
    } else if (key === 'epc') {
      return this.formatCurrency(value);
    } else {
      return this.formatNumber(value);
    }
  }

  // Filter data by search
  get filteredData() {
    if (!this.searchQuery) return this.reportData;
    return this.reportData.filter(item =>
      item.campaign.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
