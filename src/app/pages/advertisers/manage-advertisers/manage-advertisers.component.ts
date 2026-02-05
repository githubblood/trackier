import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AdvertiserService } from '../../../core/services/advertiser.service';
import { Advertiser } from '../../../core/models/advertiser.model';

interface Column {
    key: string;
    label: string;
    visible: boolean;
}

@Component({
    selector: 'app-manage-advertisers',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './manage-advertisers.component.html',
    styleUrls: ['./manage-advertisers.component.scss']
})
export class ManageAdvertisersComponent implements OnInit {
    advertisers: Advertiser[] = [];
    filteredAdvertisers: Advertiser[] = [];
    showFilters: boolean = false;
    showAddModal: boolean = false;
    loading: boolean = false;
    error: string = '';

    // Collapsible sections state
    collapsedSections: any = {
        advertiserId: false,
        contactName: false,
        status: false,
        email: false,
        manager: false,
        columns: false
    };

    // Filters
    filterAdvertiserId: string = '';
    filterName: string = '';
    filterEmail: string = '';
    filterStatus: string = '';
    filterManager: string = '';
    filterSecurityToken: string = '';
    columnSearchQuery: string = '';

    // Pagination
    currentPage: number = 1;
    itemsPerPage: number = 10;
    totalItems: number = 0;

    // Columns configuration
    columns: Column[] = [
        { key: 'id', label: 'ID', visible: true },
        { key: 'name', label: 'Name', visible: true },
        { key: 'company_name', label: 'Company', visible: true },
        { key: 'status', label: 'Status', visible: true },
        { key: 'created_at', label: 'Created Date', visible: true },
        { key: 'website', label: 'Website', visible: true },
        { key: 'industry', label: 'Industry', visible: true },
        { key: 'email', label: 'Email', visible: false },
        { key: 'country', label: 'Country', visible: false },
        { key: 'currency', label: 'Currency', visible: false }
    ];

    // Temporary columns for filter panel (staging area)
    tempColumns: Column[] = [];

    // New advertiser form
    newAdvertiser = {
        name: '',
        email: '',
        password: '',
        company_name: '',
        website: '',
        industry: '',
        status: 'active',
        company: '',
        reference_id: '',
        manager: '',
        notes: '',
        notify_email: false
    };

    saving: boolean = false;
    saveError: string = '';

    // Manager options
    managers = [
        { id: 1, name: 'David Arora', role: 'Admin' },
        { id: 2, name: 'Sanjay', role: 'Advertiser Manager' },
        { id: 3, name: 'Admin', role: 'Admin' }
    ];

    constructor(
        private router: Router,
        private advertiserService: AdvertiserService
    ) { }

    ngOnInit(): void {
        this.loadAdvertisers();
    }

