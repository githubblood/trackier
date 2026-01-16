import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Advertiser {
    id: number;
    name: string;
    email: string;
    company: string;
    status: string;
    createdDate: string;
    lastLogin: string;
    referenceId: string;
    manager: string;
    country: string;
    currency: string;
    avatar?: string;
}

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
    itemsPerPage: number = 25;
    totalItems: number = 0;

    // Columns configuration
    columns: Column[] = [
        { key: 'id', label: 'ID', visible: true },
        { key: 'name', label: 'Name', visible: true },
        { key: 'company', label: 'Company', visible: true },
        { key: 'status', label: 'Status', visible: true },
        { key: 'createdDate', label: 'Created Date', visible: true },
        { key: 'lastLogin', label: 'Last Login', visible: true },
        { key: 'referenceId', label: 'Reference ID', visible: true },
        { key: 'manager', label: 'Managers', visible: true },
        { key: 'country', label: 'Country', visible: false },
        { key: 'currency', label: 'Currency', visible: false }
    ];

    // New advertiser form
    newAdvertiser = {
        name: '',
        email: '',
        status: 'Active',
        company: '',
        referenceId: '',
        password: '',
        manager: '',
        notes: '',
        notifyEmail: false
    };

    // Manager options
    managers = [
        { id: 1, name: 'David Arora', role: 'Admin' },
        { id: 2, name: 'Sanjay', role: 'Advertiser Manager' },
        { id: 3, name: 'Admin', role: 'Admin' }
    ];

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.loadAdvertisers();
    }

    loadAdvertisers(): void {
        // Mock data
        this.advertisers = [
            { id: 560, name: 'Betmen Affiliates- Jan\'26', email: '123456078@gmail.com', company: 'Spirit Jan\'26', status: 'Active', createdDate: 'Jan 9, 2026', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 558, name: 'Gentiii', email: 'tets202020@gmail.com', company: 'Spirit Jan\'26', status: 'Active', createdDate: 'Jan 9, 2026', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 552, name: 'Gentiii Partners- Jan\'26', email: 'gentiii@gmail.com', company: '', status: 'Active', createdDate: 'Jan 7, 2026', lastLogin: '', referenceId: '', manager: '', country: 'US', currency: 'USD' },
            { id: 549, name: 'AIfgame Jan\'26', email: 'affgame@gmail.com', company: '', status: 'Active', createdDate: 'Jan 6, 2026', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 544, name: 'Click2 Dep Dec\'25', email: 'click2@gmail.com', company: '', status: 'Active', createdDate: 'Dec 17, 2025', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 541, name: 'AIfgame Dec\'25', email: 'aifgame@dec.com', company: '', status: 'Active', createdDate: 'Dec 16, 2025', lastLogin: 'Jan 7, 2026 4:01 PM', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 536, name: '180 Partners Dec\'25', email: '180@gmail.com', company: '', status: 'Active', createdDate: 'Dec 11, 2025', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 531, name: 'Wise Capital Dec\'25', email: 'wise@gmail.com', company: '', status: 'Active', createdDate: 'Dec 8, 2025', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 529, name: 'Guffstream Dec\'25', email: 'guff@pgsmail.com', company: '', status: 'Active', createdDate: 'Dec 4, 2025', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 519, name: 'Affiliway', email: 'affil@gmail.com', company: '', status: 'Active', createdDate: 'Nov 27, 2025', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 516, name: 'Dyno In Media- Shivani', email: 'dyno@gmail.com', company: '', status: 'Active', createdDate: 'Nov 25, 2025', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 511, name: 'Gasmobli', email: 'gasmobli@spaxads.net', company: '', status: 'Active', createdDate: 'Nov 19, 2025', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' },
            { id: 510, name: 'Mihail Subotic', email: 'mihail-subotic.net', company: 'Mihail Subotic', status: 'Pending', createdDate: 'Nov 18, 2025', lastLogin: '', referenceId: '', manager: 'David Arora', country: 'US', currency: 'USD' }
        ];
        this.filteredAdvertisers = [...this.advertisers];
        this.totalItems = this.advertisers.length;
    }

    toggleFilters(): void {
        this.showFilters = !this.showFilters;
    }

    applyFilters(): void {
        this.filteredAdvertisers = this.advertisers.filter(adv => {
            if (this.filterAdvertiserId && !adv.id.toString().includes(this.filterAdvertiserId)) return false;
            if (this.filterName && !adv.name.toLowerCase().includes(this.filterName.toLowerCase())) return false;
            if (this.filterEmail && !adv.email.toLowerCase().includes(this.filterEmail.toLowerCase())) return false;
            if (this.filterStatus && adv.status !== this.filterStatus) return false;
            if (this.filterManager && !adv.manager.toLowerCase().includes(this.filterManager.toLowerCase())) return false;
            return true;
        });
        this.totalItems = this.filteredAdvertisers.length;
        this.currentPage = 1;
    }

    clearFilters(): void {
        this.filterAdvertiserId = '';
        this.filterName = '';
        this.filterEmail = '';
        this.filterStatus = '';
        this.filterManager = '';
        this.filterSecurityToken = '';
        this.filteredAdvertisers = [...this.advertisers];
        this.totalItems = this.advertisers.length;
        this.currentPage = 1;
    }

    toggleColumn(column: Column): void {
        column.visible = !column.visible;
    }

    get visibleColumns(): Column[] {
        return this.columns.filter(c => c.visible);
    }

    get filteredColumns(): Column[] {
        if (!this.columnSearchQuery) return this.columns;
        return this.columns.filter(c =>
            c.label.toLowerCase().includes(this.columnSearchQuery.toLowerCase())
        );
    }

    get paginatedAdvertisers(): Advertiser[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredAdvertisers.slice(start, start + this.itemsPerPage);
    }

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
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
        this.newAdvertiser = {
            name: '',
            email: '',
            status: 'Active',
            company: '',
            referenceId: '',
            password: '',
            manager: '',
            notes: '',
            notifyEmail: false
        };
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    saveAdvertiser(): void {
        console.log('Saving advertiser:', this.newAdvertiser);
        // In real implementation, call API
        this.closeAddModal();
        this.loadAdvertisers();
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
