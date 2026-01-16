import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-edit-postback',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './edit-postback.component.html',
    styleUrls: ['./edit-postback.component.scss']
})
export class EditPostbackComponent implements OnInit {
    postbackId: number = 0;

    // Form data
    eventType: string = 'CONVERSION';
    selectedPublisher: string = '';
    selectedCampaign: string = 'ALL';
    pixelType: string = 'Postback URL';
    postbackUrl: string = '';
    privacyPostbackUrl: string = '';
    status: string = 'Active';
    allowedConversionStatus: string[] = ['Approved'];

    // Advanced Options
    dontFireIfPayoutZero: boolean = false;
    skipParamsEncoding: string = '';
    httpMethod: string = 'GET';
    httpHeaders: Array<{ key: string, value: string }> = [];
    requestBody: string = '';
    showAdvancedOptions: boolean = false;

    // Timeline modal
    showTimelineModal: boolean = false;
    selectedTimelineData: any = null;

    // Options
    publisherOptions = [
        { id: '43', name: 'shikhar Chouhan' },
        { id: '45', name: 'shikhar Chouhan' },
        { id: '35', name: 'Ravi Squad Media' },
        { id: '51', name: 'Vivek Growmore' },
        { id: '47', name: 'Vikas' },
        { id: '57', name: 'Free Foketi' },
        { id: '64', name: 'Ajeet' },
        { id: '70', name: 'Redeffox' },
        { id: '65', name: 'Divyanshu' },
        { id: '34', name: 'Ram Spaagds' }
    ];

    campaignOptions = [
        { id: 'ALL', name: 'All Campaigns' },
        { id: '12345', name: 'Spingranny- CA- Jan\'26' },
        { id: '12346', name: 'Winner Casino UK' },
        { id: '12347', name: 'Bet O Bet NL' },
        { id: '12348', name: 'Play Ojo AU' },
        { id: '12349', name: 'Monster Casino DE' }
    ];

    pixelTypeOptions = [
        'Postback URL',
        'HTML Pixel',
        'JavaScript Pixel'
    ];

    statusOptions = ['Active', 'Paused'];

    conversionStatusOptions = [
        { value: 'Approved', label: 'Approved' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Rejected', label: 'Rejected' }
    ];

    urlTokens = [
        '{p1}', '{p2}', '{click_id}', '{aff_username}',
        '{publisher_id}', '{ip}', '{country_id}'
    ];

    // Timeline data
    timeline = [
        {
            action: 'created',
            user: 'Admin',
            date: '2026-01-15 10:30:00'
        }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.postbackId = +params['id'];
            this.loadPostback();
        });
    }

    loadPostback(): void {
        // Mock data loading
        this.selectedPublisher = '43';
        this.selectedCampaign = 'ALL';
        this.postbackUrl = 'https://example.com/postback?click_id={click_id}&status={status}';
    }

    insertToken(token: string): void {
        this.postbackUrl += token;
    }

    toggleConversionStatus(status: string): void {
        const index = this.allowedConversionStatus.indexOf(status);
        if (index > -1) {
            this.allowedConversionStatus.splice(index, 1);
        } else {
            this.allowedConversionStatus.push(status);
        }
    }

    isConversionStatusSelected(status: string): boolean {
        return this.allowedConversionStatus.includes(status);
    }

    addHttpHeader(): void {
        this.httpHeaders.push({ key: '', value: '' });
    }

    removeHttpHeader(index: number): void {
        this.httpHeaders.splice(index, 1);
    }

    openTimelineDetails(timelineItem: any): void {
        this.selectedTimelineData = {
            organizationId: '66865c2f9cbcec186b041184',
            user: `(ID: ${this.selectedPublisher}) ${this.publisherOptions.find(p => p.id === this.selectedPublisher)?.name || 'Unknown'}`,
            event: this.eventType.toLowerCase(),
            data: this.postbackUrl,
            type: 'url',
            allowedConversionStatus: this.allowedConversionStatus.join(', '),
            id: this.postbackId.toString(),
            live: this.status === 'Active' ? 'true' : 'false'
        };
        this.showTimelineModal = true;
    }

    closeTimelineModal(): void {
        this.showTimelineModal = false;
        this.selectedTimelineData = null;
    }

    save(): void {
        console.log('Saving postback...', {
            eventType: this.eventType,
            publisher: this.selectedPublisher,
            campaign: this.selectedCampaign,
            pixelType: this.pixelType,
            postbackUrl: this.postbackUrl,
            status: this.status,
            advancedOptions: {
                dontFireIfPayoutZero: this.dontFireIfPayoutZero,
                skipParamsEncoding: this.skipParamsEncoding,
                httpMethod: this.httpMethod,
                httpHeaders: this.httpHeaders,
                requestBody: this.requestBody
            }
        });
        this.router.navigate(['/publishers/postbacks-pixels']);
    }

    cancel(): void {
        this.router.navigate(['/publishers/postbacks-pixels']);
    }
}
