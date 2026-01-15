import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cap-report',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './cap-report.component.html',
    styleUrls: ['./cap-report.component.scss']
})
export class CapReportComponent {
    searchQuery = '';
    showFilterPanel = false;
    showDownloadMenu = false;

    filters = {
        campaign: '',
        publisher: '',
        metric: 'all'
    };

    capData = [
        { campaign: 'Spingranny- CA- Jan\'26', campaignId: 12345, publisher: 'All', metric: 'Click', goal: 'Default', limit: 1000, usage: 245, percentage: 24.5, redirect: 'Stop Traffic' },
        { campaign: 'Winner Casino UK', campaignId: 12346, publisher: 'ATUL Kumar', metric: 'Conversion', goal: 'Registration', limit: 500, usage: 125, percentage: 25.0, redirect: 'Redirect to URL' },
        { campaign: 'Bet O Bet NL', campaignId: 12347, publisher: 'IG Link', metric: 'Revenue', goal: 'First Deposit', limit: 10000, usage: 3200, percentage: 32.0, redirect: 'Stop Traffic' },
        { campaign: 'Play Ojo AU', campaignId: 12348, publisher: 'All', metric: 'Click', goal: 'Default', limit: 5000, usage: 1890, percentage: 37.8, redirect: 'Stop Traffic' },
        { campaign: 'Monster Casino DE', campaignId: 12349, publisher: 'Shivai Networks', metric: 'Conversion', goal: 'App Install', limit: 200, usage: 45, percentage: 22.5, redirect: 'Redirect to URL' }
    ];

    get filteredData() {
        return this.capData.filter(item => {
            const matchesSearch = !this.searchQuery ||
                item.campaign.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                item.publisher.toLowerCase().includes(this.searchQuery.toLowerCase());
            const matchesMetric = this.filters.metric === 'all' || item.metric === this.filters.metric;
            return matchesSearch && matchesMetric;
        });
    }

    toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
    closeFilterPanel() { this.showFilterPanel = false; }
    applyFilters() { this.closeFilterPanel(); }
    toggleDownloadMenu() { this.showDownloadMenu = !this.showDownloadMenu; }
    copyToClipboard() { console.log('Copied to clipboard'); this.showDownloadMenu = false; }
    downloadCSV() { console.log('Downloading CSV'); this.showDownloadMenu = false; }
    downloadExcel() { console.log('Downloading Excel'); this.showDownloadMenu = false; }
    downloadPDF() { console.log('Downloading PDF'); this.showDownloadMenu = false; }
    printTable() { window.print(); this.showDownloadMenu = false; }
    getProgressColor(percentage: number): string {
        if (percentage >= 75) return '#dc3545';
        if (percentage >= 50) return '#ffc107';
        return '#28a745';
    }
}
