import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdvertiserService } from '../../../core/services/advertiser.service';
import { AdvertiserDetail } from '../../../core/models/advertiser.model';

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
    imports: [CommonModule, FormsModule, RouterModule, NgSelectModule],
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
    status: string = 'active';
    address: string = '';
    country: string = 'ALL';
    state: string = '';
    city: string = '';
    zipcode: string = '';
    taxId: string = '';
    referenceId: string = '';
    accountManager: string[] = [];
    changePassword: string = '';

    // API-required fields (hidden from UI but needed for API)
    website: string = '';
    industry: string = '';

    // State
    loading: boolean = false;
    saving: boolean = false;
    error: string = '';

    // Dropdown options
    statusOptions = ['active', 'pending', 'disabled', 'rejected', 'banned'];

    countryOptions = [
        { code: 'ALL', name: 'ALL' },
        { code: 'AF', name: 'Afghanistan' },
        { code: 'AL', name: 'Albania' },
        { code: 'DZ', name: 'Algeria' },
        { code: 'AD', name: 'Andorra' },
        { code: 'AO', name: 'Angola' },
        { code: 'AG', name: 'Antigua and Barbuda' },
        { code: 'AR', name: 'Argentina' },
        { code: 'AM', name: 'Armenia' },
        { code: 'AU', name: 'Australia' },
        { code: 'AT', name: 'Austria' },
        { code: 'AZ', name: 'Azerbaijan' },
        { code: 'BS', name: 'Bahamas' },
        { code: 'BH', name: 'Bahrain' },
        { code: 'BD', name: 'Bangladesh' },
        { code: 'BB', name: 'Barbados' },
        { code: 'BY', name: 'Belarus' },
        { code: 'BE', name: 'Belgium' },
        { code: 'BZ', name: 'Belize' },
        { code: 'BJ', name: 'Benin' },
        { code: 'BT', name: 'Bhutan' },
        { code: 'BO', name: 'Bolivia' },
        { code: 'BA', name: 'Bosnia and Herzegovina' },
        { code: 'BW', name: 'Botswana' },
        { code: 'BR', name: 'Brazil' },
        { code: 'BN', name: 'Brunei' },
        { code: 'BG', name: 'Bulgaria' },
        { code: 'BF', name: 'Burkina Faso' },
        { code: 'BI', name: 'Burundi' },
        { code: 'CV', name: 'Cabo Verde' },
        { code: 'KH', name: 'Cambodia' },
        { code: 'CM', name: 'Cameroon' },
        { code: 'CA', name: 'Canada' },
        { code: 'CF', name: 'Central African Republic' },
        { code: 'TD', name: 'Chad' },
        { code: 'CL', name: 'Chile' },
        { code: 'CN', name: 'China' },
        { code: 'CO', name: 'Colombia' },
        { code: 'KM', name: 'Comoros' },
        { code: 'CG', name: 'Congo' },
        { code: 'CR', name: 'Costa Rica' },
        { code: 'HR', name: 'Croatia' },
        { code: 'CU', name: 'Cuba' },
        { code: 'CY', name: 'Cyprus' },
        { code: 'CZ', name: 'Czech Republic' },
        { code: 'CD', name: 'Democratic Republic of the Congo' },
        { code: 'DK', name: 'Denmark' },
        { code: 'DJ', name: 'Djibouti' },
        { code: 'DM', name: 'Dominica' },
        { code: 'DO', name: 'Dominican Republic' },
        { code: 'EC', name: 'Ecuador' },
        { code: 'EG', name: 'Egypt' },
        { code: 'SV', name: 'El Salvador' },
        { code: 'GQ', name: 'Equatorial Guinea' },
        { code: 'ER', name: 'Eritrea' },
        { code: 'EE', name: 'Estonia' },
        { code: 'SZ', name: 'Eswatini' },
        { code: 'ET', name: 'Ethiopia' },
        { code: 'FJ', name: 'Fiji' },
        { code: 'FI', name: 'Finland' },
        { code: 'FR', name: 'France' },
        { code: 'GA', name: 'Gabon' },
        { code: 'GM', name: 'Gambia' },
        { code: 'GE', name: 'Georgia' },
        { code: 'DE', name: 'Germany' },
        { code: 'GH', name: 'Ghana' },
        { code: 'GR', name: 'Greece' },
        { code: 'GD', name: 'Grenada' },
        { code: 'GT', name: 'Guatemala' },
        { code: 'GN', name: 'Guinea' },
        { code: 'GW', name: 'Guinea-Bissau' },
        { code: 'GY', name: 'Guyana' },
        { code: 'HT', name: 'Haiti' },
        { code: 'HN', name: 'Honduras' },
        { code: 'HU', name: 'Hungary' },
        { code: 'IS', name: 'Iceland' },
        { code: 'IN', name: 'India' },
        { code: 'ID', name: 'Indonesia' },
        { code: 'IR', name: 'Iran' },
        { code: 'IQ', name: 'Iraq' },
        { code: 'IE', name: 'Ireland' },
        { code: 'IL', name: 'Israel' },
        { code: 'IT', name: 'Italy' },
        { code: 'CI', name: 'Ivory Coast' },
        { code: 'JM', name: 'Jamaica' },
        { code: 'JP', name: 'Japan' },
        { code: 'JO', name: 'Jordan' },
        { code: 'KZ', name: 'Kazakhstan' },
        { code: 'KE', name: 'Kenya' },
        { code: 'KI', name: 'Kiribati' },
        { code: 'KW', name: 'Kuwait' },
        { code: 'KG', name: 'Kyrgyzstan' },
        { code: 'LA', name: 'Laos' },
        { code: 'LV', name: 'Latvia' },
        { code: 'LB', name: 'Lebanon' },
        { code: 'LS', name: 'Lesotho' },
        { code: 'LR', name: 'Liberia' },
        { code: 'LY', name: 'Libya' },
        { code: 'LI', name: 'Liechtenstein' },
        { code: 'LT', name: 'Lithuania' },
        { code: 'LU', name: 'Luxembourg' },
        { code: 'MG', name: 'Madagascar' },
        { code: 'MW', name: 'Malawi' },
        { code: 'MY', name: 'Malaysia' },
        { code: 'MV', name: 'Maldives' },
        { code: 'ML', name: 'Mali' },
        { code: 'MT', name: 'Malta' },
        { code: 'MH', name: 'Marshall Islands' },
        { code: 'MR', name: 'Mauritania' },
        { code: 'MU', name: 'Mauritius' },
        { code: 'MX', name: 'Mexico' },
        { code: 'FM', name: 'Micronesia' },
        { code: 'MD', name: 'Moldova' },
        { code: 'MC', name: 'Monaco' },
        { code: 'MN', name: 'Mongolia' },
        { code: 'ME', name: 'Montenegro' },
        { code: 'MA', name: 'Morocco' },
        { code: 'MZ', name: 'Mozambique' },
        { code: 'MM', name: 'Myanmar' },
        { code: 'NA', name: 'Namibia' },
        { code: 'NR', name: 'Nauru' },
        { code: 'NP', name: 'Nepal' },
        { code: 'NL', name: 'Netherlands' },
        { code: 'NZ', name: 'New Zealand' },
        { code: 'NI', name: 'Nicaragua' },
        { code: 'NE', name: 'Niger' },
        { code: 'NG', name: 'Nigeria' },
        { code: 'KP', name: 'North Korea' },
        { code: 'MK', name: 'North Macedonia' },
        { code: 'NO', name: 'Norway' },
        { code: 'OM', name: 'Oman' },
        { code: 'PK', name: 'Pakistan' },
        { code: 'PW', name: 'Palau' },
        { code: 'PS', name: 'Palestine' },
        { code: 'PA', name: 'Panama' },
        { code: 'PG', name: 'Papua New Guinea' },
        { code: 'PY', name: 'Paraguay' },
        { code: 'PE', name: 'Peru' },
        { code: 'PH', name: 'Philippines' },
        { code: 'PL', name: 'Poland' },
        { code: 'PT', name: 'Portugal' },
        { code: 'QA', name: 'Qatar' },
        { code: 'RO', name: 'Romania' },
        { code: 'RU', name: 'Russia' },
        { code: 'RW', name: 'Rwanda' },
        { code: 'KN', name: 'Saint Kitts and Nevis' },
        { code: 'LC', name: 'Saint Lucia' },
        { code: 'VC', name: 'Saint Vincent and the Grenadines' },
        { code: 'WS', name: 'Samoa' },
        { code: 'SM', name: 'San Marino' },
        { code: 'ST', name: 'Sao Tome and Principe' },
        { code: 'SA', name: 'Saudi Arabia' },
        { code: 'SN', name: 'Senegal' },
        { code: 'RS', name: 'Serbia' },
        { code: 'SC', name: 'Seychelles' },
        { code: 'SL', name: 'Sierra Leone' },
        { code: 'SG', name: 'Singapore' },
        { code: 'SK', name: 'Slovakia' },
        { code: 'SI', name: 'Slovenia' },
        { code: 'SB', name: 'Solomon Islands' },
        { code: 'SO', name: 'Somalia' },
        { code: 'ZA', name: 'South Africa' },
        { code: 'KR', name: 'South Korea' },
        { code: 'SS', name: 'South Sudan' },
        { code: 'ES', name: 'Spain' },
        { code: 'LK', name: 'Sri Lanka' },
        { code: 'SD', name: 'Sudan' },
        { code: 'SR', name: 'Suriname' },
        { code: 'SE', name: 'Sweden' },
        { code: 'CH', name: 'Switzerland' },
        { code: 'SY', name: 'Syria' },
        { code: 'TJ', name: 'Tajikistan' },
        { code: 'TZ', name: 'Tanzania' },
        { code: 'TH', name: 'Thailand' },
        { code: 'TL', name: 'Timor-Leste' },
        { code: 'TG', name: 'Togo' },
        { code: 'TO', name: 'Tonga' },
        { code: 'TT', name: 'Trinidad and Tobago' },
        { code: 'TN', name: 'Tunisia' },
        { code: 'TR', name: 'Turkey' },
        { code: 'TM', name: 'Turkmenistan' },
        { code: 'TV', name: 'Tuvalu' },
        { code: 'UG', name: 'Uganda' },
        { code: 'UA', name: 'Ukraine' },
        { code: 'AE', name: 'United Arab Emirates' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'US', name: 'United States' },
        { code: 'UY', name: 'Uruguay' },
        { code: 'UZ', name: 'Uzbekistan' },
        { code: 'VU', name: 'Vanuatu' },
        { code: 'VA', name: 'Vatican City' },
        { code: 'VE', name: 'Venezuela' },
        { code: 'VN', name: 'Vietnam' },
        { code: 'YE', name: 'Yemen' },
        { code: 'ZM', name: 'Zambia' },
        { code: 'ZW', name: 'Zimbabwe' }
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
                if (response.success && response.data) {
                    const data: AdvertiserDetail = response.data;

                    // Map API data to form fields
                    this.name = data.name || '';
                    this.email = data.email || '';
                    this.phone = data.phone || '';
                    this.skype = data.skype || '';
                    this.companyName = data.company_name || '';
                    this.status = data.status || 'active';
                    this.address = data.address || '';
                    this.country = data.country || 'ALL';
                    this.state = data.state || '';
                    this.city = data.city || '';
                    this.zipcode = data.zipcode || '';
                    this.taxId = data.tax_id || '';
                    this.referenceId = data.reference_id || '';

                    // Store API-required fields for later use
                    this.website = data.website || '';
                    this.industry = data.industry || 'General';

                    // Handle tags if present
                    if (data.tags && Array.isArray(data.tags)) {
                        this.tags = data.tags;
                    }

                    // Handle manager (if present in API response)
                    if (data.manager) {
                        this.accountManager = [data.manager];
                    }

                    this.loading = false;
                }
            },
            error: (err) => {
                console.error('Error loading advertiser:', err);
                this.error = 'Failed to load advertiser details. Please try again.';
                this.loading = false;
            }
        });
    }


    save(): void {
        // Validate required fields
        if (!this.name || !this.email) {
            this.error = 'Name and Email are required';
            return;
        }

        this.saving = true;
        this.error = '';

        // Prepare API request - include all form fields
        const request = {
            name: this.name,
            company_name: this.companyName || this.name,
            website: this.website || `https://${this.email.split('@')[1]}`,
            industry: this.industry || 'General',
            status: this.status,
            phone: this.phone,
            skype: this.skype,
            tags: this.tags,
            address: this.address,
            country: this.country,
            state: this.state,
            city: this.city,
            zipcode: this.zipcode,
            tax_id: this.taxId,
            reference_id: this.referenceId,
            account_manager: this.accountManager,
            password: this.changePassword || undefined
        };

        this.advertiserService.editAdvertiser(this.advertiserId, request).subscribe({
            next: (response) => {
                console.log('Advertiser updated:', response);

                if (response.success) {
                    alert(`Advertiser "${this.name}" updated successfully!`);
                    this.router.navigate(['/advertisers/manage']);
                } else {
                    this.error = response.error?.message || 'Failed to update advertiser';
                }
                this.saving = false;
            },
            error: (err) => {
                console.error('Error updating advertiser:', err);
                this.error = err.error?.message || 'Failed to update advertiser. Please try again.';
                this.saving = false;
            }
        });
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
