import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-campaign-wizard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './campaign-wizard.component.html',
    styleUrls: ['./campaign-wizard.component.scss']
})
export class CampaignWizardComponent {
    currentStep = 1;
    totalSteps = 5;

    // Step definitions
    steps = [
        { number: 1, title: 'Basic Information', subtitle: 'Setup campaign basic information' },
        { number: 2, title: 'Revenue, Payout & Goals', subtitle: 'Setup revenue, payouts and goals' },
        { number: 3, title: 'Advanced Settings', subtitle: 'Setup campaign advanced settings' },
        { number: 4, title: 'Targeting', subtitle: 'Setup Targeting' },
        { number: 5, title: 'CAP, Creatives, Schedule', subtitle: 'Setup CAP, Creatives, Schedule' }
    ];

    // Step 1: Basic Information
    basicInfo = {
        advertiser: '',
        title: '',
        description: '',
        kpi: '',
        previewUrl: '',
        conversionTracking: 'server-postback',
        defaultCampaignUrl: '',
        status: 'Active',
        devices: ['ALL'],
        operatingSystem: 'ALL',
        category: '',
        externalOfferId: '',
        appName: '',
        appId: '',
        defaultLandingPageName: '',
        thumbnail: null as File | null,
        note: ''
    };

    // Step 2: Revenue, Payout & Goals
    revenuePayoutGoals = {
        objective: 'conversions',
        currency: 'INR',
        defaultGoalName: 'Default',
        geoCoverage: ['ALL'],
        revenue: '',
        payout: ''
    };

    // Additional goals/revenue tiers
    additionalGoals: any[] = [];

    // Step 3: Advanced Settings
    advancedSettings = {
        visibility: 'public',
        allowImpressions: false,
        setAllConversionsPending: false,
        duplicateClickAction: false,
        conversionHoldPeriod: false,
        redirectType: '302',
        allowedTrackingLinkFormat: 'numeric',
        uniqueClickSessionDuration: '',
        conversionFlow: '',
        unsubscribeUrl: '',
        suppressionUrl: ''
    };

    // Step 4: Targeting
    targetingRules: any[] = [];
    showTargetingForm = false;
    newTargeting = {
        variable: 'country',
        logic: 'allow',
        ruleBlockName: '',
        publisherType: 'specific',
        condition: 'matches',
        event: 'all',
        value: ''
    };

    // Step 5: CAP, Creatives, Schedule
    caps: any[] = [];
    showCapForm = false;
    newCap = {
        type: 'gross_conversions',
        publisher: 'all',
        visibility: 'public',
        daily: '',
        monthly: '',
        lifetime: '',
        capOverDelivery: false
    };

    creatives: any[] = [];
    showCreativeForm = false;
    newCreative = {
        type: 'banner',
        title: '',
        file: null as File | null,
        description: '',
        status: 'Active'
    };

    schedule = {
        scheduleStatusChange: false,
        enableTimeTargeting: false,
        timezone: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
        startHour: '0',
        endHour: '0',
        days: [] as string[],
        enableInactiveHours: false
    };

    // Dropdown options
    advertisers = [
        { id: 3, name: 'Demo Advertiser' },
        { id: 4, name: 'App Company' },
        { id: 5, name: 'AdNet' }
    ];

    conversionTrackingOptions = [
        { value: 'server-postback', label: 'Server Postback' },
        { value: 'https-iframe', label: 'HTTPS IFrame Pixel' },
        { value: 'https-image', label: 'HTTPS Image Pixel' }
    ];

    statusOptions = ['Active', 'Paused', 'Pending', 'Deleted'];
    deviceOptions = ['ALL', 'Desktop', 'Mobile', 'Tablet'];
    osOptions = ['ALL', 'Android', 'iOS', 'Windows', 'Mac OS', 'Linux'];
    currencies = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY'];

    objectives = [
        { id: 'conversions', label: 'Conversions (CPA)', icon: 'fa-chart-line' },
        { id: 'sale', label: 'Sale (CPS)', icon: 'fa-shopping-cart' },
        { id: 'app-installs', label: 'App Installs (CPI)', icon: 'fa-mobile-alt' },
        { id: 'leads', label: 'Leads (CPL)', icon: 'fa-user-plus' },
        { id: 'impressions', label: 'Impressions (CPM)', icon: 'fa-eye' },
        { id: 'clicks', label: 'Clicks (CPC)', icon: 'fa-mouse-pointer' }
    ];

