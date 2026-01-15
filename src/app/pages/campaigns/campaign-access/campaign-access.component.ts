import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-campaign-access',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './campaign-access.component.html',
    styleUrls: ['./campaign-access.component.scss']
})
export class CampaignAccessComponent {
    // Filter panel visibility
    showFilterPanel = false;

    // Filter form
    filters = {
        campaignIds: '',
        publisher: '',
        publisherManager: '',
        advertiser: '',
        campaignStatus: '',
        status: '',
        campaignType: 'ALL',
        addDateRange: false,
        startDate: '',
        endDate: ''
    };

    // Bulk selection
    selectAll = false;
    selectedItems: number[] = [];
    showBulkActionMenu = false;

    // Table data
    accessData = [
        {
            id: 1,
            campaignId: 439,
            campaignName: 'Spinzwin',
            campaignStatus: 'Active',
            publisherId: 303,
            publisherName: 'ATUL Kumar',
            advertiserId: 350,
            advertiserName: 'Fomento Shivani',
            status: 'Approved',
            publisherManager: 'Admin User',
            updatedBy: 'System',
            updated: '2025-07-23T18:23:00',
            accessType: 'Private',
            message: 'N/A'
        },
        {
            id: 2,
            campaignId: 439,
            campaignName: 'Spinzwin',
            campaignStatus: 'Active',
            publisherId: 404,
            publisherName: 'IG Link',
            advertiserId: 350,
            advertiserName: 'Fomento Shivani',
            status: 'Approved',
            publisherManager: 'Admin User',
            updatedBy: 'System',
            updated: '2025-07-22T14:15:00',
            accessType: 'Private',
            message: 'N/A'
        },
        {
            id: 3,
            campaignId: 438,
            campaignName: 'Spinzwin',
            campaignStatus: 'Paused',
            publisherId: 405,
            publisherName: 'Shivai',
            advertiserId: 350,
            advertiserName: 'Fomento Shivani',
            status: 'Approved',
            publisherManager: 'Manager One',
            updatedBy: 'Admin',
            updated: '2025-07-21T10:30:00',
            accessType: 'Public',
            message: 'Approved for traffic'
        },
        {
            id: 4,
            campaignId: 440,
            campaignName: 'Bet O Bet CA',
            campaignStatus: 'Active',
            publisherId: 303,
            publisherName: 'ATUL Kumar',
            advertiserId: 350,
            advertiserName: 'Fomento Shivani',
            status: 'Approved',
            publisherManager: 'Admin User',
            updatedBy: 'System',
            updated: '2025-07-20T09:45:00',
            accessType: 'Private',
            message: 'N/A'
        },
        {
            id: 5,
            campaignId: 440,
            campaignName: 'Bet O Bet CA',
            campaignStatus: 'Active',
            publisherId: 424,
            publisherName: 'IG Link',
            advertiserId: 350,
            advertiserName: 'Fomento Shivani',
            status: 'Pending',
            publisherManager: 'Manager Two',
            updatedBy: 'Publisher',
            updated: '2025-07-19T16:20:00',
            accessType: 'Permission',
            message: 'Waiting for approval'
        },
        {
            id: 6,
            campaignId: 441,
            campaignName: 'Play Ojo',
            campaignStatus: 'Active',
            publisherId: 303,
            publisherName: 'ATUL Kumar',
            advertiserId: 350,
            advertiserName: 'Fomento Shivani',
            status: 'Approved',
            publisherManager: 'Admin User',
            updatedBy: 'System',
            updated: '2025-07-18T11:00:00',
            accessType: 'Private',
            message: 'N/A'
        },
        {
            id: 7,
            campaignId: 442,
            campaignName: 'Monster Casino',
            campaignStatus: 'Active',
            publisherId: 303,
            publisherName: 'ATUL Kumar',
            advertiserId: 350,
            advertiserName: 'Fomento Shivani',
            status: 'Approved',
            publisherManager: 'Admin User',
            updatedBy: 'System',
            updated: '2025-07-17T14:30:00',
            accessType: 'Private',
            message: 'N/A'
        },
        {
            id: 8,
            campaignId: 466,
            campaignName: 'CA - LuckyWins META ONLY CPL',
            campaignStatus: 'Active',
            publisherId: 303,
            publisherName: 'ATUL Kumar',
            advertiserId: 330,
            advertiserName: 'Li- David',
            status: 'Approved',
            publisherManager: 'Manager One',
            updatedBy: 'Admin',
            updated: '2025-07-16T09:15:00',
            accessType: 'Private',
            message: 'N/A'
        }
    ];

