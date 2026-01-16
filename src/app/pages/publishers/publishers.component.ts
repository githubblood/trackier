import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Publisher {
  id: number;
  name: string;
  email: string;
  company: string;
  status: string;
  createdDate: string;
  lastLogin: string;
  referenceId: string;
  taxId: string;
  referredBy: string;
  manager: string;
  username: string;
  country: string;
  currency: string;
  city: string;
  phone: string;
  signupIpAddress: string;
  trafficChannels: string;
  tags: string;
}

interface ColumnConfig {
  key: string;
  label: string;
  visible: boolean;
  default: boolean;
}

interface StatusOption {
  value: string;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-publishers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent {
  showFilterPanel = false;
  showNewPublisherModal = false;
  showAdvancedSetup = false;
  perPage = 100;
  currentPage = 1;
  totalPages = 4;
  selectAll = false;
  columnSearchQuery = '';

  // New Publisher Form Data
  newPublisher = {
    fullName: '',
    email: '',
    accountStatus: 'Active',
    country: 'IN',
    company: '',
    referenceId: '',
    password: '',
    accountManager: '',
    phone: '',
    skype: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    tags: '',
    taxId: '',
    advancedCountry: '',
    username: '',
    notes: '',
    notifyByEmail: false
  };

  // Country options
  countryOptions = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'AU', name: 'Australia' },
    { code: 'CA', name: 'Canada' },
    { code: 'JP', name: 'Japan' },
    { code: 'SG', name: 'Singapore' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'BR', name: 'Brazil' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'RU', name: 'Russia' }
  ];

  // Account status options for new publisher
  accountStatusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Disabled', label: 'Disabled' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Banned', label: 'Banned' }
  ];

  // Filter values
  filters = {
    publisherId: '',
    contactName: '',
    email: '',
    manager: '',
    referenceId: ''
  };

  // Status filter options with checkboxes
  statusOptions: StatusOption[] = [
    { value: 'active', label: 'Active', selected: false },
    { value: 'pending', label: 'Pending', selected: false },
    { value: 'disabled', label: 'Disabled', selected: false },
    { value: 'rejected', label: 'Rejected', selected: false },
    { value: 'banned', label: 'Banned', selected: false }
  ];

  // Collapsible section states
  collapsedSections = {
    publisherId: true,
    contactName: true,
    status: false,
    email: true,
    manager: true,
    referenceId: true,
    columns: false
  };

  // Column configurations - matching Trackier exactly
  columns: ColumnConfig[] = [
    { key: 'id', label: 'ID', visible: true, default: true },
    { key: 'name', label: 'Name', visible: true, default: true },
    { key: 'company', label: 'Company', visible: true, default: true },
    { key: 'status', label: 'Status', visible: true, default: true },
    { key: 'createdDate', label: 'Created Date', visible: true, default: true },
    { key: 'lastLogin', label: 'Last Login', visible: true, default: true },
    { key: 'referenceId', label: 'Reference ID', visible: true, default: true },
    { key: 'taxId', label: 'Tax ID', visible: true, default: true },
    { key: 'referredBy', label: 'Referred By', visible: true, default: true },
    { key: 'managers', label: 'Managers', visible: true, default: true },
    { key: 'username', label: 'Username', visible: false, default: false },
    { key: 'country', label: 'Country', visible: false, default: false },
    { key: 'currency', label: 'Currency', visible: false, default: false },
    { key: 'tags', label: 'Tags', visible: false, default: false },
    { key: 'city', label: 'City', visible: false, default: false },
    { key: 'phone', label: 'Phone', visible: false, default: false },
    { key: 'signupIpAddress', label: 'Signup IP Address', visible: false, default: false },
    { key: 'trafficChannels', label: 'Traffic Channels', visible: false, default: false }
  ];

  // Temporary column visibility (for Apply functionality)
  tempColumnVisibility: { [key: string]: boolean } = {};

  // Manager options
  managerOptions = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Mike Wilson' },
    { id: 4, name: 'Admin User' }
  ];

  // Publishers data matching Trackier's display
  publishers: Publisher[] = [
    { id: 568, name: 'Gasmobi Pub Gaming Jan\'26', email: 'gasmobi@pub.com', company: 'Gasmobi Gaming', status: 'Active', createdDate: '2026-01-14 10:30', lastLogin: '2026-01-15 09:15', referenceId: 'REF001', taxId: 'TX001', referredBy: '-', manager: 'John Smith', username: 'gasmobi_pub', country: 'India', currency: 'INR', city: 'Mumbai', phone: '+91 98765 43210', signupIpAddress: '192.168.1.1', trafficChannels: 'Social', tags: 'Premium' },
    { id: 567, name: 'AL Gaming Pub Jan\'26', email: 'al@gaming.com', company: 'AL Gaming', status: 'Active', createdDate: '2026-01-14 09:45', lastLogin: '2026-01-15 08:30', referenceId: 'REF002', taxId: 'TX002', referredBy: '-', manager: 'Sarah Johnson', username: 'al_gaming', country: 'UK', currency: 'GBP', city: 'London', phone: '+44 20 7123 4567', signupIpAddress: '192.168.1.2', trafficChannels: 'Display', tags: 'Standard' },
    { id: 566, name: 'FM David Jan\'26', email: 'fm@david.com', company: 'FM Media', status: 'Active', createdDate: '2026-01-14 08:20', lastLogin: '2026-01-14 16:45', referenceId: 'REF003', taxId: 'TX003', referredBy: '-', manager: 'Mike Wilson', username: 'fm_david', country: 'Germany', currency: 'EUR', city: 'Berlin', phone: '+49 30 1234 5678', signupIpAddress: '192.168.1.3', trafficChannels: 'Search', tags: 'Premium' },
    { id: 565, name: 'LL David Gaming Pub Jan\'26', email: 'lldavid@gaming.com', company: 'LL Gaming', status: 'Active', createdDate: '2026-01-13 14:30', lastLogin: '2026-01-15 10:20', referenceId: 'REF004', taxId: 'TX004', referredBy: '-', manager: 'John Smith', username: 'll_david', country: 'India', currency: 'INR', city: 'Delhi', phone: '+91 98765 43211', signupIpAddress: '192.168.1.4', trafficChannels: 'Social', tags: 'Standard' },
    { id: 564, name: 'Propeller Ads Gaming Pub', email: 'propeller@ads.com', company: 'Propeller Ads', status: 'Active', createdDate: '2026-01-13 11:15', lastLogin: '2026-01-14 15:30', referenceId: 'REF005', taxId: 'TX005', referredBy: '-', manager: 'Sarah Johnson', username: 'propeller_ads', country: 'USA', currency: 'USD', city: 'New York', phone: '+1 212 555 1234', signupIpAddress: '192.168.1.5', trafficChannels: 'Display', tags: 'Premium' },
    { id: 563, name: 'Maacle', email: 'contact@maacle.com', company: 'Maacle Inc', status: 'Active', createdDate: '2026-01-12 16:45', lastLogin: '2026-01-15 11:00', referenceId: 'REF006', taxId: 'TX006', referredBy: '-', manager: 'Mike Wilson', username: 'maacle', country: 'India', currency: 'INR', city: 'Bangalore', phone: '+91 98765 43212', signupIpAddress: '192.168.1.6', trafficChannels: 'Search', tags: 'Standard' },
    { id: 562, name: 'Jonas Gaming Pub Jan\'26', email: 'jonas@gaming.com', company: 'Jonas Media', status: 'Active', createdDate: '2026-01-12 10:30', lastLogin: '2026-01-13 14:45', referenceId: 'REF007', taxId: 'TX007', referredBy: '-', manager: 'John Smith', username: 'jonas_gaming', country: 'UK', currency: 'GBP', city: 'Manchester', phone: '+44 20 7123 4568', signupIpAddress: '192.168.1.7', trafficChannels: 'Social', tags: 'Premium' },
    { id: 561, name: 'Betmen Pub Jan\'26', email: 'betmen@pub.com', company: 'Betmen Media', status: 'Active', createdDate: '2026-01-11 09:00', lastLogin: '2026-01-14 12:30', referenceId: 'REF008', taxId: 'TX008', referredBy: '-', manager: 'Sarah Johnson', username: 'betmen_pub', country: 'Germany', currency: 'EUR', city: 'Munich', phone: '+49 30 1234 5679', signupIpAddress: '192.168.1.8', trafficChannels: 'Display', tags: 'Standard' },
    { id: 559, name: 'Spinbet Pub Jan\'26', email: 'spinbet@pub.com', company: 'Spinbet Gaming', status: 'Pending', createdDate: '2026-01-10 14:20', lastLogin: '-', referenceId: 'REF009', taxId: 'TX009', referredBy: '-', manager: 'Mike Wilson', username: 'spinbet_pub', country: 'India', currency: 'INR', city: 'Chennai', phone: '+91 98765 43213', signupIpAddress: '192.168.1.9', trafficChannels: 'Search', tags: 'New' },
    { id: 557, name: 'FM Gaming Pub Jan\'26', email: 'fmgaming@pub.com', company: 'FM Gaming Co', status: 'Active', createdDate: '2026-01-10 11:00', lastLogin: '2026-01-12 16:15', referenceId: 'REF010', taxId: 'TX010', referredBy: '-', manager: 'John Smith', username: 'fm_gaming', country: 'USA', currency: 'USD', city: 'Los Angeles', phone: '+1 310 555 1234', signupIpAddress: '192.168.1.10', trafficChannels: 'Social', tags: 'Premium' },
    { id: 556, name: 'Jack Gaming Pub Jan\'26', email: 'jack@gaming.com', company: 'Jack Media', status: 'Active', createdDate: '2026-01-09 15:30', lastLogin: '2026-01-14 09:45', referenceId: 'REF011', taxId: 'TX011', referredBy: '-', manager: 'Sarah Johnson', username: 'jack_gaming', country: 'UK', currency: 'GBP', city: 'Liverpool', phone: '+44 20 7123 4569', signupIpAddress: '192.168.1.11', trafficChannels: 'Display', tags: 'Standard' },
    { id: 555, name: 'GF Gaming Pub Jan\'26', email: 'gf@gaming.com', company: 'GF Gaming', status: 'Disabled', createdDate: '2026-01-09 10:15', lastLogin: '2026-01-11 08:30', referenceId: 'REF012', taxId: 'TX012', referredBy: '-', manager: 'Mike Wilson', username: 'gf_gaming', country: 'Germany', currency: 'EUR', city: 'Frankfurt', phone: '+49 30 1234 5680', signupIpAddress: '192.168.1.12', trafficChannels: 'Search', tags: 'Inactive' },
    { id: 554, name: 'CD Gaming David Jan\'26', email: 'cdgaming@pub.com', company: 'CD Gaming', status: 'Active', createdDate: '2026-01-08 13:45', lastLogin: '2026-01-13 11:20', referenceId: 'REF013', taxId: 'TX013', referredBy: '-', manager: 'John Smith', username: 'cd_gaming', country: 'India', currency: 'INR', city: 'Hyderabad', phone: '+91 98765 43214', signupIpAddress: '192.168.1.13', trafficChannels: 'Social', tags: 'Premium' },
    { id: 553, name: 'Gentle Partners Pub Gaming Jan\'26', email: 'gentle@partners.com', company: 'Gentle Partners', status: 'Active', createdDate: '2026-01-08 09:30', lastLogin: '2026-01-12 14:00', referenceId: 'REF014', taxId: 'TX014', referredBy: '-', manager: 'Sarah Johnson', username: 'gentle_partners', country: 'USA', currency: 'USD', city: 'Miami', phone: '+1 305 555 1234', signupIpAddress: '192.168.1.14', trafficChannels: 'Display', tags: 'Standard' },
    { id: 551, name: 'KA David Pub- Jan\'26', email: 'kadavid@pub.com', company: 'KA Media', status: 'Rejected', createdDate: '2026-01-07 16:00', lastLogin: '-', referenceId: 'REF015', taxId: 'TX015', referredBy: '-', manager: 'Mike Wilson', username: 'ka_david', country: 'India', currency: 'INR', city: 'Pune', phone: '+91 98765 43215', signupIpAddress: '192.168.1.15', trafficChannels: 'Search', tags: 'Rejected' }
  ];

  selectedItems: Set<number> = new Set();

  constructor() {
    this.initTempColumnVisibility();
  }

  initTempColumnVisibility(): void {
    this.columns.forEach(col => {
      this.tempColumnVisibility[col.key] = col.visible;
    });
  }

  get filteredColumns(): ColumnConfig[] {
    if (!this.columnSearchQuery) {
      return this.columns;
    }
    return this.columns.filter(col =>
      col.label.toLowerCase().includes(this.columnSearchQuery.toLowerCase())
    );
  }

  get visibleColumns(): ColumnConfig[] {
    return this.columns.filter(col => col.visible);
  }

  get filteredPublishers(): Publisher[] {
    return this.publishers.filter(pub => {
      const matchesPublisherId = !this.filters.publisherId ||
        pub.id.toString().includes(this.filters.publisherId);

      const matchesContactName = !this.filters.contactName ||
        pub.name.toLowerCase().includes(this.filters.contactName.toLowerCase()) ||
        pub.company.toLowerCase().includes(this.filters.contactName.toLowerCase());

      const selectedStatuses = this.statusOptions.filter(opt => opt.selected);
      const matchesStatus = selectedStatuses.length === 0 ||
        selectedStatuses.some(opt => pub.status.toLowerCase() === opt.value);

      const matchesEmail = !this.filters.email ||
        pub.email.toLowerCase().includes(this.filters.email.toLowerCase());

      const matchesReferenceId = !this.filters.referenceId ||
        pub.referenceId.toLowerCase().includes(this.filters.referenceId.toLowerCase());

      return matchesPublisherId && matchesContactName && matchesStatus && matchesEmail && matchesReferenceId;
    });
  }

  get totalCount(): number {
    return 343;
  }

  toggleSection(section: keyof typeof this.collapsedSections): void {
    this.collapsedSections[section] = !this.collapsedSections[section];
  }

  toggleFilterPanel(): void {
    this.showFilterPanel = !this.showFilterPanel;
    if (this.showFilterPanel) {
      this.initTempColumnVisibility();
    }
  }

  closeFilterPanel(): void {
    this.showFilterPanel = false;
  }

  applyFilters(): void {
    // Apply column visibility changes
    this.columns.forEach(col => {
      col.visible = this.tempColumnVisibility[col.key];
    });
    this.closeFilterPanel();
  }

  resetColumnsToDefault(): void {
    this.columns.forEach(col => {
      col.visible = col.default;
      this.tempColumnVisibility[col.key] = col.default;
    });
  }

  selectAllColumns(): void {
    this.columns.forEach(col => {
      col.visible = true;
      this.tempColumnVisibility[col.key] = true;
    });
  }

  toggleNewPublisherModal(): void {
    this.showNewPublisherModal = !this.showNewPublisherModal;
    if (!this.showNewPublisherModal) {
      this.resetNewPublisherForm();
    }
  }

  openNewPublisherModal(): void {
    this.showNewPublisherModal = true;
    this.showAdvancedSetup = false;
    this.resetNewPublisherForm();
  }

  closeNewPublisherModal(): void {
    this.showNewPublisherModal = false;
    this.resetNewPublisherForm();
  }

  resetNewPublisherForm(): void {
    this.newPublisher = {
      fullName: '',
      email: '',
      accountStatus: 'Active',
      country: 'IN',
      company: '',
      referenceId: '',
      password: '',
      accountManager: '',
      phone: '',
      skype: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      tags: '',
      taxId: '',
      advancedCountry: '',
      username: '',
      notes: '',
      notifyByEmail: false
    };
    this.showAdvancedSetup = false;
  }

  toggleAdvancedSetup(): void {
    this.showAdvancedSetup = !this.showAdvancedSetup;
  }

  savePublisher(): void {
    // Validate required fields
    if (!this.newPublisher.fullName || !this.newPublisher.email) {
      alert('Please fill in the required fields: Full Name and Email');
      return;
    }

    // Create new publisher object
    const newId = Math.max(...this.publishers.map(p => p.id)) + 1;
    const newPub: Publisher = {
      id: newId,
      name: this.newPublisher.fullName,
      email: this.newPublisher.email,
      company: this.newPublisher.company || '-',
      status: this.newPublisher.accountStatus,
      createdDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      lastLogin: '-',
      referenceId: this.newPublisher.referenceId || '-',
      taxId: this.newPublisher.taxId || '-',
      referredBy: '-',
      manager: this.newPublisher.accountManager || '-',
      username: this.newPublisher.username || this.newPublisher.fullName.toLowerCase().replace(/\s+/g, '_'),
      country: this.countryOptions.find(c => c.code === this.newPublisher.country)?.name || '-',
      currency: this.newPublisher.country === 'IN' ? 'INR' : this.newPublisher.country === 'US' ? 'USD' : 'EUR',
      city: this.newPublisher.city || '-',
      phone: this.newPublisher.phone || '-',
      signupIpAddress: '0.0.0.0',
      trafficChannels: '-',
      tags: this.newPublisher.tags || '-'
    };

    // Add to beginning of publishers list
    this.publishers.unshift(newPub);

    console.log('Publisher saved:', newPub);
    this.closeNewPublisherModal();
  }

  toggleSelectAll(): void {
    if (this.selectAll) {
      this.filteredPublishers.forEach(pub => this.selectedItems.add(pub.id));
    } else {
      this.selectedItems.clear();
    }
  }

  toggleItemSelection(id: number): void {
    if (this.selectedItems.has(id)) {
      this.selectedItems.delete(id);
    } else {
      this.selectedItems.add(id);
    }
    this.selectAll = this.selectedItems.size === this.filteredPublishers.length;
  }

  isSelected(id: number): boolean {
    return this.selectedItems.has(id);
  }

  getInitials(name: string): string {
    const parts = name.split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.substring(0, 2).toUpperCase();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active': return 'badge-active';
      case 'pending': return 'badge-pending';
      case 'disabled': return 'badge-disabled';
      case 'rejected': return 'badge-rejected';
      case 'banned': return 'badge-banned';
      default: return 'badge-secondary';
    }
  }

  getColumnValue(pub: Publisher, key: string): string {
    const value = (pub as any)[key];
    return value !== undefined && value !== null ? value : '-';
  }

  editPublisher(pub: Publisher): void {
    console.log('Editing publisher:', pub.id);
  }

  loginAsPublisher(pub: Publisher): void {
    console.log('Login as publisher:', pub.id);
  }

  deletePublisher(pub: Publisher): void {
    console.log('Deleting publisher:', pub.id);
  }

  exportPublishers(): void {
    console.log('Exporting publishers...');
  }

  showInfo(): void {
    console.log('Showing info...');
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
