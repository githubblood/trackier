import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

interface TimelineEntry {
    user: string;
    action: string;
    timestamp: string;
    ip: string;
    details?: any;
    type?: 'created' | 'updated';
}

interface TimelineDetail {
    field: string;
    value?: string;
    oldValue?: string;
    newValue?: string;
}

@Component({
    selector: 'app-edit-advertiser',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './edit-advertiser.component.html',
    styleUrls: ['./edit-advertiser.component.scss']
})
export class EditAdvertiserComponent implements OnInit {
    advertiserId: number = 0;

    // Form fields
    name: string = '';
    email: string = '';
    phone: string = '';
    skype: string = '';
    tags: string[] = [];
    companyName: string = '';
    status: string = 'Active';
    address: string = '';
    country: string = 'ALL';
    state: string = '';
    city: string = '';
    zipcode: string = '';
    taxId: string = '';
    referenceId: string = '';
    accountManager: string[] = [];
    changePassword: string = '';

    // Dropdown options
    statusOptions = ['Active', 'Pending', 'Disabled', 'Rejected', 'Banned'];

    countryOptions = [
        { code: 'ALL', name: 'ALL' },
        { code: 'US', name: 'United States' },
        { code: 'IN', name: 'India' },
        { code: 'UK', name: 'United Kingdom' },
        { code: 'CA', name: 'Canada' }
    ];

    tagOptions = [
        'Premium',
        'VIP',
        'New',
        'High Volume',
        'Test'
    ];

    managerOptions = [
        { id: 1, name: 'David Arora', role: 'Admin' },
        { id: 2, name: 'Sanjay', role: 'Manager' },
        { id: 3, name: 'Admin', role: 'Admin' }
    ];

    // Timeline
    timeline: TimelineEntry[] = [];