    loadAdvertisers(): void {
        this.loading = true;
        this.error = '';

        const params = {
            page: this.currentPage,
            limit: this.itemsPerPage,
            search: this.filterName || this.filterEmail || '',
            status: this.filterStatus
        };

        this.advertiserService.getAdvertisers(params).subscribe({
            next: (response) => {

                // Handle response - check if data exists
                if (response && response.data) {
                    this.advertisers = response.data;
                    this.filteredAdvertisers = [...this.advertisers];
                    this.totalItems = response.pagination?.total || this.advertisers.length;
                    this.error = '';
                } else {
                    this.error = response.error?.message || 'No data received from server';
                    this.advertisers = [];
                    this.filteredAdvertisers = [];
                    console.error('Invalid response structure:', response);
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading advertisers:', err);
                this.error = 'Failed to load advertisers. Please try again.';
                this.advertisers = [];
                this.filteredAdvertisers = [];
                this.loading = false;
            }
        });
    }

    toggleFilters(): void {
        this.showFilters = !this.showFilters;
        if (this.showFilters) {
            // Copy current columns state to temp when opening
            this.tempColumns = this.columns.map(col => ({ ...col }));
        }
    }

    closeFilterPanel(): void {
        this.showFilters = false;
        // Reset temp columns when closing without applying
        this.tempColumns = [];
    }

    toggleSection(section: string): void {
        if (this.collapsedSections.hasOwnProperty(section)) {
            this.collapsedSections[section] = !this.collapsedSections[section];
        }
    }

    resetColumnsToDefault(): void {
        // Reset temp columns to default (only affects staging area)
        this.tempColumns.forEach((col, index) => {
            col.visible = index < 7; // Show first 7 columns by default
        });
    }

    selectAllColumns(): void {
        // Select all in temp columns (only affects staging area)
        this.tempColumns.forEach(col => col.visible = true);
    }

    applyFilters(): void {
        // Apply temp column visibility to actual columns
        this.tempColumns.forEach((tempCol, index) => {
            this.columns[index].visible = tempCol.visible;
        });

        this.currentPage = 1;
        this.loadAdvertisers();
        this.closeFilterPanel();
    }

    clearFilters(): void {
        this.filterAdvertiserId = '';
        this.filterName = '';
        this.filterEmail = '';
        this.filterStatus = '';
        this.filterManager = '';
        this.filterSecurityToken = '';
        this.currentPage = 1;
        this.loadAdvertisers();
    }

    toggleColumn(column: Column): void {
        column.visible = !column.visible;
    }

    get visibleColumns(): Column[] {
        return this.columns.filter(c => c.visible);
    }

    get filteredColumns(): Column[] {
        // Filter from temp columns when filter panel is open
        const columnsToFilter = this.showFilters && this.tempColumns.length > 0
            ? this.tempColumns
            : this.columns;

        if (!this.columnSearchQuery) return columnsToFilter;
        return columnsToFilter.filter(c =>
            c.label.toLowerCase().includes(this.columnSearchQuery.toLowerCase())
        );
    }

    get paginatedAdvertisers(): Advertiser[] {
        // Server-side pagination - API already returns paginated results
        return this.filteredAdvertisers;
    }

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadAdvertisers();
        }
    }

    viewAdvertiser(id: number): void {
        this.router.navigate(['/advertisers', id]);
    }

    editAdvertiser(id: number): void {
        this.router.navigate(['/advertisers/edit', id]);
    }

    openAddModal(): void {
        this.showAddModal = true;
        this.saving = false;
        this.saveError = '';
        this.newAdvertiser = {
            name: '',
            email: '',
            password: '',
            company_name: '',
            website: '',
            industry: '',
            status: 'active',
            company: '',
            reference_id: '',
            manager: '',
            notes: '',
            notify_email: false
        };
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    saveAdvertiser(): void {
        // Validate only required Spaxads fields: name, email
        if (!this.newAdvertiser.name || !this.newAdvertiser.email) {
            this.saveError = 'Please fill in all required fields';
            return;
        }

        // Validate name minimum length
        if (this.newAdvertiser.name.length < 3) {
            this.saveError = 'Name must be at least 3 characters long';
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.newAdvertiser.email)) {
            this.saveError = 'Please enter a valid email address';
            return;
        }

        // Validate password if provided
        if (this.newAdvertiser.password && this.newAdvertiser.password.length < 8) {
            this.saveError = 'Password must be at least 8 characters long';
            return;
        }

        // Prepare API request - map Spaxads fields to API required fields
        const apiRequest = {
            name: this.newAdvertiser.name,
            email: this.newAdvertiser.email,
            password: this.newAdvertiser.password || this.generateRandomPassword(),
            company_name: this.newAdvertiser.company || this.newAdvertiser.name,
            website: `https://${this.newAdvertiser.email.split('@')[1]}`,
            industry: 'General'
        };

        this.saving = true;
        this.saveError = '';

        this.advertiserService.addAdvertiser(apiRequest).subscribe({
            next: (response) => {
                console.log('Advertiser created:', response);

                if (response.success) {
                    this.closeAddModal();
                    this.loadAdvertisers();
                    // Optionally show success message
                    alert(`Advertiser "${response.data.name}" created successfully!`);
                } else {
                    this.saveError = response.error?.message || 'Failed to create advertiser';
                }
                this.saving = false;
            },
            error: (err) => {
                console.error('Error creating advertiser:', err);
                this.saveError = err.error?.message || 'Failed to create advertiser. Please try again.';
                this.saving = false;
            }
        });
    }

    generateRandomPassword(): string {
        const length = 12;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Active': return 'status-active';
            case 'Pending': return 'status-pending';
            case 'Rejected': return 'status-rejected';
            default: return 'status-default';
        }
    }
}
