import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface PostbackLog {
    conversionId: string;
    publisher: string;
    publisherId: number;
    campaign: string;
    campaignId: number;
    requestUrl: string;
    serverMessage: string;
    postbackId: number;
    status: number;
    attempts: number;
    createdAt: string;
}

@Component({
    selector: 'app-postback-pixel-logs',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './postback-pixel-logs.component.html',
    styleUrls: ['./postback-pixel-logs.component.scss']
})
export class PostbackPixelLogsComponent implements OnInit {
    postbackId: number = 0;
    logs: PostbackLog[] = [];
    loading = false;
    showFilters = false;

    // Date range
    startDate = '2026-01-16';
    endDate = '2026-01-16';

    // Filters
    filters = {
        campaign: '',
        publisher: '',
        serverStatusCode: '',
        postbackId: '',
        clickId: '',
        conversionId: ''
    };

    // Filter options
    campaignOptions = [
        { id: 12345, name: 'Spingranny- CA- Jan\'26' },
        { id: 12346, name: 'Winner Casino UK' },
        { id: 12347, name: 'Bet O Bet NL' }
    ];

    publisherOptions = [
        { id: 43, name: 'shikhar Chouhan' },
        { id: 45, name: 'shikhar Chouhan' },
        { id: 35, name: 'Ravi Squad Media' }
    ];

    statusCodeOptions = [
        { value: '2xx', label: 'Successful 2XX' },
        { value: '3xx', label: 'Redirection 3XX' },
        { value: '4xx', label: 'Client Error 4XX' },
        { value: '500', label: 'Server Error 500' },
        { value: '502', label: 'Server Error 502' }
    ];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.postbackId = +params['id'];
            this.filters.postbackId = this.postbackId.toString();
            this.loadLogs();
        });
    }

    loadLogs(): void {
        this.loading = true;
        // Simulate API call
        setTimeout(() => {
            // Mock data - in real app, this would come from API
            this.logs = [];
            this.loading = false;
        }, 500);
    }

    toggleFilters(): void {
        this.showFilters = !this.showFilters;
    }

    applyFilters(): void {
        this.loadLogs();
    }

    clearFilters(): void {
        this.filters = {
            campaign: '',
            publisher: '',
            serverStatusCode: '',
            postbackId: this.postbackId.toString(),
            clickId: '',
            conversionId: ''
        };
        this.loadLogs();
    }

    changeFilters(): void {
        this.showFilters = true;
    }

    getStatusClass(code: number): string {
        if (code >= 200 && code < 300) return 'status-success';
        if (code >= 300 && code < 400) return 'status-info';
        if (code >= 400 && code < 500) return 'status-warning';
        if (code >= 500) return 'status-error';
        return 'status-default';
    }
}
