import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './click-report.component.html',
  styleUrls: ['./click-report.component.scss']
})
export class ClickReportComponent {
  // Top Controls
  totalClicks = 6959;
  rowsPerPage = 100;
  dateRange = '2026-01-15 - 2026-01-15';
  showFilterPanel = false;

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

  clickLogs: ClickLog[] = [
    {
      campaignName: 'Slotozen Casino- CA- Dec\'25', campaignId: 913, ipAddress: '66.23.26.193',
      city: 'Toronto', region: 'Ontario', countryCode: 'CA', device: 'mobile',
      clickId: '69688e637bc8ba0347093c32', referrer: '', created: 'Jan 15, 2026 15:46:03',
      publisher: 'AdNetwork Inc', publisherId: 'PUB-101', p1: 'sub_123', gaid: 'a7b3c2d4-e5f6',
      source: 'app_source', browser: 'Chrome', os: 'Android'
    },
    {
      campaignName: 'Pistolo- DE- Nov\'25', campaignId: 914, ipAddress: '2003:cd:af40:7e8e:99d0:45d3:5a61:9096',
      city: 'Flensburg', region: 'Schleswig-Holstein', countryCode: 'DE', device: 'mobile',
      clickId: '69688e61c608a4034dc5d990', referrer: '', created: 'Jan 15, 2026 15:45:55',
      publisher: 'MediaBuy LLC', source: 'web', p1: 'ref_998', gaid: '',
      isUnique: 'Yes', isRejected: 'No'
    },
    {
      campaignName: 'Ivybet- CA- Nov\'25', campaignId: 919, ipAddress: '2607:fea8:21e1:1300:47dd...',
      city: 'Etobicoke', region: 'Ontario', countryCode: 'CA', device: 'mobile',
      clickId: '69688e6048dba20351efce7b', referrer: 'google.com', created: 'Jan 15, 2026 15:44:12',
      publisher: 'Direct Pub', source: 'organic', p1: 'click_001', gaid: 'b8c4d3e5-f6g7'
    }
  ];

  get filteredLogs(): ClickLog[] {
    return this.clickLogs.filter(log => {
      const search = this.filters.campaign.toLowerCase();
      return !search || log.campaignName.toLowerCase().includes(search);
    });
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
  applyFilters() { console.log('Filters:', this.filters); this.closeFilterPanel(); }
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