    redirectTypes = ['302', '301', 'JS', 'Meta', 'Redirect with Header', 'Click Flow'];
    trackingLinkFormats = [
        { value: 'numeric', label: 'Numeric ID' },
        { value: 'hash', label: 'Hash ID' }
    ];

    targetingVariables = ['Source', 'Country', 'Device', 'OS', 'Browser', 'Language', 'ISP'];
    targetingLogic = ['Allow', 'Deny'];

    capTypes = ['Gross Conversions', 'Unique Conversions', 'Clicks', 'Approved Conversions', 'Payout', 'Revenue'];
    creativeTypes = ['Banner Image', 'HTML', 'Native', 'Video', 'Text'];

    timezones = [
        '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
        '(GMT+00:00) UTC',
        '(GMT-05:00) Eastern Time (US & Canada)',
        '(GMT-08:00) Pacific Time (US & Canada)',
        '(GMT+01:00) Amsterdam, Berlin, Rome, Paris'
    ];

    daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    urlTokens = [
        '{click_id}', '{campaign_id}', '{pub_id}', '{sub_id}', '{goal_id}',
        '{advertiser_id}', '{device}', '{os}', '{country}', '{city}'
    ];

    // Countries for geo coverage
    countries = [
        { code: 'ALL', name: 'ALL Countries' },
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'IN', name: 'India' },
        { code: 'CA', name: 'Canada' },
        { code: 'AU', name: 'Australia' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'JP', name: 'Japan' },
        { code: 'BR', name: 'Brazil' }
    ];

    // Navigation methods
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    goToStep(step: number) {
        if (step >= 1 && step <= this.totalSteps) {
            this.currentStep = step;
        }
    }

    // Step 1 methods
    addToken(token: string) {
        this.basicInfo.defaultCampaignUrl += token;
    }

    onThumbnailChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.basicInfo.thumbnail = input.files[0];
        }
    }

    // Step 2 methods
    addRevenuePayout() {
        this.additionalGoals.push({
            geoCoverage: ['ALL'],
            revenue: '',
            payout: ''
        });
    }

    removeRevenuePayout(index: number) {
        this.additionalGoals.splice(index, 1);
    }

    // Step 4 methods
    toggleTargetingForm() {
        this.showTargetingForm = !this.showTargetingForm;
    }

    addTargeting() {
        this.targetingRules.push({ ...this.newTargeting });
        this.newTargeting = {
            variable: 'country',
            logic: 'allow',
            ruleBlockName: '',
            publisherType: 'specific',
            condition: 'matches',
            event: 'all',
            value: ''
        };
        this.showTargetingForm = false;
    }

    removeTargeting(index: number) {
        this.targetingRules.splice(index, 1);
    }

    // Step 5 methods
    toggleCapForm() {
        this.showCapForm = !this.showCapForm;
    }

    addCap() {
        this.caps.push({ ...this.newCap });
        this.newCap = {
            type: 'gross_conversions',
            publisher: 'all',
            visibility: 'public',
            daily: '',
            monthly: '',
            lifetime: '',
            capOverDelivery: false
        };
        this.showCapForm = false;
    }

    removeCap(index: number) {
        this.caps.splice(index, 1);
    }

    toggleCreativeForm() {
        this.showCreativeForm = !this.showCreativeForm;
    }

    addCreative() {
        this.creatives.push({ ...this.newCreative });
        this.newCreative = {
            type: 'banner',
            title: '',
            file: null,
            description: '',
            status: 'Active'
        };
        this.showCreativeForm = false;
    }

    removeCreative(index: number) {
        this.creatives.splice(index, 1);
    }

    onCreativeFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.newCreative.file = input.files[0];
        }
    }

    // Finish wizard
    finishWizard() {
        console.log('Creating campaign:', {
            basicInfo: this.basicInfo,
            revenuePayoutGoals: this.revenuePayoutGoals,
            additionalGoals: this.additionalGoals,
            advancedSettings: this.advancedSettings,
            targetingRules: this.targetingRules,
            caps: this.caps,
            creatives: this.creatives,
            schedule: this.schedule
        });
        alert('Campaign created successfully!');
    }
}
