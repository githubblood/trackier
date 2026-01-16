import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FieldOption {
  id: string;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-impression-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './impression-report.component.html',
  styleUrls: ['./impression-report.component.scss']
})
export class ImpressionReportComponent {
  searchQuery = '';
  showFilterPanel = false;
  showDownloadMenu = false;
  showFieldsModal = false;
  fieldSearch = '';
  startDate = '2026-01-14';
  endDate = '2026-01-15';

  // Temporary field selections for the modal (only applied on "Apply" click)
  tempFieldSelections: { [key: string]: boolean } = {};

  filters = {
    campaign: '',
    publisher: '',
    advertiser: '',
    impressionId: '',
    p1: '',
    isRejected: '',
    source: ''
  };

  // Fields Column 1 - Publisher & P-params
  fieldsCol1: FieldOption[] = [
    { id: 'field_publisher', label: 'Publisher', selected: true },
    { id: 'field_source', label: 'Source', selected: false },
    { id: 'field_p1', label: 'P1', selected: true },
    { id: 'field_p2', label: 'P2', selected: false },
    { id: 'field_p3', label: 'P3', selected: false },
    { id: 'field_p4', label: 'P4', selected: false },
    { id: 'field_p5', label: 'P5', selected: false },
    { id: 'field_p6', label: 'P6', selected: false },
    { id: 'field_p7', label: 'P7', selected: false },
    { id: 'field_p8', label: 'P8', selected: false },
    { id: 'field_p9', label: 'P9', selected: false },
    { id: 'field_p10', label: 'P10', selected: false },
    { id: 'field_p11', label: 'P11', selected: false },
    { id: 'field_p12', label: 'P12', selected: false },
    { id: 'field_p13', label: 'P13', selected: false },
    { id: 'field_p14', label: 'P14', selected: false },
    { id: 'field_p15', label: 'P15', selected: false },
    { id: 'field_gaid', label: 'GAID', selected: false },
    { id: 'field_idfa', label: 'IDFA', selected: false },
    { id: 'field_app_id', label: 'App ID', selected: false }
  ];

  // Fields Column 2 - Campaign & Finance
  fieldsCol2: FieldOption[] = [
    { id: 'field_campaign', label: 'Campaign', selected: true },
    { id: 'field_landing_page', label: 'Landing Page', selected: false },
    { id: 'field_payout', label: 'Payout', selected: false },
    { id: 'field_revenue', label: 'Revenue', selected: false },
    { id: 'field_smart_link', label: 'Smart Link', selected: false }
  ];

  // Fields Column 3 - Geo & Tech
  fieldsCol3: FieldOption[] = [
    { id: 'field_ip_address', label: 'IP Address', selected: true },
    { id: 'field_city', label: 'City', selected: false },
    { id: 'field_region', label: 'Region', selected: false },
    { id: 'field_country', label: 'Country (GEO)', selected: true },
    { id: 'field_carrier', label: 'Carrier (ISP)', selected: false },
    { id: 'field_browser', label: 'Browser', selected: false },
    { id: 'field_os', label: 'Operating System (OS)', selected: false },
    { id: 'field_device', label: 'Device', selected: true },
    { id: 'field_device_brand', label: 'Device Brand', selected: false },
    { id: 'field_device_language', label: 'Device Language', selected: false },
    { id: 'field_user_agent', label: 'User Agent', selected: false }
  ];

  // Fields Column 4 - System Details
  fieldsCol4: FieldOption[] = [
    { id: 'field_impression_id', label: 'Impression ID', selected: true },
    { id: 'field_is_rejected', label: 'Is Rejected', selected: false },
    { id: 'field_note', label: 'Note', selected: false },
    { id: 'field_referrer', label: 'Referrer', selected: false },
    { id: 'field_created', label: 'Created', selected: true }
  ];

  // Column key mapping for table display
  columnKeyMap: { [key: string]: string } = {
    'field_publisher': 'publisher',
    'field_campaign': 'campaign',
    'field_ip_address': 'ipAddress',
    'field_p1': 'p1',
    'field_country': 'country',
    'field_device': 'device',
    'field_impression_id': 'impressionId',
    'field_created': 'created',
    'field_os': 'os',
    'field_browser': 'browser',
    'field_city': 'city',
    'field_region': 'region',
    'field_source': 'source',
    'field_payout': 'payout',
    'field_revenue': 'revenue',
    'field_is_rejected': 'isRejected'
  };

