import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ComparisonMetric {
    period1: number;
    period2: number;
}

interface ComparisonRow {
    publisher: string;
    publisherId: string;
    grossClicks: ComparisonMetric;
    approvedConversions: ComparisonMetric;
    payout: ComparisonMetric;
    revenue: ComparisonMetric;
    profit: ComparisonMetric;
}

@Component({
    selector: 'app-comparison-report',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './comparison-report.component.html',
    styleUrls: ['./comparison-report.component.scss']
})
export class ComparisonReportComponent {
    searchQuery = '';
    showFilterPanel = false;
    groupBySearch = '';
    metricsSearch = '';

    // Date ranges
    compareFromStart = '2026-01-01';
    compareFromEnd = '2026-01-07';
    compareWithStart = '2026-01-08';
    compareWithEnd = '2026-01-14';

    filters = {
        campaign: '',
        publisher: '',
        advertiser: ''
    };

    // Group By options - Complete list from Trackier
    groupByOptions = [
        { key: 'campaign', label: 'Campaign', checked: false },
        { key: 'campaignId', label: 'Campaign ID', checked: false },
        { key: 'campaignLongId', label: 'Campaign Long ID', checked: false },
        { key: 'campaignStatus', label: 'Campaign Status', checked: false },
        { key: 'campaignGeo', label: 'Campaign GEO', checked: false },
        { key: 'campaignAppName', label: 'Campaign App Name', checked: false },
        { key: 'objective', label: 'Objective', checked: false },
        { key: 'publisher', label: 'Publisher', checked: true },
        { key: 'publisherId', label: 'Publisher ID', checked: false },
        { key: 'publisherLongId', label: 'Publisher Long ID', checked: false },
        { key: 'source', label: 'Source (Sub Publisher)', checked: false },
        { key: 'publisherManager', label: 'Publisher Manager', checked: false },
        { key: 'advertiser', label: 'Advertiser', checked: false },
        { key: 'advertiserId', label: 'Advertiser ID', checked: false },
        { key: 'advertiserManager', label: 'Advertiser Manager', checked: false },
        { key: 'currency', label: 'Currency', checked: false },
        { key: 'goalName', label: 'Goal Name', checked: false },
        { key: 'goalId', label: 'Goal ID', checked: false },
        { key: 'smartLink', label: 'Smart Link', checked: false },
        { key: 'referrerCampaign', label: 'Referrer Campaign', checked: false },
        { key: 'referrerCampaignId', label: 'Referrer Campaign ID', checked: false },
        { key: 'releaseOrderId', label: 'Release Order ID', checked: false },
        { key: 'landingPage', label: 'Landing Page', checked: false },
        { key: 'landingPageId', label: 'Landing Page ID', checked: false },
        { key: 'device', label: 'Device', checked: false },
        { key: 'os', label: 'Operating System', checked: false },
        { key: 'country', label: 'Country (GEO)', checked: false },
        { key: 'date', label: 'Date', checked: false },
        { key: 'month', label: 'Month', checked: false },
        { key: 'week', label: 'Week', checked: false },
        { key: 'year', label: 'Year', checked: false },
        { key: 'category', label: 'Category', checked: false }
    ];

    // Report Options / Metrics - Complete list from Trackier
    metricsOptions = [
        { key: 'uniqueClicks', label: 'Unique Clicks', checked: false },
        { key: 'rejectedClicks', label: 'Rejected Clicks', checked: false },
        { key: 'clicks', label: 'Clicks', checked: false },
        { key: 'grossClicks', label: 'Gross Clicks', checked: true },
        { key: 'approvedConversions', label: 'Approved Conversions', checked: true },
        { key: 'pendingConversions', label: 'Pending Conversions', checked: false },
        { key: 'cancelledConversions', label: 'Cancelled Conversions', checked: false },
        { key: 'rejectedConversions', label: 'Rejected Conversions', checked: false },
        { key: 'sampledConversions', label: 'Sampled Conversions', checked: false },
        { key: 'extendedConversions', label: 'Extended Conversions', checked: false },
        { key: 'grossConversions', label: 'Gross Conversions', checked: false },
        { key: 'conversionRate', label: 'Conversion Rate (CR)', checked: false },
        { key: 'impressions', label: 'Impressions', checked: false },
        { key: 'rejectedImpressions', label: 'Rejected Impressions', checked: false },
        { key: 'campaignPayout', label: 'Campaign Payout', checked: false },
        { key: 'campaignRevenue', label: 'Campaign Revenue', checked: false },
        { key: 'payout', label: 'Payout', checked: true },
        { key: 'pendingPayout', label: 'Pending Payout', checked: false },
        { key: 'extendedPayout', label: 'Extended Payout', checked: false },
        { key: 'cancelledPayout', label: 'Cancelled Payout', checked: false },
        { key: 'rejectedPayout', label: 'Rejected Payout', checked: false },
        { key: 'sampledPayout', label: 'Sampled Payout', checked: false },
        { key: 'grossPayout', label: 'Gross Payout', checked: false },
        { key: 'revenue', label: 'Revenue', checked: true },
        { key: 'pendingRevenue', label: 'Pending Revenue', checked: false },
        { key: 'extendedRevenue', label: 'Extended Revenue', checked: false },
        { key: 'cancelledRevenue', label: 'Cancelled Revenue', checked: false },
        { key: 'rejectedRevenue', label: 'Rejected Revenue', checked: false },
        { key: 'sampledRevenue', label: 'Sampled Revenue', checked: false },
        { key: 'grossRevenue', label: 'Gross Revenue', checked: false },
        { key: 'profit', label: 'Profit', checked: true },
        { key: 'grossProfit', label: 'Gross Profit', checked: false },
        { key: 'epc', label: 'Earning Per Click (EPC)', checked: false },
        { key: 'ctr', label: 'Click Through Rate (CTR)', checked: false },
        { key: 'saleAmount', label: 'Sale Amount', checked: false },
        { key: 'pendingSaleAmount', label: 'Pending Sale Amount', checked: false },
        { key: 'cancelledSaleAmount', label: 'Cancelled Sale Amount', checked: false },
        { key: 'rejectedSaleAmount', label: 'Rejected Sale Amount', checked: false },
        { key: 'sampledSaleAmount', label: 'Sampled Sale Amount', checked: false },
        { key: 'grossSaleAmount', label: 'Gross Sale Amount', checked: false },
        { key: 'netConversions', label: 'Net Conversions', checked: false },
        { key: 'netSaleAmount', label: 'Net Sale Amount', checked: false },
        { key: 'netPayout', label: 'Net Payout', checked: false },
        { key: 'netRevenue', label: 'Net Revenue', checked: false },
        { key: 'netProfit', label: 'Net Profit', checked: false }
    ];

