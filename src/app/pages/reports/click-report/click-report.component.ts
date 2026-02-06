import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import moment, { Moment } from 'moment';
import { ReportsService } from '../../../core/services/reports.service';
import { ClickReportItem } from '../../../core/models/report.model';
import { finalize } from 'rxjs/operators';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

interface ClickLog {
  // Campaign Info
  campaignName: string;
  campaignId: number;
  landingPage?: string;
  referrerCampaign?: string;
  payout?: number;
  revenue?: number;
  clickCurrency?: string;
  releaseOrderId?: string;
  smartLink?: string;

  // Publisher Info
  publisher?: string;
  publisherId?: string;
  publisherLongId?: string;
  source?: string; // Sub Publisher

  // Sub IDs
  p1?: string; p2?: string; p3?: string; p4?: string; p5?: string;
  p6?: string; p7?: string; p8?: string; p9?: string; p10?: string;
  p11?: string; p12?: string; p13?: string; p14?: string; p15?: string;

  // Other IDs
  gaid?: string;

  // Geo/Technical
  ipAddress: string;
  city: string;
  region: string;
  countryCode: string;
  carrier?: string;
  latitude?: string;
  longitude?: string;
  connectionType?: string;
  browser?: string;
  os?: string;
  device: string;
  deviceLanguage?: string;
  userAgent?: string;

  // Click Details
  clickId: string;
  referrer: string;
  created: string;
  isRejected?: string; // Yes/No
  isUnique?: string; // Yes/No
  note?: string;
  rejectedReason?: string;
  erid?: string;
  fbclid?: string;
  placement?: string;
  demographic?: string;
  deeplinkUrl?: string;
  gclid?: string;
  random?: string;
  wbraid?: string;
  gbraid?: string;
  finalUrl?: string;
}

@Component({
  selector: 'app-click-report',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxDaterangepickerMd, NgbPaginationModule],
  templateUrl: './click-report.component.html',
  styleUrls: ['./click-report.component.scss']
})
export class ClickReportComponent implements OnInit {
  // Loading & Error States
  loading = false;
  error = '';

