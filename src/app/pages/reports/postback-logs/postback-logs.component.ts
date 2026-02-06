import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import moment, { Moment } from 'moment';

interface StatusCodeOption {
  value: string;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-postback-logs',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDaterangepickerMd],
  templateUrl: './postback-logs.component.html',
  styleUrls: ['./postback-logs.component.scss']
})
export class PostbackLogsComponent {
  searchQuery = '';
  showFilterPanel = false;
  showDownloadMenu = false;

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
    }
  }

  // Filter values
  filters = {
    campaign: '',
    publisher: '',
    postbackId: '',
    clickId: '',
    conversionId: ''
  };

  // Server Status Code multi-select options
  statusCodeOptions: StatusCodeOption[] = [
    { value: '2xx', label: 'Successful 2XX', selected: false },
    { value: '3xx', label: 'Redirection 3XX', selected: false },
    { value: '4xx', label: 'Client Error 4XX', selected: false },
    { value: '500', label: 'Server Error 500', selected: false },
    { value: '502', label: 'Server Error 502', selected: false }
  ];

  // Campaign options for dropdown
  campaignOptions = [
    { id: 12345, name: 'Spingranny- CA- Jan\'26' },
    { id: 12346, name: 'Winner Casino UK' },
    { id: 12347, name: 'Bet O Bet NL' },
    { id: 12348, name: 'Play Ojo AU' },
    { id: 12349, name: 'Monster Casino DE' }
  ];

  // Publisher options for dropdown
  publisherOptions = [
    { id: 'P001', name: 'ATUL Kumar' },
    { id: 'P002', name: 'IG Link' },
    { id: 'P003', name: 'Shivai Networks' },
    { id: 'P004', name: 'Digital Media Pro' },
    { id: 'P005', name: 'AdNetwork Plus' }
  ];

  // Selected campaigns and publishers
  selectedCampaigns: number[] = [];
  selectedPublishers: string[] = [];

  postbackLogs = [
    { postbackId: 'PB001', campaign: 'Spingranny- CA- Jan\'26', campaignId: 12345, publisher: 'ATUL Kumar', publisherId: 'P001', clickId: 'CLK001', conversionId: 'CONV001', url: 'https://postback.example.com/track?conv=123', statusCode: 200, response: 'OK', created: '2026-01-14 10:23:45' },
    { postbackId: 'PB002', campaign: 'Winner Casino UK', campaignId: 12346, publisher: 'IG Link', publisherId: 'P002', clickId: 'CLK002', conversionId: 'CONV002', url: 'https://postback.example.com/track?conv=456', statusCode: 200, response: 'Success', created: '2026-01-14 10:22:30' },
    { postbackId: 'PB003', campaign: 'Bet O Bet NL', campaignId: 12347, publisher: 'Shivai Networks', publisherId: 'P003', clickId: 'CLK003', conversionId: 'CONV003', url: 'https://postback.example.com/track?conv=789', statusCode: 500, response: 'Server Error', created: '2026-01-14 10:21:15' },
    { postbackId: 'PB004', campaign: 'Play Ojo AU', campaignId: 12348, publisher: 'Digital Media Pro', publisherId: 'P004', clickId: 'CLK004', conversionId: 'CONV004', url: 'https://postback.example.com/track?conv=321', statusCode: 200, response: 'OK', created: '2026-01-14 10:20:00' },
    { postbackId: 'PB005', campaign: 'Monster Casino DE', campaignId: 12349, publisher: 'AdNetwork Plus', publisherId: 'P005', clickId: 'CLK005', conversionId: 'CONV005', url: 'https://postback.example.com/track?conv=654', statusCode: 404, response: 'Not Found', created: '2026-01-14 10:19:45' },
    { postbackId: 'PB006', campaign: 'Winner Casino UK', campaignId: 12346, publisher: 'ATUL Kumar', publisherId: 'P001', clickId: 'CLK006', conversionId: 'CONV006', url: 'https://postback.example.com/track?conv=111', statusCode: 302, response: 'Redirect', created: '2026-01-14 10:18:30' },
    { postbackId: 'PB007', campaign: 'Play Ojo AU', campaignId: 12348, publisher: 'Shivai Networks', publisherId: 'P003', clickId: 'CLK007', conversionId: 'CONV007', url: 'https://postback.example.com/track?conv=222', statusCode: 502, response: 'Bad Gateway', created: '2026-01-14 10:17:15' }
  ];

  get filteredData() {
    return this.postbackLogs.filter(item => {
      const matchesSearch = !this.searchQuery ||
        item.campaign.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.publisher.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Check campaign filter
      const matchesCampaign = this.selectedCampaigns.length === 0 ||
        this.selectedCampaigns.includes(item.campaignId);

      // Check publisher filter
      const matchesPublisher = this.selectedPublishers.length === 0 ||
        this.selectedPublishers.includes(item.publisherId);

      // Check status code filter
      const selectedStatuses = this.statusCodeOptions.filter(opt => opt.selected);
      let matchesStatus = selectedStatuses.length === 0;
      if (!matchesStatus) {
        matchesStatus = selectedStatuses.some(status => {
          if (status.value === '2xx') return item.statusCode >= 200 && item.statusCode < 300;
          if (status.value === '3xx') return item.statusCode >= 300 && item.statusCode < 400;
          if (status.value === '4xx') return item.statusCode >= 400 && item.statusCode < 500;
          if (status.value === '500') return item.statusCode === 500;
          if (status.value === '502') return item.statusCode === 502;
          return false;
        });
      }

      // Check text filters
      const matchesPostbackId = !this.filters.postbackId ||
        item.postbackId.toLowerCase().includes(this.filters.postbackId.toLowerCase());
      const matchesClickId = !this.filters.clickId ||
        item.clickId.toLowerCase().includes(this.filters.clickId.toLowerCase());
      const matchesConversionId = !this.filters.conversionId ||
        item.conversionId.toLowerCase().includes(this.filters.conversionId.toLowerCase());

      return matchesSearch && matchesCampaign && matchesPublisher && matchesStatus &&
        matchesPostbackId && matchesClickId && matchesConversionId;
    });
  }

  getStatusClass(code: number): string {
    if (code >= 200 && code < 300) return 'bg-success';
    if (code >= 300 && code < 400) return 'bg-info';
    if (code >= 400 && code < 500) return 'bg-warning text-dark';
    if (code >= 500) return 'bg-danger';
    return 'bg-secondary';
  }

  getSelectedStatusLabels(): string[] {
    return this.statusCodeOptions.filter(opt => opt.selected).map(opt => opt.label);
  }

  toggleCampaign(campaignId: number): void {
    const index = this.selectedCampaigns.indexOf(campaignId);
    if (index > -1) {
      this.selectedCampaigns.splice(index, 1);
    } else {
      this.selectedCampaigns.push(campaignId);
    }
  }

  isCampaignSelected(campaignId: number): boolean {
    return this.selectedCampaigns.includes(campaignId);
  }

  togglePublisher(publisherId: string): void {
    const index = this.selectedPublishers.indexOf(publisherId);
    if (index > -1) {
      this.selectedPublishers.splice(index, 1);
    } else {
      this.selectedPublishers.push(publisherId);
    }
  }

  isPublisherSelected(publisherId: string): boolean {
    return this.selectedPublishers.includes(publisherId);
  }

  removeCampaign(campaignId: number): void {
    const index = this.selectedCampaigns.indexOf(campaignId);
    if (index > -1) {
      this.selectedCampaigns.splice(index, 1);
    }
  }

  removePublisher(publisherId: string): void {
    const index = this.selectedPublishers.indexOf(publisherId);
    if (index > -1) {
      this.selectedPublishers.splice(index, 1);
    }
  }

  getCampaignName(campaignId: number): string {
    const campaign = this.campaignOptions.find(c => c.id === campaignId);
    return campaign ? campaign.name : '';
  }

  getPublisherName(publisherId: string): string {
    const publisher = this.publisherOptions.find(p => p.id === publisherId);
    return publisher ? publisher.name : '';
  }

  toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
  closeFilterPanel() { this.showFilterPanel = false; }

  applyFilters() {
    // Filters are already applied reactively
    this.closeFilterPanel();
  }

  resetFilters(): void {
    this.filters = {
      campaign: '',
      publisher: '',
      postbackId: '',
      clickId: '',
      conversionId: ''
    };
    this.selectedCampaigns = [];
    this.selectedPublishers = [];
    this.statusCodeOptions.forEach(opt => opt.selected = false);
  }

  toggleDownloadMenu() { this.showDownloadMenu = !this.showDownloadMenu; }
  downloadCSV() { console.log('Downloading CSV'); this.showDownloadMenu = false; }
  downloadExcel() { console.log('Downloading Excel'); this.showDownloadMenu = false; }
  downloadPDF() { console.log('Downloading PDF'); this.showDownloadMenu = false; }
}
