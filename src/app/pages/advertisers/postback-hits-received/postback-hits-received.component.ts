import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface PostbackHit {
    id: number;
    advertiser: string;
    publisher: string;
    campaign: string;
    clickId: string;
    conversionId: string;
    status: string;
    error: string;
    timestamp: string;
    requestUrl: string;
    responseCode: number;
}

@Component({
    selector: 'app-postback-hits-received',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './postback-hits-received.component.html',
    styleUrls: ['./postback-hits-received.component.scss']
})
export class PostbackHitsReceivedComponent implements OnInit {
    // Filters
    selectedAdvertiser: string = '';
    searchBySecurityToken: boolean = false;
    selectedPublisher: string = '';
    selectedCampaign: string = '';
    clickIds: string = '';
    selectedError: string = '';
    dateRange: string = '2026-01-16 - 2026-01-16';

    // Data
    postbackHits: PostbackHit[] = [];
    totalCount: number = 0;
    currentPage: number = 1;
    loading: boolean = false;

    // Dropdown options
    advertisers = [
        { id: 560, name: 'Betmen Affiliates- Jan\'26' },
        { id: 558, name: 'Gentiii' },
        { id: 552, name: 'Gentiii Partners- Jan\'26' },
        { id: 549, name: 'AIfgame Jan\'26' }
    ];

    publishers = [
        { id: 101, name: 'Publisher A' },
        { id: 102, name: 'Publisher B' },
        { id: 103, name: 'Publisher C' }
    ];

    campaigns = [
        { id: 1001, name: 'Campaign Alpha' },
        { id: 1002, name: 'Campaign Beta' },
        { id: 1003, name: 'Campaign Gamma' }
    ];

    errorTypes = [
        'Invalid Security Token',
        'Missing Click ID',
        'Duplicate Conversion',
        'Campaign Not Found',
        'Publisher Not Found',
        'Invalid Payout'
    ];

    constructor() { }

    ngOnInit(): void {
        // Initially show empty state
    }

    search(): void {
        this.loading = true;
        console.log('Searching with filters:', {
            advertiser: this.selectedAdvertiser,
            searchByToken: this.searchBySecurityToken,
            publisher: this.selectedPublisher,
            campaign: this.selectedCampaign,
            clickIds: this.clickIds,
            error: this.selectedError,
            dateRange: this.dateRange
        });

        // Simulate API call
        setTimeout(() => {
            // Mock data when search is applied
            if (this.selectedAdvertiser || this.selectedPublisher || this.clickIds) {
                this.postbackHits = [
                    {
                        id: 1,
                        advertiser: 'Betmen Affiliates- Jan\'26',
                        publisher: 'Publisher A',
                        campaign: 'Campaign Alpha',
                        clickId: 'CLK001234567',
                        conversionId: 'CONV001234',
                        status: 'Success',
                        error: '',
                        timestamp: '2026-01-16 10:30:00',
                        requestUrl: 'https://spaxads.trackier.co/acquisition?click_id=CLK001234567',
                        responseCode: 200
                    },
                    {
                        id: 2,
                        advertiser: 'Gentiii',
                        publisher: 'Publisher B',
                        campaign: 'Campaign Beta',
                        clickId: 'CLK001234568',
                        conversionId: 'CONV001235',
                        status: 'Error',
                        error: 'Invalid Security Token',
                        timestamp: '2026-01-16 10:25:00',
                        requestUrl: 'https://spaxads.trackier.co/acquisition?click_id=CLK001234568',
                        responseCode: 401
                    }
                ];
                this.totalCount = 2;
            } else {
                this.postbackHits = [];
                this.totalCount = 0;
            }
            this.loading = false;
        }, 500);
    }

    exportCsv(): void {
        console.log('Exporting CSV...');
    }

    clearFilters(): void {
        this.selectedAdvertiser = '';
        this.searchBySecurityToken = false;
        this.selectedPublisher = '';
        this.selectedCampaign = '';
        this.clickIds = '';
        this.selectedError = '';
        this.postbackHits = [];
        this.totalCount = 0;
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Success': return 'status-success';
            case 'Error': return 'status-error';
            case 'Pending': return 'status-pending';
            default: return '';
        }
    }

    getResponseCodeClass(code: number): string {
        if (code >= 200 && code < 300) return 'code-success';
        if (code >= 400 && code < 500) return 'code-warning';
        if (code >= 500) return 'code-error';
        return '';
    }
}
