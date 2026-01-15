import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-campaign-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './campaign-detail.component.html',
    styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {
    campaign: any = {
        id: '941',
        title: 'Boho- CA- Dec\'25',
        objective: 'Conversions',
        visibility: 'Public',
        advertiser: { id: '529', name: 'Gulfstream Dec\'25' },
        status: 'Active',
        currency: 'INR',
        previewUrl: '',
        url: 'https://traylpax.com/click?pid=62&offer_id=834284176&click_id',
        devices: 'All',
        os: 'all',
        created: 'December 5, 2025 at 5:26 pm',
        activatedDate: 'December 5, 2025 at 5:26 pm',
        uniqueId: '6932c870839f0556b76497b2'
    };

    // Revenue, Payout and Goals
    payoutGoals: any[] = [
        { goal: 'Default', goalId: '', country: 'CA', countryCode: 'CA', region: 'ALL', revenue: '₹ 0.1', payout: '₹ 0.1' },
        { goal: 'FTD', goalId: 'ft5c6a2de97d6ed64f0e', country: 'ALL', countryCode: '', region: 'ALL', revenue: '₹ 1', payout: '₹ 1' },
        { goal: 'registration', goalId: 'r8r60cd4e0512c6fe9a2c0e4', country: 'ALL', countryCode: '', region: 'ALL', revenue: '₹ 0.1', payout: '₹ 0.1' }
    ];

    // Tracking Link
    selectedPublisher = '';
    publishers: any[] = [
        { id: '568', name: 'Gasmobi Pub Gaming Jan\'26' },
        { id: '532', name: 'Gasmobi Pub Dec\'25' }
    ];
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
    generatedPostback = 'https://spaxads.trackier.co/acquisition?click_id=CLICK_ID&security_token=fl22a616007261559f12e';
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
            clicks: 296.0,
            revenue: 3.85,
            conversions: 20,
            payout: 3.85,
            profit: 0.00,
            impressions: 0.00
        }
    };

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadCampaign(id);
        }
    }

    loadCampaign(id: string): void {
        // In a real app, this would fetch from an API
        console.log('Loading campaign:', id);
    }

    cloneCampaign(): void {
        console.log('Cloning campaign');
    }

    downloadCampaign(): void {
        console.log('Downloading campaign');
    }

    editCampaign(): void {
        console.log('Editing campaign');
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
        if (this.selectedPublisher) {
            this.generatedLink = `https://traylpax.com/p/${this.selectedPublisher}?o=${this.campaign.id}`;
        }
    }

    copyLink(): void {
        navigator.clipboard.writeText(this.generatedLink);
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
}
