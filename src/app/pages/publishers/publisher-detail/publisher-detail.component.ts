import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Publisher {
    id: number;
    name: string;
    email: string;
    company: string;
    country: string;
    countryCode: string;
    status: string;
    created: string;
    hashId: string;
    publisherManager: string;
    publisherManagerId: string;
    currency: string;
    emailNotifications: boolean;
    locale: string;
    apiKeyGenerated: boolean;
}

@Component({
    selector: 'app-publisher-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './publisher-detail.component.html',
    styleUrls: ['./publisher-detail.component.scss']
})
export class PublisherDetailComponent implements OnInit {
    publisherId: string = '';
    noteText: string = '';
    selectedCampaign: string = '';
    generatedLink: string = '';

    // Tracking Link Options
    trackingOptions = {
        addSubIds: false,
        addSource: false,
        addDeepLink: false,
        impressionPixel: false,
        changeTrackingDomain: false
    };

    // Sample Publisher Data
    publisher: Publisher = {
        id: 532,
        name: 'Gasmobi Pub Dec\'25',
        email: 'gasmobi123@gmail.com',
        company: 'Gasmobi Pub Dec\'25',
        country: 'IN',
        countryCode: 'IN',
        status: 'Active',
        created: 'December 8, 2025 at 1:33 pm',
        hashId: '693686637b7f4219b22c492',
        publisherManager: 'David Arora',
        publisherManagerId: 'MGR-001',
        currency: 'INR',
        emailNotifications: true,
        locale: 'en',
        apiKeyGenerated: false
    };

    // Sample Campaigns for dropdown
    campaigns = [
        { id: 913, name: 'Slotozen Casino- CA- Dec\'25' },
        { id: 914, name: 'Pistolo- DE- Nov\'25' },
        { id: 919, name: 'Ivybet- CA- Nov\'25' },
        { id: 940, name: 'Wild Robin- NL- Nov\'25' }
    ];

    // Account Users (empty for now)
    accountUsers: any[] = [];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.publisherId = this.route.snapshot.paramMap.get('id') || '';
        // In real app, fetch publisher data based on ID
    }

    getFlagEmoji(code: string): string {
        const flagMap: { [key: string]: string } = {
            'CA': '🇨🇦', 'DE': '🇩🇪', 'NL': '🇳🇱', 'US': '🇺🇸', 'IN': '🇮🇳', 'UK': '🇬🇧'
        };
        return flagMap[code] || '🏳️';
    }

    generateApiKey(): void {
        this.publisher.apiKeyGenerated = true;
        console.log('API Key generated');
    }

    addNote(): void {
        if (this.noteText.trim()) {
            console.log('Note added:', this.noteText);
            this.noteText = '';
        }
    }

    generateTrackingLink(): void {
        if (this.selectedCampaign) {
            this.generatedLink = `https://track.example.com/click?cid=${this.selectedCampaign}&pid=${this.publisher.id}`;
        }
    }

    clonePublisher(): void {
        console.log('Cloning publisher:', this.publisher.id);
    }

    disablePublisher(): void {
        console.log('Disabling publisher:', this.publisher.id);
    }

    editPublisher(): void {
        console.log('Editing publisher:', this.publisher.id);
    }

    editSettings(): void {
        console.log('Editing settings');
    }

    addUser(): void {
        console.log('Adding user');
    }

    viewPerformanceReport(): void {
        console.log('Viewing performance report');
    }

    manageLinks(): void {
        console.log('Managing links');
    }
}
