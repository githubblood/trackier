import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../../../core/services/campaign.service';
import { CampaignDetail, CampaignGoalDetail, CampaignAccess } from '../../../core/models/campaign.model';

@Component({
    selector: 'app-campaign-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './campaign-detail.component.html',
    styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {
    // Loading state
    loading = true;
    error: string | null = null;

    // Campaign data from API
    campaign: CampaignDetail | null = null;

    // Default campaign structure for initial rendering
    defaultCampaign = {
        id: 0,
        uid: '',
        advertiser_id: 0,
        advertiser_name: '',
        name: '',
        title: '',
        description: '',
        url: '',
        tracking_url: '',
        preview_url: '',
        terms_conditions: '',
        currency: 'INR',
        device: 'all',
        geo_coverage: 'global',
        visibility: 'public' as const,
        total_clicks: 0,
        status: 'active' as const,
        created_at: '',
        updated_at: null,
        goals: [] as CampaignGoalDetail[],
        access: [] as CampaignAccess[]
    };

    // Tracking Link
    selectedPublisher = '';
    publishers: any[] = [];
    generatedLink = '';
    trackingOptions = {
        addTrackingParam: false,
        addSource: false,
        changeTrackingDomain: false,
        addDeepLink: false,
        googleAdsLink: false,
        generateShortLink: false
    };

    // Settings
    settings = {
        globalCap: { type: 'uniqueClicks', daily: 150 },
        impressionTracking: 'Not Enabled',
        attributionWindow: 'Lifetime'
    };

    // Targeting
    targeting = {
        advancedRules: 'None'
    };

    // Conversion Tracking
    selectedPostbackType = 'Campaign Advertiser Global Postback';
    generatedPostback = '';
    postbackOptions = {
        passMacros: false,
        coupon: false,
        orderId: false,
        productSku: false,
        addGoalValue: true,
        addGoalId: false,
        changeDomain: false
    };
    selectedGoalValue = '';

    // Block Publishers
    blockedPublishers: string[] = [];

    // Notes
    noteText = '';

    // Performance Report
    performanceData = {
        dateRange: { start: '2026-01-08', end: '2026-01-15' },
        metrics: {
            clicks: 0,
            revenue: 0,
            conversions: 0,
            payout: 0,
            profit: 0,
            impressions: 0
        }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private campaignService: CampaignService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadCampaign(id);
        } else {
            this.error = 'Campaign ID not found';
            this.loading = false;
        }
    }

    loadCampaign(id: string): void {
        this.loading = true;
        this.error = null;

        this.campaignService.getCampaignDetail(id).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.campaign = response.data;

                    // Update publishers from access list
                    this.publishers = response.data.access.map(a => ({
                        id: a.publisher_id.toString(),
                        name: a.publisher_name
                    }));

                    // Generate postback URL with campaign UID
                    this.generatedPostback = `https://spaxads.trackier.co/acquisition?click_id=CLICK_ID&security_token=${response.data.uid}`;

                    // Update performance data with total clicks
                    this.performanceData.metrics.clicks = response.data.total_clicks || 0;
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load campaign', err);
                this.error = 'Failed to load campaign details. Please try again.';
                this.loading = false;
            }
        });
    }

    // Helper to get campaign data safely
    get campaignData(): CampaignDetail {
        return this.campaign || this.defaultCampaign;
    }

    // Format date for display
    formatDate(dateString: string | null | undefined): string {
        if (!dateString) return '-';
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

    // Get status class for styling
    getStatusClass(status: string): string {
        const statusLower = status?.toLowerCase() || '';
        switch (statusLower) {
            case 'active': return 'status-badge status-active';
            case 'paused': return 'status-badge status-paused';
            case 'archived': return 'status-badge status-archived';
            case 'pending': return 'status-badge status-pending';
            case 'expired': return 'status-badge status-expired';
            default: return 'status-badge';
        }
    }

    // Get visibility display text
    getVisibilityDisplay(visibility: string): string {
        switch (visibility?.toLowerCase()) {
            case 'public': return 'Public';
            case 'private': return 'Private';
            case 'need_permission': return 'Need Permission';
            default: return visibility || '-';
        }
    }

    // Get device display text
    getDeviceDisplay(device: string): string {
        switch (device?.toLowerCase()) {
            case 'all': return 'All';
            case 'mobile': return 'Mobile';
            case 'desktop': return 'Desktop';
            case 'tablet': return 'Tablet';
            default: return device || '-';
        }
    }

    // Get geo coverage display
    getGeoDisplay(geo: string | string[]): string {
        if (Array.isArray(geo)) {
            return geo.join(', ').toUpperCase();
        }
        return geo?.toUpperCase() || '-';
    }

    cloneCampaign(): void {
        console.log('Cloning campaign');
    }

    downloadCampaign(): void {
        console.log('Downloading campaign');
    }

    editCampaign(): void {
        if (this.campaign) {
            this.router.navigate(['/campaigns/edit', this.campaign.id]);
        }
    }

    managePayoutsAndGoals(): void {
        console.log('Managing payouts and goals');
    }

    viewReport(): void {
        console.log('Viewing report');
    }

    manageLinks(): void {
        console.log('Managing links');
    }

    generateTrackingLink(): void {
        if (this.selectedPublisher && this.campaign) {
            this.generatedLink = `https://traylpax.com/p/${this.selectedPublisher}?o=${this.campaign.id}`;
        }
    }

    copyLink(): void {
        const textToCopy = this.generatedLink || this.campaign?.url || '';
        navigator.clipboard.writeText(textToCopy);
    }

    editTargeting(): void {
        console.log('Editing targeting');
    }

    editSettings(): void {
        console.log('Editing settings');
    }

    copyPostback(): void {
        navigator.clipboard.writeText(this.generatedPostback);
    }

    saveBlockedPublishers(): void {
        console.log('Saving blocked publishers:', this.blockedPublishers);
    }

    addNote(): void {
        console.log('Adding note:', this.noteText);
    }

    uploadCreative(): void {
        console.log('Uploading creative');
    }

    downloadCreatives(): void {
        console.log('Downloading creatives');
    }

    getFlagEmoji(countryCode: string): string {
        if (!countryCode) return '';
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

    // Format currency value
    formatCurrency(value: string | number, currency?: string): string {
        const curr = currency || this.campaign?.currency || 'INR';
        const numValue = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(numValue)) return '-';

        const symbol = curr === 'INR' ? '₹' : curr === 'USD' ? '$' : curr;
        return `${symbol} ${numValue.toFixed(2)}`;
    }
}
