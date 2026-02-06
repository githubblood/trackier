import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import moment, { Moment } from 'moment';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from '../../../core/services/reports.service';
import { ConversionReportItem } from '../../../core/models/report.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-conversion-report',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxDaterangepickerMd, NgbPaginationModule],
  templateUrl: './conversion-report.component.html',
  styleUrls: ['./conversion-report.component.scss']
})
export class ConversionReportComponent implements OnInit {
  // Loading & Error States
  loading = false;
  error = '';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  searchQuery = '';
  showFilterPanel = false;
  showDownloadMenu = false;
  showNewReportModal = false;
  showFieldsModal = false;
  newReportName = '';
  selectAll = false;
  filterView: 'old' | 'new' = 'old';
  reportOptionSearch = '';

  // Date range picker
  selected: { startDate: Moment | null, endDate: Moment | null } = {
    startDate: moment().subtract(1, 'days'),
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
      this.loadConversionReport();
    }
  }

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.loadConversionReport();
  }

  loadConversionReport(): void {
    this.loading = true;
    this.error = '';

    const params: any = {
      start_date: this.startDate,
      end_date: this.endDate,
      page: this.currentPage,
      limit: this.pageSize
    };

    // Add filters if provided
    if (this.filters.campaign) {
      const campaignId = parseInt(this.filters.campaign, 10);
      if (!isNaN(campaignId)) {
        params.campaign_id = campaignId;
      }
    }

    if (this.filters.publisher) {
      const publisherId = parseInt(this.filters.publisher, 10);
      if (!isNaN(publisherId)) {
        params.publisher_id = publisherId;
      }
    }

    if (this.filters.status && this.filters.status !== 'all') {
      params.status = this.filters.status;
    }

    console.log('Loading conversion report with params:', params);

    this.reportsService.getConversionReport(params)
      .pipe(
        finalize(() => {
          console.log('API call completed, setting loading to false');
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Conversion report response:', response);
          if (response.success) {
            this.conversions = this.mapApiData(response.data);
            this.totalCount = response.pagination.total;
            this.currentPage = response.pagination.page;
            this.pageSize = response.pagination.limit;
          } else {
            this.error = response.error?.message || 'Failed to load conversion report';
          }
        },
        error: (err) => {
          console.error('Error loading conversion report:', err);
          this.error = 'An error occurred while loading the report. Please try again.';
        }
      });
  }

  private mapApiData(apiData: ConversionReportItem[]): any[] {
    return apiData.map(item => ({
      publisher: item.publisher_name,
      publisherId: item.publisher_id,
      campaign: item.campaign_name,
      campaignId: item.campaign_id,
      goalName: item.goal_name,
      goalId: item.goal_id,
      payout: item.payout,
      revenue: item.revenue,
      status: item.status,
      txnId: item.txn_id,
      clickId: item.click_id,
      created: new Date(item.created_at).toLocaleString(),
      conversionId: item.id,
      selected: false
    }));
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadConversionReport();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadConversionReport();
  }

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

  conversions: any[] = [];

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