  impressions = [
    { impressionId: 'IMP001', publisher: 'ATUL Kumar', publisherId: 'P001', campaign: 'Spingranny- CA- Jan\'26', campaignId: 12345, advertiser: 'Fomento Shivani', p1: 'sub123', device: 'Mobile', os: 'iOS', country: 'CA', created: '2026-01-14 10:23:45', ipAddress: '192.168.1.1', browser: 'Safari', city: 'Toronto', region: 'Ontario', source: 'web', payout: 0.01, revenue: 0.02, isRejected: false },
    { impressionId: 'IMP002', publisher: 'IG Link', publisherId: 'P002', campaign: 'Winner Casino UK', campaignId: 12346, advertiser: 'Li- David', p1: 'sub456', device: 'Desktop', os: 'Windows', country: 'UK', created: '2026-01-14 10:22:30', ipAddress: '192.168.1.2', browser: 'Chrome', city: 'London', region: 'England', source: 'email', payout: 0.02, revenue: 0.03, isRejected: false },
    { impressionId: 'IMP003', publisher: 'Shivai Networks', publisherId: 'P003', campaign: 'Bet O Bet NL', campaignId: 12347, advertiser: 'AdNetwork Inc', p1: 'sub789', device: 'Mobile', os: 'Android', country: 'NL', created: '2026-01-14 10:21:15', ipAddress: '192.168.1.3', browser: 'Firefox', city: 'Amsterdam', region: 'North Holland', source: 'social', payout: 0.01, revenue: 0.02, isRejected: true },
    { impressionId: 'IMP004', publisher: 'Digital Media Pro', publisherId: 'P004', campaign: 'Play Ojo AU', campaignId: 12348, advertiser: 'Global Media', p1: 'sub321', device: 'Tablet', os: 'iOS', country: 'AU', created: '2026-01-14 10:20:00', ipAddress: '192.168.1.4', browser: 'Safari', city: 'Sydney', region: 'NSW', source: 'web', payout: 0.03, revenue: 0.04, isRejected: false },
    { impressionId: 'IMP005', publisher: 'AdNetwork Plus', publisherId: 'P005', campaign: 'Monster Casino DE', campaignId: 12349, advertiser: 'Digital Ventures', p1: 'sub654', device: 'Mobile', os: 'Android', country: 'DE', created: '2026-01-14 10:19:45', ipAddress: '192.168.1.5', browser: 'Chrome', city: 'Berlin', region: 'Berlin', source: 'app', payout: 0.01, revenue: 0.02, isRejected: false }
  ];

  get filteredData() {
    return this.impressions.filter(item => {
      const matchesSearch = !this.searchQuery ||
        item.publisher.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.campaign.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesSearch;
    });
  }

  getAllFields(): FieldOption[] {
    return [...this.fieldsCol1, ...this.fieldsCol2, ...this.fieldsCol3, ...this.fieldsCol4];
  }

  getSelectedColumns(): FieldOption[] {
    return this.getAllFields().filter(f => f.selected);
  }

  getSelectedFieldTags(): FieldOption[] {
    return this.getAllFields().filter(f => f.selected).slice(0, 10); // Show max 10 tags
  }

  isColumnSelected(columnKey: string): boolean {
    const field = this.getAllFields().find(f => this.columnKeyMap[f.id] === columnKey);
    return field ? field.selected : false;
  }

  removeField(fieldId: string): void {
    const allFields = this.getAllFields();
    const field = allFields.find(f => f.id === fieldId);
    if (field) {
      field.selected = false;
    }
  }

  getFilteredFields(fields: FieldOption[]): FieldOption[] {
    if (!this.fieldSearch) return fields;
    const search = this.fieldSearch.toLowerCase();
    return fields.filter(f => f.label.toLowerCase().includes(search));
  }

  selectAllFields(): void {
    // Update temp selections
    this.getAllFields().forEach(f => this.tempFieldSelections[f.id] = true);
  }

  clearAllFields(): void {
    // Update temp selections
    this.getAllFields().forEach(f => this.tempFieldSelections[f.id] = false);
  }

  // Get the temp selection value for a field (used in modal checkboxes)
  getTempFieldValue(fieldId: string): boolean {
    return this.tempFieldSelections[fieldId] ?? false;
  }

  // Set the temp selection value for a field (used in modal checkboxes)
  setTempFieldValue(fieldId: string, value: boolean): void {
    this.tempFieldSelections[fieldId] = value;
  }

  // Modal and panel controls
  toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
  closeFilterPanel() { this.showFilterPanel = false; }
  applyFilters() { this.closeFilterPanel(); }

  openFieldsModal() {
    // Copy current field selections to temp
    this.tempFieldSelections = {};
    this.getAllFields().forEach(f => {
      this.tempFieldSelections[f.id] = f.selected;
    });
    this.showFieldsModal = true;
  }

  closeFieldsModal() {
    // Just close without applying - discard temp changes
    this.showFieldsModal = false;
    this.fieldSearch = '';
  }

  applyFieldSelections() {
    // Apply temp selections to actual fields
    this.getAllFields().forEach(f => {
      f.selected = this.tempFieldSelections[f.id] ?? f.selected;
    });
    this.showFieldsModal = false;
    this.fieldSearch = '';
  }

  toggleDownloadMenu() { this.showDownloadMenu = !this.showDownloadMenu; }
  downloadCSV() { console.log('Downloading CSV'); this.showDownloadMenu = false; }
  downloadExcel() { console.log('Downloading Excel'); this.showDownloadMenu = false; }
  downloadPDF() { console.log('Downloading PDF'); this.showDownloadMenu = false; }
}
