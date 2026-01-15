import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-sampling-report',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './sampling-report.component.html',
    styleUrls: ['./sampling-report.component.scss']
})
export class SamplingReportComponent {
    searchQuery = '';

    // Filter selections
    selectedCampaigns: string[] = [];
    selectedPublishers: string[] = [];

    // Available options for filters
    campaigns = [
        { id: 'camp1', name: 'Spingranny- CA- Jan\'26' },
        { id: 'camp2', name: 'Winner Casino UK' },
        { id: 'camp3', name: 'Bet O Bet NL' },
        { id: 'camp4', name: 'Play Ojo AU' },
        { id: 'camp5', name: 'Monster Casino DE' }
    ];

    publishers = [
        { id: 'pub1', name: 'ATUL Kumar' },
        { id: 'pub2', name: 'IG Link' },
        { id: 'pub3', name: 'Shivai Networks' },
        { id: 'pub4', name: 'Digital Media Pro' },
        { id: 'pub5', name: 'AdNetwork Plus' }
    ];

    samplingData = [
        { campaign: 'Spingranny- CA- Jan\'26', campaignId: 12345, publisher: 'ALL', advertiser: 'Fomento Shivani', goal: 'Default', samplingPercentage: 15, sampledCount: 45, totalCount: 300 },
        { campaign: 'Winner Casino UK', campaignId: 12346, publisher: 'IG Link', advertiser: 'Li- David', goal: 'First Deposit', samplingPercentage: 10, sampledCount: 28, totalCount: 280 },
        { campaign: 'Bet O Bet NL', campaignId: 12347, publisher: 'Shivai Networks', advertiser: 'AdNetwork Inc', goal: 'Qualified Lead', samplingPercentage: 20, sampledCount: 62, totalCount: 310 },
        { campaign: 'Play Ojo AU', campaignId: 12348, publisher: 'ALL', advertiser: 'Global Media', goal: 'Purchase', samplingPercentage: 5, sampledCount: 15, totalCount: 300 },
        { campaign: 'Monster Casino DE', campaignId: 12349, publisher: 'AdNetwork Plus', advertiser: 'Digital Ventures', goal: 'App Install', samplingPercentage: 25, sampledCount: 89, totalCount: 356 }
    ];

    get filteredData() {
        if (!this.searchQuery) return this.samplingData;
        return this.samplingData.filter(item =>
            item.campaign.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.publisher.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.advertiser.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    applyFilters() {
        console.log('Applying filters:', { campaigns: this.selectedCampaigns, publishers: this.selectedPublishers });
    }

    copyToClipboard() { console.log('Copied to clipboard'); }
    downloadCSV() { console.log('Downloading CSV'); }
    downloadExcel() { console.log('Downloading Excel'); }
    downloadPDF() { console.log('Downloading PDF'); }
    printTable() { window.print(); }
}
