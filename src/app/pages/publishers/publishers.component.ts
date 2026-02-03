import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PublisherService } from '../../core/services/publisher.service';
import { Publisher } from '../../core/models/publisher.model';
import { AddPublisherRequest } from '../../core/models/requests/addPublisherRequest';
import { EditPublisherComponent } from './edit-publisher/edit-publisher.component';

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
  imports: [CommonModule, FormsModule, RouterModule, NgbPaginationModule, EditPublisherComponent],
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})

export class PublishersComponent implements OnInit {
  showFilterPanel = false;
  showNewPublisherModal = false;
  showAdvancedSetup = false;
  perPage = 10;
  currentPage = 1;
  totalPages = 1;
  totalCount = 0;
  loading = false;
  selectAll = false;
  columnSearchQuery = '';

  // Edit Publisher Sidebar
  showEditPublisher = false;
  editPublisherId: number = 0;

  // New Publisher Form Data
  newPublisher: AddPublisherRequest = new AddPublisherRequest();

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
    { key: 'company_name', label: 'Company', visible: true, default: true },
    { key: 'status', label: 'Status', visible: true, default: true },
    { key: 'created_at', label: 'Created Date', visible: true, default: true },
    { key: 'last_login', label: 'Last Login', visible: true, default: true },
    { key: 'reference_id', label: 'Reference ID', visible: true, default: true },
    { key: 'tax_id', label: 'Tax ID', visible: true, default: true },
    { key: 'referred_by', label: 'Referred By', visible: true, default: true },
    { key: 'manager', label: 'Manager', visible: true, default: true },
    { key: 'username', label: 'Username', visible: false, default: false },
    { key: 'country', label: 'Country', visible: false, default: false },
    { key: 'currency', label: 'Currency', visible: false, default: false },
    { key: 'tags', label: 'Tags', visible: false, default: false },
    { key: 'city', label: 'City', visible: false, default: false },
    { key: 'phone', label: 'Phone', visible: false, default: false },
    { key: 'signup_ip', label: 'Signup IP Address', visible: false, default: false },
    { key: 'traffic_channels', label: 'Traffic Channels', visible: false, default: false }
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

  // Publishers data
  publishers: Publisher[] = [];

  selectedItems: Set<number> = new Set();

  constructor(private publisherService: PublisherService) {
    this.initTempColumnVisibility();
  }

  ngOnInit(): void {
    this.loadPublishers();
  }

  loadPublishers(): void {
    this.loading = true;
    const params = {
      page: this.currentPage,
      limit: this.perPage,
      search: this.filters.contactName || this.filters.email || undefined,
      status: this.statusOptions.find(o => o.selected)?.value || undefined
    };

    this.publisherService.getPublishers(params).subscribe({
      next: (response) => {
        if (response.success) {
          this.publishers = response.data;
          this.totalCount = response.pagination?.total;
          this.totalPages = Math.ceil(this.totalCount / this.perPage);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load publishers', err);
        this.loading = false;
      }
    });
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
    return this.publishers;
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
    // Trigger data reload with new filters
    this.currentPage = 1;
    this.loadPublishers();
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
    this.newPublisher = new AddPublisherRequest();
    this.showAdvancedSetup = false;
  }

  toggleAdvancedSetup(): void {
    this.showAdvancedSetup = !this.showAdvancedSetup;
  }

  savePublisher(): void {
    // Validate required fields
    if (!this.newPublisher.name || !this.newPublisher.email) {
      alert('Please fill in the required fields: Full Name and Email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.newPublisher.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Set loading state
    this.loading = true;

    // Call the API
    this.publisherService.addPublisher(this.newPublisher).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Publisher created successfully:', response.data);
          alert(response.message || 'Publisher created successfully!');

          // Reload the publishers list
          this.loadPublishers();

          // Close the modal
          this.closeNewPublisherModal();
        } else {
          alert(response.error?.message || 'Failed to create publisher');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error creating publisher:', err);
        const errorMessage = err.error?.message || err.error?.error?.message || 'Failed to create publisher. Please try again.';
        alert(errorMessage);
        this.loading = false;
      }
    });
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
    this.editPublisherId = pub.id;
    this.showEditPublisher = true;
  }

  onPublisherUpdated(): void {
    // Reload publishers list after successful update
    this.loadPublishers();
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
      this.loadPublishers();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPublishers();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadPublishers();
  }
}