    // Dropdown options
    publishers = [
        { id: 303, name: 'ATUL Kumar' },
        { id: 404, name: 'IG Link' },
        { id: 405, name: 'Shivai' },
        { id: 424, name: 'John Doe' }
    ];

    advertisers = [
        { id: 350, name: 'Fomento Shivani' },
        { id: 330, name: 'Li- David' },
        { id: 320, name: 'AdNetwork Inc' }
    ];

    publisherManagers = [
        'Admin User',
        'Manager One',
        'Manager Two'
    ];

    campaignStatusOptions = ['Active', 'Paused', 'Pending', 'Deleted'];
    statusOptions = ['Approved', 'Pending', 'Rejected'];
    campaignTypeOptions = ['ALL', 'CPA', 'CPS', 'CPI', 'CPL', 'CPM', 'CPC'];

    get totalCount(): number {
        return this.accessData.length;
    }

    // Toggle filter panel
    toggleFilterPanel() {
        this.showFilterPanel = !this.showFilterPanel;
    }

    // Close filter panel
    closeFilterPanel() {
        this.showFilterPanel = false;
    }

    // Toggle bulk action menu
    toggleBulkActionMenu() {
        this.showBulkActionMenu = !this.showBulkActionMenu;
    }

    // Close bulk action menu
    closeBulkActionMenu() {
        this.showBulkActionMenu = false;
    }

    // Apply filters
    applyFilters() {
        console.log('Applying filters:', this.filters);
        this.closeFilterPanel();
    }

    // Reset filters
    resetFilters() {
        this.filters = {
            campaignIds: '',
            publisher: '',
            publisherManager: '',
            advertiser: '',
            campaignStatus: '',
            status: '',
            campaignType: 'ALL',
            addDateRange: false,
            startDate: '',
            endDate: ''
        };
    }

    // Select all items
    toggleSelectAll() {
        if (this.selectAll) {
            this.selectedItems = this.accessData.map(item => item.id);
        } else {
            this.selectedItems = [];
        }
    }

