import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import moment, { Moment } from 'moment';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from '../../../core/services/reports.service';
import { AdvertiserReportItem } from '../../../core/models/report.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-advertisers-report',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDaterangepickerMd, NgbPaginationModule],
  templateUrl: './advertisers-report.component.html',
  styleUrls: ['./advertisers-report.component.scss']
})
export class AdvertisersReportComponent implements OnInit {
  viewMode: 'table' | 'chart' = 'table';
  searchQuery = '';
  groupBySearch = '';
  metricsSearch = '';
  showFilterPanel = false;
  showNewReportModal = false;
  newReportName = '';
  showDownloadMenu = false;

  // Loading & Error States
  loading = false;
  error = '';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

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

  get startDate(): string {
    return this.selected.startDate ? this.selected.startDate.format('YYYY-MM-DD') : '';
  }

  get endDate(): string {
    return this.selected.endDate ? this.selected.endDate.format('YYYY-MM-DD') : '';
  }

  choosedDate(e: any): void {
    if (e.startDate && e.endDate) {
      this.selected = { startDate: e.startDate, endDate: e.endDate };
      this.currentPage = 1;
      this.loadAdvertiserReport();
    }
  }

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.loadAdvertiserReport();
  }

  loadAdvertiserReport(): void {
    this.loading = true;
    this.error = '';

    const params: any = {
      start_date: this.startDate,
      end_date: this.endDate,
      page: this.currentPage,
      limit: this.pageSize
    };

    this.reportsService.getAdvertiserReport(params)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.reportData = this.mapApiData(response.data);
            this.totalCount = response.pagination?.total || 0;
            this.currentPage = response.pagination?.page || 1;
            this.pageSize = response.pagination?.limit || 10;
          } else {
            this.error = response.error?.message || 'Failed to load advertiser report';
          }
        },
        error: (err) => {
          console.error('Error loading advertiser report:', err);
          this.error = 'An error occurred while loading the report.';
        }
      });
  }

  private mapApiData(apiData: AdvertiserReportItem[]): any[] {
    return apiData.map(item => ({
      advertiser: item.advertiser_name,
      advertiserId: item.advertiser_id,
      offers: item.offers,
      approvedConversions: item.conversions,
      revenue: item.revenue,

      // Defaults
      grossClicks: 0,
      payout: 0,
      profit: 0
    }));
  }

  getVisibleColumns() {
    const visibleGroups = this.groupByOptions.filter(opt => opt.checked);
    const visibleMetrics = this.metricsOptions.filter(opt => opt.checked);
    return [...visibleGroups, ...visibleMetrics];
  }

  getColumnType(key: string): 'currency' | 'percent' | 'number' | 'text' {
    if (this.currencyKeys.includes(key)) return 'currency';
    if (this.percentageKeys.includes(key)) return 'percent';
    if (this.metricsOptions.some(m => m.key === key)) return 'number';
    return 'text';
  }

  getTotal(key: string): number {
    return this.reportData.reduce((sum, item) => sum + (Number(item[key]) || 0), 0);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAdvertiserReport();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadAdvertiserReport();
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
    { key: 'publisher', label: 'Publisher', checked: false },
    { key: 'publisherId', label: 'Publisher ID', checked: false },
    { key: 'publisherLongId', label: 'Publisher Long ID', checked: false },
    { key: 'source', label: 'Source (Sub Publisher)', checked: false },
    { key: 'publisherManager', label: 'Publisher Manager', checked: false },
    { key: 'advertiser', label: 'Advertiser', checked: true },
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

  // Column Types Identification
  private currencyKeys = [
    'payout', 'revenue', 'profit', 'epc', 'saleAmount',
    'campaignPayout', 'campaignRevenue',
    'pendingPayout', 'pendingRevenue',
    'sampledPayout', 'sampledRevenue',
    'grossPayout', 'grossRevenue', 'grossProfit',
    'extendedPayout', 'extendedRevenue',
    'cancelledPayout', 'cancelledRevenue',
    'rejectedPayout', 'rejectedRevenue',
    'pendingSaleAmount', 'extendedSaleAmount',
    'cancelledSaleAmount', 'rejectedSaleAmount', 'sampledSaleAmount',
    'grossSaleAmount', 'netSaleAmount', 'netPayout', 'netRevenue', 'netProfit'
  ];

  private percentageKeys = ['conversionRate', 'ctr'];

  // Report Options / Metrics - Complete list from Trackier
  metricsOptions = [
    { key: 'offers', label: 'Offers', checked: true },
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

  // Report data
  reportData: any[] = [];

  savedReportsList = [{ value: '', label: '--' }, { value: 'report1', label: 'Weekly Advertiser Overview' }];



  get filteredGroupByOptions() {
    if (!this.groupBySearch) return this.groupByOptions;
    return this.groupByOptions.filter(opt => opt.label.toLowerCase().includes(this.groupBySearch.toLowerCase()));
  }

  get filteredMetricsOptions() {
    if (!this.metricsSearch) return this.metricsOptions;
    return this.metricsOptions.filter(opt => opt.label.toLowerCase().includes(this.metricsSearch.toLowerCase()));
  }

  get filteredData() {
    return this.reportData;
  }

  setViewMode(mode: 'table' | 'chart') { this.viewMode = mode; }
  toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
  closeFilterPanel() { this.showFilterPanel = false; }
  applyFilters() {
    console.log('Applying filters:', this.filters);
    this.currentPage = 1;
    this.loadAdvertiserReport();
    this.closeFilterPanel();
  }
  clearGroupBy() {
    this.groupByOptions = this.groupByOptions.map(opt => ({ ...opt, checked: false }));
  }

  selectAllGroupBy() {
    const filteredKeys = new Set(this.filteredGroupByOptions.map(opt => opt.key));
    this.groupByOptions = this.groupByOptions.map(opt => {
      if (filteredKeys.has(opt.key)) {
        return { ...opt, checked: true };
      }
      return opt;
    });
  }

  clearMetrics() {
    this.metricsOptions = this.metricsOptions.map(opt => ({ ...opt, checked: false }));
  }

  selectAllMetrics() {
    const filteredKeys = new Set(this.filteredMetricsOptions.map(opt => opt.key));
    this.metricsOptions = this.metricsOptions.map(opt => {
      if (filteredKeys.has(opt.key)) {
        return { ...opt, checked: true };
      }
      return opt;
    });
  }

  trackByKey(index: number, item: any): string {
    return item.key;
  }
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
  formatCurrency(value: number): string {
    if (value === undefined || value === null) return '₹ 0.00';
    return '₹ ' + Number(value).toFixed(2);
  }

  formatNumber(value: number): string {
    if (value === undefined || value === null) return '0';
    return Number(value).toLocaleString();
  }
}