    // Timeline details modal
    showTimelineModal: boolean = false;
    selectedTimelineDetails: TimelineDetail[] = [];
    selectedTimelineType: 'created' | 'updated' = 'created';

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.advertiserId = +params['id'];
            this.loadAdvertiser();
        });
    }

    loadAdvertiser(): void {
        // Mock data - would come from API
        this.name = 'Betmen Affiliates- Jan\'26';
        this.email = '1234560718@gmail.com';
        this.phone = '';
        this.skype = '';
        this.tags = [];
        this.companyName = 'Betmen Affiliates- Jan\'26';
        this.status = 'Active';
        this.address = '';
        this.country = 'ALL';
        this.state = '';
        this.city = '';
        this.zipcode = '';
        this.taxId = '';
        this.referenceId = '';
        this.accountManager = ['David Arora'];

        // Load timeline
        this.timeline = [
            {
                user: 'Betmen Affiliates- Jan\'26',
                action: 'A user was created Name: Betmen Affiliates- Jan\'26, Email: id_560, Email Address: 1234560718@gmail.com, Company: Betmen Affiliates- Jan\'26, Status: Active, Created At: Jan 9, 2026 at 4:30 pm, IP: 49.36.161.20 on January 9, 2026 at 4:30 pm',
                timestamp: 'Jan 9, 2026 at 4:30 pm',
                ip: '49.36.161.20',
                type: 'created'
            },
            {
                user: 'Betmen Affiliates- Jan\'26',
                action: 'A user was updated Name changed from to Betmen Affiliates- Jan\'26, Skype_Id changed from to , Email changed from to 1234560718@gmail.com, Real changed from to , Company_Name changed from to , Status changed from to active, IP: 49.36.161.20 on January 9, 2026 at 4:30 pm',
                timestamp: 'Jan 9, 2026 at 4:30 pm',
                ip: '49.36.161.20',
                type: 'updated'
            }
        ];
    }

    toggleTag(tag: string): void {
        const index = this.tags.indexOf(tag);
        if (index > -1) {
            this.tags.splice(index, 1);
        } else {
            this.tags.push(tag);
        }
    }

    toggleManager(managerName: string): void {
        const index = this.accountManager.indexOf(managerName);
        if (index > -1) {
            this.accountManager.splice(index, 1);
        } else {
            this.accountManager.push(managerName);
        }
    }

    save(): void {
        console.log('Saving advertiser:', {
            id: this.advertiserId,
            name: this.name,
            email: this.email,
            phone: this.phone,
            skype: this.skype,
            tags: this.tags,
            companyName: this.companyName,
            status: this.status,
            address: this.address,
            country: this.country,
            state: this.state,
            city: this.city,
            zipcode: this.zipcode,
            taxId: this.taxId,
            referenceId: this.referenceId,
            accountManager: this.accountManager,
            changePassword: this.changePassword
        });

        // Navigate back to manage advertisers
        this.router.navigate(['/advertisers/manage']);
    }

    cancel(): void {
        this.router.navigate(['/advertisers/manage']);
    }

    showTimelineDetails(entry: TimelineEntry): void {
        this.selectedTimelineType = entry.type || 'created';

        if (entry.type === 'created') {
            // Mock data for created event
            this.selectedTimelineDetails = [
                { field: 'Id', value: 'e960cf8a4b0f3f4a5f2006b0' },
                { field: 'Deleted', value: 'false' },
                { field: 'Display Id', value: '560' },
                { field: 'Email', value: '1234560718@gmail.com' },
                { field: 'Htl', value: 'false' },
                { field: 'Is Demo Access', value: 'false' },
                { field: 'Live', value: 'false' },
                { field: 'Login Attempt', value: '0' },
                { field: 'Meta', value: '{"security_token":"f7e4e0e7c2b8e7f4e2a0d7f4e0e7c2b8"}' },
                { field: 'Name', value: 'Betmen Affiliates- Jan\'26' },
                { field: 'Organization Id', value: '668b5c2f9cbec1b60e5b7a9b' },
                { field: 'Owner', value: 'false' },
                { field: 'Region', value: '{"address":"","city":"","country":"IN","lat":"28.7041","lng":"77.1025","state":"","zipcode":""}' },
                { field: 'Status', value: 'disabled' },
                { field: 'Type', value: 'advertiser' },
                { field: 'Unsubscribe', value: 'false' }
            ];
        } else {
            // Mock data for updated event
            this.selectedTimelineDetails = [
                { field: 'Id', oldValue: 'No Data', newValue: 'e960cf8a4b0f3f4a5f2006b0' },
                { field: 'Conversion KPI List', oldValue: 'No Data', newValue: '_jk_source, method, sub_landing_id, sub_id, sub_id_1, sub_id_2, sub_id_3, sub_id_4, sub_id_5, sub_offer_id, offer_id, advertiser_id, campaign_id, currency, goal_id' },
                { field: 'Display Id', oldValue: 'No Data', newValue: '560' },
                { field: 'Email', oldValue: 'No Data', newValue: '1234560718@gmail.com' },
                { field: 'Report Grouping Map', oldValue: 'No Data', newValue: 'adid_campaign_id, campaign_lang_id, campaign_id, offer_id, advertiser_id, currency, goal_id' },
                { field: 'Live', oldValue: 'No Data', newValue: 'true' },
                { field: 'Meta', oldValue: 'No Data', newValue: '{"security_token":"f7e4e0e7c2b8e7f4e2a0d7f4e0e7c2b8"}' },
                { field: 'Mids', oldValue: 'No Data', newValue: '668b5c2f9cbec1b60e5b7a9b' },
                { field: 'Name', oldValue: 'No Data', newValue: 'Betmen Affiliates- Jan\'26' },
                { field: 'Organization Id', oldValue: 'No Data', newValue: '668b5c2f9cbec1b60e5b7a9b' },
                { field: 'Region', oldValue: '{"address":"","city":"","country":"","lat":"","lng":"","state":"","zipcode":""}', newValue: 'No Change' },
                { field: 'Status', oldValue: 'No Data', newValue: 'active' },
                { field: 'Type', oldValue: 'No Data', newValue: 'advertiser' }
            ];
        }

        this.showTimelineModal = true;
    }

    closeTimelineModal(): void {
        this.showTimelineModal = false;
        this.selectedTimelineDetails = [];
    }
}
