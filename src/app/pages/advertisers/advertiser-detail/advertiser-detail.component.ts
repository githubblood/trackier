import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AdvertiserService } from '../../../core/services/advertiser.service';
import { AdvertiserDetail } from '../../../core/models/advertiser.model';

@Component({
    selector: 'app-advertiser-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './advertiser-detail.component.html',
    styleUrls: ['./advertiser-detail.component.scss']
})
export class AdvertiserDetailComponent implements OnInit {
    advertiserId: number = 0;
    advertiser: AdvertiserDetail | null = null;
    loading: boolean = false;
    error: string = '';

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
        private router: Router,
        private advertiserService: AdvertiserService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.advertiserId = +params['id'];
            this.loadAdvertiser();
        });
    }

    loadAdvertiser(): void {
        this.loading = true;
        this.error = '';

        this.advertiserService.getAdvertiserById(this.advertiserId).subscribe({
            next: (response) => {
                console.log('Advertiser Details API Response:', response);

                if (response && response.data) {
                    this.advertiser = response.data;

                    // Set security token and postback URL if available
                    this.securityToken = this.advertiser.uid || '';
                    this.postbackUrl = `https://spaxads.trackier.co/acquisition?click_id={click_id}&security_token=${this.securityToken}`;

                    // Set other default values
                    this.redirectType = 'Default';
                    this.emailNotifications = false;
                    this.currency = this.advertiser.country?.toLowerCase() === 'india' ? 'INR' : 'USD';
                    this.locale = 'en';

                    // Generate pixel code
                    this.pixelCode = `<img src="https://spaxads.gotrackier.com/pixel?av=${this.advertiser.uid}">`;
                } else {
                    this.error = response.error?.message || 'Failed to load advertiser details';
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading advertiser details:', err);
                this.error = 'Failed to load advertiser details. Please try again.';
                this.loading = false;
            }
        });
    }

    disableAdvertiser(): void {
        console.log('Disabling advertiser:', this.advertiserId);
        // Call API to disable
    }

    editAdvertiser(): void {
        this.router.navigate(['/advertisers/edit', this.advertiserId]);
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