  // Top Controls
  totalClicks = 0;
  currentPage = 1;
  rowsPerPage = 10;
  showFilterPanel = false;

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
      this.loadClickReport();
    }
  }

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.loadClickReport();
  }

  loadClickReport(): void {
    this.loading = true;
    this.error = '';

    const params: any = {
      start_date: this.startDate,
      end_date: this.endDate,
      page: this.currentPage,
      limit: this.rowsPerPage
    };

    // Add campaign filter if provided
    if (this.filters.campaign) {
      const campaignId = parseInt(this.filters.campaign, 10);
      if (!isNaN(campaignId)) {
        params.campaign_id = campaignId;
      }
    }

    // Add publisher filter if provided
    if (this.filters.publisher) {
      const publisherId = parseInt(this.filters.publisher, 10);
      if (!isNaN(publisherId)) {
        params.publisher_id = publisherId;
      }
    }

    console.log('Loading click report with params:', params);

    this.reportsService.getClickReport(params)
      .pipe(
        finalize(() => {
          console.log('API call completed, setting loading to false');
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Click report response:', response);
          if (response.success) {
            this.clickLogs = this.mapApiDataToClickLogs(response.data);
            this.totalClicks = response.pagination.total;
            this.currentPage = response.pagination.page;
          } else {
            this.error = response.error?.message || 'Failed to load click report';
          }
        },
        error: (err) => {
          console.error('Error loading click report:', err);
          this.error = 'An error occurred while loading the report. Please try again.';
        }
      });
  }

  private mapApiDataToClickLogs(apiData: ClickReportItem[]): ClickLog[] {
    return apiData.map(item => ({
      campaignName: item.campaign_name,
      campaignId: item.campaign_id,
      ipAddress: item.ip_address,
      city: '',
      region: '',
      countryCode: item.country,
      device: item.device,
      clickId: item.click_id,
      referrer: '',
      created: new Date(item.created_at).toLocaleString(),
      publisher: item.publisher_name,
      publisherId: item.publisher_id.toString(),
      p1: item.sub1 || undefined,
      p2: item.sub2 || undefined,
      source: item.source_id,
      userAgent: item.user_agent,
      gaid: ''
    }));
  }

  filters = {
    campaign: '', publisher: '', clickId: '', clickIp: '', region: '', city: '',
    source: '', subIdKey: '', subIdValue: '', isUnique: '', isRejected: '',
    startTime: '', endTime: ''
  };

  subIdOptions = Array.from({ length: 15 }, (_, i) => `P${i + 1}`);
  timeOptions = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')} HR`);

  // ALL DATA COLUMNS - 50+ Columns
  reportOptions = [
    // Default Visible as per User Request
    { key: 'publisher', label: 'Publisher', checked: true },
    { key: 'source', label: 'Source', checked: true },
    { key: 'p1', label: 'P1', checked: true },
    { key: 'gaid', label: 'GAID', checked: true },
    { key: 'campaign', label: 'Campaign', checked: true },
    { key: 'ipAddress', label: 'IP Address', checked: true },
    { key: 'city', label: 'City', checked: true },
    { key: 'region', label: 'Region', checked: true },
    { key: 'countryCode', label: 'Country (GEO)', checked: true },
    { key: 'device', label: 'Device', checked: true },
    { key: 'clickId', label: 'Click ID', checked: true },
    { key: 'referrer', label: 'Referrer', checked: true },
    { key: 'created', label: 'Created', checked: true },

    // Other columns (unchecked)
    { key: 'publisherId', label: 'Publisher Id', checked: false },
    { key: 'publisherLongId', label: 'Publisher Long Id', checked: false },
    // Sub IDs P2-P15
    ...Array.from({ length: 14 }, (_, i) => ({ key: `p${i + 2}`, label: `P${i + 2}`, checked: false })),

    // Campaign Info
    { key: 'landingPage', label: 'Landing Page', checked: false },
    { key: 'referrerCampaign', label: 'Referrer Campaign', checked: false },
    { key: 'payout', label: 'Payout', checked: false },
    { key: 'revenue', label: 'Revenue', checked: false },
    { key: 'clickCurrency', label: 'Click Currency', checked: false },
    { key: 'releaseOrderId', label: 'Release Order ID', checked: false },
    { key: 'smartLink', label: 'Smart Link', checked: false },

    // Geo/Technical
    { key: 'carrier', label: 'Carrier (ISP)', checked: false },
    { key: 'latitude', label: 'Latitude', checked: false },
    { key: 'longitude', label: 'Longitude', checked: false },
    { key: 'connectionType', label: 'Connection Type', checked: false },
    { key: 'browser', label: 'Browser', checked: false },
    { key: 'os', label: 'Operating System (OS)', checked: false },
    { key: 'deviceLanguage', label: 'Device Language', checked: false },
    { key: 'userAgent', label: 'User Agent', checked: false },

    // Click Details
    { key: 'isRejected', label: 'Is Rejected', checked: false },
    { key: 'isUnique', label: 'Is Unique', checked: false },
    { key: 'note', label: 'Note', checked: false },
    { key: 'rejectedReason', label: 'Rejected Reason', checked: false },
    { key: 'erid', label: 'ERID', checked: false },
    { key: 'fbclid', label: 'Fbclid', checked: false },
    { key: 'placement', label: 'Placement', checked: false },
    { key: 'demographic', label: 'Demographic', checked: false },
    { key: 'deeplinkUrl', label: 'Deeplink Url', checked: false },
    { key: 'gclid', label: 'Gclid', checked: false },
    { key: 'random', label: 'Random', checked: false },
    { key: 'wbraid', label: 'wbraid', checked: false },
    { key: 'gbraid', label: 'gbraid', checked: false },
    { key: 'finalUrl', label: 'Final URL', checked: false }
  ];
  metricsSearch = '';

  clickLogs: ClickLog[] = [];

  get filteredLogs(): ClickLog[] {
    return this.clickLogs;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadClickReport();
  }

  get filteredMetricsOptions() {
    if (!this.metricsSearch) return this.reportOptions;
    return this.reportOptions.filter(opt => opt.label.toLowerCase().includes(this.metricsSearch.toLowerCase()));
  }

  get visibleColumns() {
    return this.reportOptions.filter(opt => opt.checked);
  }

  toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
  closeFilterPanel() { this.showFilterPanel = false; }

  onRowsPerPageChange() {
    this.currentPage = 1; // Reset to first page
    this.loadClickReport();
  }

  applyFilters() {
    console.log('Filters:', this.filters);
    this.currentPage = 1;
    this.loadClickReport();
    this.closeFilterPanel();
  }
  copyToClipboard() { console.log('Copied'); }
  downloadCSV() { console.log('CSV'); }
  downloadExcel() { console.log('Excel'); }
  downloadPDF() { console.log('PDF'); }
  printTable() { window.print(); }

  getFlagEmoji(code: string): string {
    const flagMap: { [key: string]: string } = { 'CA': '🇨🇦', 'DE': '🇩🇪', 'NL': '🇳🇱', 'US': '🇺🇸', 'IN': '🇮🇳' };
    return flagMap[code] || '🏳️';
  }

  // Helper to safely get property value
  getValue(log: ClickLog, key: string): string {
    return (log as any)[key] || '--';
  }

  // Helper to safely get property (legacy)
  getPath(obj: any, key: string): any {
    if (key === 'campaign') return `(ID: ${obj.campaignId}) ${obj.campaignName}`;
    if (key === 'countryCode') return `<span class="me-1">${this.getFlagEmoji(obj.countryCode)}</span> ${obj.countryCode}`;
    if (key === 'publisher') return `<a href="#" class="text-decoration-none text-info">${obj[key] || '--'}</a>`;
    return obj[key] || '--';
  }
}

