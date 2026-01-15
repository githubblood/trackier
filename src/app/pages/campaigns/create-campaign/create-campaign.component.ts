import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-campaign.component.html',
  styleUrl: './create-campaign.component.scss'
})
export class CreateCampaignComponent {
  // Objectives
  objectives = [
    { id: 'conversions', label: 'Conversions', icon: 'fa-chart-line' },
    { id: 'sale', label: 'Sale', icon: 'fa-shopping-cart' },
    { id: 'app-installs', label: 'App Installs', icon: 'fa-mobile-alt' },
    { id: 'leads', label: 'Leads', icon: 'fa-user-plus' },
    { id: 'impressions', label: 'Impressions', icon: 'fa-eye' },
    { id: 'clicks', label: 'Clicks', icon: 'fa-mouse-pointer' }
  ];

  // Form Data
  campaign = {
    objective: 'conversions',
    advertiser: '',
    title: '',
    description: '',
    kpi: '',
    trafficChannels: [],
    previewUrl: '',
    conversionTracking: 'server-postback',
    primaryTrackingDomain: '',
    conversionTrackingDomain: '',
    defaultCampaignUrl: '',
    termsAndConditions: '',
    requireTerms: false,
    category: [],
    status: 'Active',
    note: ''
  };

  // Revenue and Payout
  revenueAndPayout = {
    method: 'default',
    currency: 'INR',
    revenue: '',
    geoCoverage: ['ALL'],
    payout: '',
    fixedPayout: ''
  };

  // Advanced Settings
  advancedSettings = {
    visibility: 'public',
    defaultGoalName: '',
    cutoutRate: '',
    defaultLandingPageName: '',
    thumbnail: null as File | null,
    appName: '',
    appId: '',
    conversionFlow: '',
    unsubscribeUrl: '',
    suppressionUrl: '',
    externalOfferId: '',
    redirectType: '302',
    uniqueClickSessionDuration: '',
    duplicateClickAction: false,
    conversionHoldPeriod: '',
    conversionStatusAfterHold: 'Approved',
    devices: ['ALL'],
    operatingSystem: 'ALL',
    carrierTargeting: '',
    deepLink: 'Enabled',
    allowedTrackingLinkFormat: 'numeric',
    enableStartEndDate: false,
    startDate: '',
    endDate: '',
    campaignStatus: 'Expired',
    scheduleStatusChange: false,
    statusToBeSet: '',
    scheduleDate: '',
    publisherNotifyTime: ''
  };

  // Time Targeting
  timeTargeting = {
    enabled: false,
    timezone: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    startHour: '0',
    endHour: '0',
    enableInactiveHours: false,
    days: [] as string[]
  };

  // Dropdown options
  advertisers = [
    { id: 1, name: 'App Company' },
    { id: 2, name: 'AdNet' },
    { id: 3, name: 'SoftInc' },
    { id: 4, name: 'BetKing' },
    { id: 5, name: 'DateMe' }
  ];

  trafficChannelOptions = ['Social', 'Search', 'Display', 'Native', 'Email', 'Push', 'SMS'];

  conversionTrackingOptions = [
    { value: 'server-postback', label: 'Server Postback' },
    { value: 'https-iframe', label: 'HTTPS IFrame Pixel' },
    { value: 'https-image', label: 'HTTPS Image Pixel' }
  ];

  trackingDomains = [
    { value: '', label: 'Select Domain' },
    { value: 'track.example.com', label: 'track.example.com' },
    { value: 'go.example.com', label: 'go.example.com' }
  ];

  currencies = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY'];

  statusOptions = ['Active', 'Paused', 'Pending', 'Deleted'];

  deviceOptions = ['ALL', 'Desktop', 'Mobile', 'Tablet'];

  osOptions = ['ALL', 'Android', 'iOS', 'Windows', 'Mac OS', 'Linux'];

  redirectTypes = ['302', '302/200 with Hide Referrer', '200 OK'];

  conversionStatusOptions = ['Approved', 'Pending', 'Rejected'];

  campaignStatusAfterOptions = ['Expired', 'Paused', 'Deleted'];

  trackingLinkFormats = [
    { value: 'numeric', label: 'Numeric ID' },
    { value: 'alphanumeric', label: 'Alphanumeric ID' }
  ];

  deepLinkOptions = ['Enabled', 'Disabled'];