    // Toggle single item selection
    toggleItemSelection(id: number) {
        const index = this.selectedItems.indexOf(id);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        } else {
            this.selectedItems.push(id);
        }
        this.selectAll = this.selectedItems.length === this.accessData.length;
    }

    // Check if item is selected
    isSelected(id: number): boolean {
        return this.selectedItems.includes(id);
    }

    // Delete access
    deleteAccess(id: number) {
        if (confirm('Are you sure you want to delete this access?')) {
            this.accessData = this.accessData.filter(item => item.id !== id);
            console.log('Deleted access:', id);
        }
    }

    // Format date
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Get status badge class
    getStatusClass(status: string): string {
        switch (status.toLowerCase()) {
            case 'active':
            case 'approved':
                return 'badge-success';
            case 'paused':
            case 'pending':
                return 'badge-warning';
            case 'deleted':
            case 'rejected':
                return 'badge-danger';
            default:
                return 'badge-secondary';
        }
    }

    // Export methods
    copyToClipboard() {
        const text = this.accessData.map(item =>
            `${item.campaignId}\t${item.campaignName}\t${item.campaignStatus}\t${item.publisherName}\t${item.advertiserName}\t${item.status}`
        ).join('\n');
        navigator.clipboard.writeText(text).then(() => {
            alert('Data copied to clipboard!');
        });
    }

    exportCSV() {
        const headers = 'Campaign ID,Campaign,Campaign Status,Publisher,Advertiser,Status,Publisher Manager,Updated By,Updated,Access Type,Message\n';
        const csv = headers + this.accessData.map(item =>
            `${item.campaignId},"${item.campaignName}",${item.campaignStatus},"(ID: ${item.publisherId}) ${item.publisherName}","(ID: ${item.advertiserId}) ${item.advertiserName}",${item.status},"${item.publisherManager}","${item.updatedBy}","${item.updated}",${item.accessType},"${item.message}"`
        ).join('\n');

        this.downloadFile(csv, 'campaign_access.csv', 'text/csv');
    }

    exportExcel() {
        // For now, export as CSV with .xls extension (basic solution)
        const headers = 'Campaign ID\tCampaign\tCampaign Status\tPublisher\tAdvertiser\tStatus\tPublisher Manager\tUpdated By\tUpdated\tAccess Type\tMessage\n';
        const excel = headers + this.accessData.map(item =>
            `${item.campaignId}\t${item.campaignName}\t${item.campaignStatus}\t(ID: ${item.publisherId}) ${item.publisherName}\t(ID: ${item.advertiserId}) ${item.advertiserName}\t${item.status}\t${item.publisherManager}\t${item.updatedBy}\t${item.updated}\t${item.accessType}\t${item.message}`
        ).join('\n');

        this.downloadFile(excel, 'campaign_access.xls', 'application/vnd.ms-excel');
    }

    exportPDF() {
        // Simple implementation - opens print dialog
        alert('PDF export functionality - In a real app, use a library like jsPDF');
        window.print();
    }

    printTable() {
        window.print();
    }

    downloadFile(content: string, filename: string, type: string) {
        const blob = new Blob([content], { type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }

    // Bulk action methods
    bulkApprove() {
        if (this.selectedItems.length === 0) return;

        if (confirm(`Are you sure you want to approve ${this.selectedItems.length} access(es)?`)) {
            this.accessData = this.accessData.map(item => {
                if (this.selectedItems.includes(item.id)) {
                    return { ...item, status: 'Approved' };
                }
                return item;
            });
            console.log('Approved:', this.selectedItems);
            this.clearSelection();
        }
    }

    bulkDeny() {
        if (this.selectedItems.length === 0) return;

        if (confirm(`Are you sure you want to deny ${this.selectedItems.length} access(es)?`)) {
            this.accessData = this.accessData.map(item => {
                if (this.selectedItems.includes(item.id)) {
                    return { ...item, status: 'Rejected' };
                }
                return item;
            });
            console.log('Denied:', this.selectedItems);
            this.clearSelection();
        }
    }

    exportAccesses() {
        const selectedData = this.accessData.filter(item => this.selectedItems.includes(item.id));
        const headers = 'Campaign ID,Campaign,Campaign Status,Publisher,Advertiser,Status,Access Type\n';
        const csv = headers + selectedData.map(item =>
            `${item.campaignId},"${item.campaignName}",${item.campaignStatus},"(ID: ${item.publisherId}) ${item.publisherName}","(ID: ${item.advertiserId}) ${item.advertiserName}",${item.status},${item.accessType}`
        ).join('\n');

        this.downloadFile(csv, 'selected_accesses.csv', 'text/csv');
        this.closeBulkActionMenu();
    }

    bulkDelete() {
        if (this.selectedItems.length === 0) return;

        if (confirm(`Are you sure you want to delete ${this.selectedItems.length} access(es)?`)) {
            this.accessData = this.accessData.filter(item => !this.selectedItems.includes(item.id));
            console.log('Deleted:', this.selectedItems);
            this.clearSelection();
        }
    }

    clearSelection() {
        this.selectedItems = [];
        this.selectAll = false;
        this.showBulkActionMenu = false;
    }
}
