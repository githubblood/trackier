import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublisherService } from '../../../core/services/publisher.service';
import { PublisherDetail } from '../../../core/models/publisher.model';
import { AddPublisherRequest } from '../../../core/models/requests/addPublisherRequest';

@Component({
  selector: 'app-edit-publisher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-publisher.component.html',
  styleUrl: './edit-publisher.component.scss'
})
export class EditPublisherComponent implements OnInit, OnChanges {
  @Input() publisherId!: number;
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();
  @Output() publisherUpdated = new EventEmitter<void>();

  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  showAdvancedSetup: boolean = false;

  publisherDetail: PublisherDetail | null = null;

  // Edit form data - using same structure as Add Publisher
  editPublisher: AddPublisherRequest = new AddPublisherRequest();

  // Country options (same as Add Publisher)
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

  // Account status options (same as Add Publisher)
  accountStatusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Disabled', label: 'Disabled' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Banned', label: 'Banned' }
  ];

  // Manager options (same as Add Publisher)
  managerOptions = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Mike Wilson' },
    { id: 4, name: 'Admin User' }
  ];

  constructor(private publisherService: PublisherService) { }

  ngOnInit(): void {
    if (this.publisherId && this.show) {
      this.loadPublisherDetails();
    }
  }

  ngOnChanges(): void {
    if (this.publisherId && this.show && !this.publisherDetail) {
      this.loadPublisherDetails();
    }
  }

  loadPublisherDetails(): void {
    this.loading = true;
    this.error = '';

    this.publisherService.getPublisherById(this.publisherId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.publisherDetail = response.data;
          this.populateForm(response.data);
        } else {
          this.error = response.error?.message || 'Failed to load publisher details';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading publisher details:', err);
        this.error = 'Failed to load publisher details. Please try again.';
        this.loading = false;
      }
    });
  }

  populateForm(data: PublisherDetail): void {
    // Handle tags: convert array or string to string
    let tagsValue = '';
    if (Array.isArray(data.tags)) {
      tagsValue = data.tags.join(', ');
    } else if (typeof data.tags === 'string') {
      tagsValue = data.tags;
    }

    this.editPublisher = {
      name: data.name || '',
      email: data.email || '',
      accountStatus: this.capitalizeStatus(data.status) || 'Active',
      country: data.country || 'IN',
      company: data.company_name || '',
      website: data.website || '',
      trafficSources: data.traffic_sources || '',
      referenceId: data.reference_id || '',
      password: '',
      accountManager: data.manager || '',
      phone: data.phone || '',
      skype: data.skype || '',
      address: data.address || '',
      city: data.city || '',
      state: data.state || '',
      zipcode: data.zipcode || '',
      tags: tagsValue,
      taxId: data.tax_id || '',
      advancedCountry: data.country || '',
      username: data.username || '',
      notes: data.notes || ''
    };
  }

  capitalizeStatus(status: string): string {
    if (!status) return 'Active';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }

  toggleAdvancedSetup(): void {
    this.showAdvancedSetup = !this.showAdvancedSetup;
  }

  savePublisher(): void {
    // Validation
    if (!this.editPublisher.name || !this.editPublisher.name.trim()) {
      alert('Publisher name is required');
      return;
    }

    if (!this.editPublisher.email || !this.editPublisher.email.trim()) {
      alert('Email is required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.editPublisher.email)) {
      alert('Please enter a valid email address');
      return;
    }

    this.saving = true;

    // Prepare update request (only send fields that can be updated)
    const updateData: any = {
      name: this.editPublisher.name,
      email: this.editPublisher.email,
      company_name: this.editPublisher.company,
      website: this.editPublisher.website,
      traffic_sources: this.editPublisher.trafficSources,
      status: this.editPublisher.accountStatus.toLowerCase(),
      country: this.editPublisher.country,
      reference_id: this.editPublisher.referenceId,
      manager: this.editPublisher.accountManager,
      phone: this.editPublisher.phone,
      skype: this.editPublisher.skype,
      address: this.editPublisher.address,
      city: this.editPublisher.city,
      state: this.editPublisher.state,
      zipcode: this.editPublisher.zipcode,
      tags: this.editPublisher.tags,
      tax_id: this.editPublisher.taxId,
      username: this.editPublisher.username,
      notes: this.editPublisher.notes
    };

    // Only add password if it's not empty
    if (this.editPublisher.password) {
      updateData.password = this.editPublisher.password;
    }


    this.publisherService.updatePublisher(this.publisherId, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Publisher updated successfully:', response.data);
          alert(response.message || 'Publisher updated successfully!');

          // Emit event to parent
          this.publisherUpdated.emit();

          // Close sidebar
          this.closeSidebar();
        } else {
          alert(response.error?.message || 'Failed to update publisher');
        }
        this.saving = false;
      },
      error: (err) => {
        console.error('Error updating publisher:', err);
        const errorMessage = err.error?.message || err.error?.error?.message || 'Failed to update publisher. Please try again.';
        alert(errorMessage);
        this.saving = false;
      }
    });
  }

  closeSidebar(): void {
    this.show = false;
    this.showChange.emit(false);
    this.resetForm();
  }

  resetForm(): void {
    this.editPublisher = new AddPublisherRequest();
    this.publisherDetail = null;
    this.error = '';
    this.showAdvancedSetup = false;
  }

  retryLoad(): void {
    this.loadPublisherDetails();
  }
}