    // Comparison data with period1 and period2 values
    comparisonData: ComparisonRow[] = [
        { publisher: 'Gamobi Pub Dec\'25', publisherId: 'P001', grossClicks: { period1: 1, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'CS Gaming Pub Dec\'25', publisherId: 'P002', grossClicks: { period1: 1, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'Tran Vivian', publisherId: 'P003', grossClicks: { period1: 0, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'CD gaming', publisherId: 'P004', grossClicks: { period1: 1, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'KF Gaming Pub- Nov\'25', publisherId: 'P005', grossClicks: { period1: 2, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'Dynu in Media Pub- Nov\'25', publisherId: 'P006', grossClicks: { period1: 1, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'KA Gaming Pub', publisherId: 'P007', grossClicks: { period1: 2, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'Nomadz', publisherId: 'P008', grossClicks: { period1: 1, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'AL Gaming Publisher Dec\'25', publisherId: 'P009', grossClicks: { period1: 8, period2: 1 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'Leapmobs', publisherId: 'P010', grossClicks: { period1: 552, period2: 255 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'ATUL Kumar', publisherId: 'P011', grossClicks: { period1: 1, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'KA David Pub- Jan\'26', publisherId: 'P012', grossClicks: { period1: 948, period2: 500 }, approvedConversions: { period1: 8, period2: 25 }, payout: { period1: 213, period2: 28 }, revenue: { period1: 225, period2: 8 }, profit: { period1: 0, period2: 26 } },
        { publisher: 'Jack Gaming Pub Nov\'25', publisherId: 'P013', grossClicks: { period1: 6, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } },
        { publisher: 'Click2 Dep Pub Gaming Dec\'25', publisherId: 'P014', grossClicks: { period1: 1, period2: 0 }, approvedConversions: { period1: 0, period2: 0 }, payout: { period1: 0, period2: 0 }, revenue: { period1: 0, period2: 0 }, profit: { period1: 0, period2: 0 } }
    ];

    get filteredData(): ComparisonRow[] {
        if (!this.searchQuery) return this.comparisonData;
        return this.comparisonData.filter(item =>
            item.publisher.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    get filteredGroupByOptions() {
        if (!this.groupBySearch) return this.groupByOptions;
        return this.groupByOptions.filter(opt => opt.label.toLowerCase().includes(this.groupBySearch.toLowerCase()));
    }

    get filteredMetricsOptions() {
        if (!this.metricsSearch) return this.metricsOptions;
        return this.metricsOptions.filter(opt => opt.label.toLowerCase().includes(this.metricsSearch.toLowerCase()));
    }

    calculatePercentage(metric: ComparisonMetric): string {
        if (metric.period2 === 0 && metric.period1 === 0) return '0 %';
        if (metric.period2 === 0 && metric.period1 > 0) return '100 %';
        if (metric.period1 === 0 && metric.period2 > 0) return '-100 %';
        const change = ((metric.period1 - metric.period2) / metric.period2) * 100;
        return change.toFixed(0) + ' %';
    }

    getPercentageClass(metric: ComparisonMetric): string {
        if (metric.period1 > metric.period2) return 'text-success';
        if (metric.period1 < metric.period2) return 'text-danger';
        return 'text-muted';
    }

    formatComparison(metric: ComparisonMetric): string {
        return metric.period1 + ' to ' + metric.period2;
    }

    toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
    closeFilterPanel() { this.showFilterPanel = false; }
    applyFilters() { console.log('Applying filters'); this.closeFilterPanel(); }
    clearGroupBy() { this.groupByOptions.forEach(opt => opt.checked = false); }
    selectAllGroupBy() { this.filteredGroupByOptions.forEach(opt => opt.checked = true); }
    clearMetrics() { this.metricsOptions.forEach(opt => opt.checked = false); }
    selectAllMetrics() { this.filteredMetricsOptions.forEach(opt => opt.checked = true); }
    copyToClipboard() { console.log('Copied to clipboard'); }
    downloadCSV() { console.log('Downloading CSV'); }
    downloadExcel() { console.log('Downloading Excel'); }
    downloadPDF() { console.log('Downloading PDF'); }
    printTable() { window.print(); }
}
