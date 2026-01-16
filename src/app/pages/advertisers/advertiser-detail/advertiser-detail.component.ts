import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

interface Advertiser {
    id: number;
    name: string;
    email: string;
    company: string;
    status: string;
    createdDate: string;
    hashId: string;
    manager: string;
    securityToken: string;
    postbackUrl: string;
    redirectType: string;
    emailNotifications: boolean;
    currency: string;
    locale: string;
}

@Component({
    selector: 'app-advertiser-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './advertiser-detail.component.html',
    styleUrls: ['./advertiser-detail.component.scss']
})
export class AdvertiserDetailComponent implements OnInit {
    advertiserId: number = 0;
    advertiser: Advertiser | null = null;

    // Settings
    redirectType: string = 'Default';
    emailNotifications: boolean = false;
    currency: string = 'INR';
    locale: string = 'en';

    // Postback
    securityToken: string = '';
    postbackUrl: string = '';
    validationInput: string = '';

    // Global Pixel
    pixelType: string = 'Image';
    pixelCode: string = '';
    appendKey: string = '';
    appendValue: string = '';

    // Notes
    newNote: string = '';
    notes: Array<{ message: string, date: string, user: string }> = [];

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
        this.advertiser = {
            id: this.advertiserId,
            name: 'Betmen Affiliates- Jan\'26',
            email: '1234560718@gmail.com',
            company: 'Betmen Affiliates- Jan\'26',
            status: 'Active',
            createdDate: 'January 9, 2026 at 4:30 pm',
            hashId: '6966dffbeb6b75816ad7206bb',
            manager: 'David Arora',
            securityToken: '5b5d7f9c22dd27f16ec',
            postbackUrl: 'https://spaxads.trackier.co/acquisition?click_id={click_id}&security_token=5b5d7f6220d327f1bec',
            redirectType: 'Default',
            emailNotifications: false,
            currency: 'INR',
            locale: 'en'
        };

        this.securityToken = this.advertiser.securityToken;
        this.postbackUrl = this.advertiser.postbackUrl;
        this.redirectType = this.advertiser.redirectType;
        this.emailNotifications = this.advertiser.emailNotifications;
        this.currency = this.advertiser.currency;
        this.locale = this.advertiser.locale;

        this.pixelCode = `<img src="https://spaxads.gotrackier.com/pixel?av=6960cf9ebbd670816ad7206bb">`;
    }

    disableAdvertiser(): void {
        console.log('Disabling advertiser:', this.advertiserId);
        // Call API to disable
    }

    editAdvertiser(): void {
        console.log('Editing advertiser:', this.advertiserId);
        // Open edit modal or navigate to edit page
    }

    editSettings(): void {
        console.log('Editing settings');
    }

    validatePostback(): void {
        console.log('Validating postback:', this.validationInput);
        // Call API to validate
    }

    debugPostback(): void {
        this.router.navigate(['/advertisers/postback-hits']);
    }

    generateApiKey(): void {
        console.log('Generating API key');
    }

    addNote(): void {
        if (this.newNote.trim()) {
            this.notes.push({
                message: this.newNote,
                date: new Date().toLocaleString(),
                user: 'Admin'
            });
            this.newNote = '';
        }
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Active': return 'status-active';
            case 'Pending': return 'status-pending';
            case 'Disabled': return 'status-disabled';
            default: return '';
        }
    }

    goBack(): void {
        this.router.navigate(['/advertisers/manage']);
    }
}