  timezones = [
    '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    '(GMT+00:00) UTC',
    '(GMT-05:00) Eastern Time (US & Canada)',
    '(GMT-08:00) Pacific Time (US & Canada)',
    '(GMT+01:00) Amsterdam, Berlin, Rome, Paris'
  ];

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Countries for Geo Coverage - All UN Member States + Observers + Territories
  countries = [
    { code: 'ALL', name: 'ALL Countries' },
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
    { code: 'BN', name: 'Brunei Darussalam' },
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
    { code: 'CD', name: 'Congo (Democratic Republic)' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'CI', name: "Côte d'Ivoire" },
    { code: 'HR', name: 'Croatia' },
    { code: 'CU', name: 'Cuba' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czechia' },
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
    { code: 'JM', name: 'Jamaica' },
    { code: 'JP', name: 'Japan' },
    { code: 'JO', name: 'Jordan' },
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'KE', name: 'Kenya' },
    { code: 'KI', name: 'Kiribati' },
    { code: 'KP', name: 'Korea (North)' },
    { code: 'KR', name: 'Korea (South)' },
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
    { code: 'RU', name: 'Russian Federation' },
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
    { code: 'SS', name: 'South Sudan' },
    { code: 'ES', name: 'Spain' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'SD', name: 'Sudan' },
    { code: 'SR', name: 'Suriname' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'SY', name: 'Syrian Arab Republic' },
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
    { code: 'VA', name: 'Vatican City (Holy See)' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'YE', name: 'Yemen' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'ZW', name: 'Zimbabwe' },
    // Territories and Special Regions
    { code: 'HK', name: 'Hong Kong' },
    { code: 'MO', name: 'Macau' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'PR', name: 'Puerto Rico' },
    { code: 'GU', name: 'Guam' },
    { code: 'VI', name: 'U.S. Virgin Islands' },
    { code: 'AS', name: 'American Samoa' },
    { code: 'GI', name: 'Gibraltar' },
    { code: 'GL', name: 'Greenland' },
    { code: 'FO', name: 'Faroe Islands' },
    { code: 'BM', name: 'Bermuda' },
    { code: 'KY', name: 'Cayman Islands' },
    { code: 'VG', name: 'British Virgin Islands' },
    { code: 'TC', name: 'Turks and Caicos Islands' },
    { code: 'AW', name: 'Aruba' },
    { code: 'CW', name: 'Curaçao' },
    { code: 'SX', name: 'Sint Maarten' },
    { code: 'NC', name: 'New Caledonia' },
    { code: 'PF', name: 'French Polynesia' },
    { code: 'RE', name: 'Réunion' },
    { code: 'GP', name: 'Guadeloupe' },
    { code: 'MQ', name: 'Martinique' },
    { code: 'GF', name: 'French Guiana' },
    { code: 'YT', name: 'Mayotte' },
    { code: 'IM', name: 'Isle of Man' },
    { code: 'JE', name: 'Jersey' },
    { code: 'GG', name: 'Guernsey' }
  ];

  // URL Tokens
  urlTokens = [
    { token: '{click_id}', label: 'Click ID' },
    { token: '{pub_id}', label: 'Publisher ID' },
    { token: '{goal_id}', label: 'Goal ID' },
    { token: '{campaign_id}', label: 'Campaign ID' },
    { token: '{advertiser_id}', label: 'Advertiser ID' }
  ];

  // Section states
  showAdvancedSettings = false;
  showTimeTargeting = false;

  // Methods
  selectObjective(id: string) {
    this.campaign.objective = id;
  }

  toggleAdvancedSettings() {
    this.showAdvancedSettings = !this.showAdvancedSettings;
  }

  toggleTimeTargeting() {
    this.showTimeTargeting = !this.showTimeTargeting;
  }

  addToken(token: string) {
    this.campaign.defaultCampaignUrl += token;
  }

  onThumbnailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.advancedSettings.thumbnail = input.files[0];
    }
  }

  toggleDay(day: string) {
    const index = this.timeTargeting.days.indexOf(day);
    if (index > -1) {
      this.timeTargeting.days.splice(index, 1);
    } else {
      this.timeTargeting.days.push(day);
    }
  }

  createCampaign() {
    console.log('Creating campaign:', {
      campaign: this.campaign,
      revenueAndPayout: this.revenueAndPayout,
      advancedSettings: this.advancedSettings,
      timeTargeting: this.timeTargeting
    });
    alert('Campaign created successfully!');
  }

  // Rich text editor methods
  formatText(command: string) {
    document.execCommand(command, false);
  }

  onDescriptionInput(event: Event) {
    const target = event.target as HTMLElement;
    this.campaign.description = target.innerHTML;
  }
}
