import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CampaignService } from '../../../core/services/campaign.service';
import { CreateCampaignRequest, CampaignGoal } from '../../../core/models/campaign.model';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './create-campaign.component.html',
  styleUrl: './create-campaign.component.scss'
})
export class CreateCampaignComponent implements OnInit {
  isEditMode = false;
  campaignId: string | null = null;
  defaultGoalId: number | undefined;
  allGoals: any[] = [];
  totalClicks = 0;
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
    trafficChannels: [] as string[],
    previewUrl: '',
    conversionTracking: 'server-postback',
    primaryTrackingDomain: '',
    conversionTrackingDomain: '',
    defaultCampaignUrl: '',
    termsAndConditions: '',
    requireTerms: false,
    category: [] as string[],
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
    defaultLandingPageName: '',
    thumbnail: null as File | null,
    appName: '',
    appId: '',
    conversionFlow: '',
    conversionFlowLanguage: '',
    conversionFlowLanguageText: '',
    unsubscribeUrl: '',
    suppressionUrl: '',
    externalOfferId: '',
    redirectType: '302',
    uniqueClickSessionDuration: '',
    duplicateClickAction: false,
    duplicateClickRedirect: 'blank_page',
    conversionHoldPeriod: '',
    conversionStatusAfterHold: 'Approved',
    devices: ['ALL'],
    operatingSystem: 'ALL',
    minOsVersion: '',
    maxOsVersion: '',
    carrierTargeting: [] as string[],
    deepLink: 'Enabled',
    allowedTrackingLinkFormat: 'numeric',
    enableStartEndDate: false,
    startDate: '',
    endDate: '',
    campaignStatus: 'Expired',
    scheduleStatusChange: false,
    statusToBeSet: '',
    scheduleDate: '',
    publisherManualNotify: false,
    publisherNotifyTime: ''
  }

  // Conversion Flow Language Wise - Array for multiple language entries
  conversionFlowLanguages = [
    { language: 'English', conversionFlow: '' }
  ];

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

  currencies = [
    { code: 'USD', name: 'US Dollar (USD)' },
    { code: 'EUR', name: 'Euro (EUR)' },
    { code: 'GBP', name: 'British Pound (GBP)' },
    { code: 'JPY', name: 'Japanese Yen (JPY)' },
    { code: 'AUD', name: 'Australian Dollar (AUD)' },
    { code: 'CAD', name: 'Canadian Dollar (CAD)' },
    { code: 'CHF', name: 'Swiss Franc (CHF)' },
    { code: 'CNY', name: 'Chinese Yuan (CNY)' },
    { code: 'INR', name: 'Indian Rupee (INR)' },
    { code: 'AED', name: 'UAE Dirham (AED)' },
    { code: 'AFN', name: 'Afghan Afghani (AFN)' },
    { code: 'ALL', name: 'Albanian Lek (ALL)' },
    { code: 'AMD', name: 'Armenian Dram (AMD)' },
    { code: 'ANG', name: 'Netherlands Antillean Guilder (ANG)' },
    { code: 'AOA', name: 'Angolan Kwanza (AOA)' },
    { code: 'ARS', name: 'Argentine Peso (ARS)' },
    { code: 'AWG', name: 'Aruban Florin (AWG)' },
    { code: 'AZN', name: 'Azerbaijani Manat (AZN)' },
    { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark (BAM)' },
    { code: 'BBD', name: 'Barbadian Dollar (BBD)' },
    { code: 'BDT', name: 'Bangladeshi Taka (BDT)' },
    { code: 'BGN', name: 'Bulgarian Lev (BGN)' },
    { code: 'BHD', name: 'Bahraini Dinar (BHD)' },
    { code: 'BIF', name: 'Burundian Franc (BIF)' },
    { code: 'BMD', name: 'Bermudan Dollar (BMD)' },
    { code: 'BND', name: 'Brunei Dollar (BND)' },
    { code: 'BOB', name: 'Bolivian Boliviano (BOB)' },
    { code: 'BRL', name: 'Brazilian Real (BRL)' },
    { code: 'BSD', name: 'Bahamian Dollar (BSD)' },
    { code: 'BTN', name: 'Bhutanese Ngultrum (BTN)' },
    { code: 'BWP', name: 'Botswanan Pula (BWP)' },
    { code: 'BYN', name: 'Belarusian Ruble (BYN)' },
    { code: 'BZD', name: 'Belize Dollar (BZD)' },
    { code: 'CDF', name: 'Congolese Franc (CDF)' },
    { code: 'CLP', name: 'Chilean Peso (CLP)' },
    { code: 'COP', name: 'Colombian Peso (COP)' },
    { code: 'CRC', name: 'Costa Rican Colón (CRC)' },
    { code: 'CUP', name: 'Cuban Peso (CUP)' },
    { code: 'CVE', name: 'Cape Verdean Escudo (CVE)' },
    { code: 'CZK', name: 'Czech Koruna (CZK)' },
    { code: 'DJF', name: 'Djiboutian Franc (DJF)' },
    { code: 'DKK', name: 'Danish Krone (DKK)' },
    { code: 'DOP', name: 'Dominican Peso (DOP)' },
    { code: 'DZD', name: 'Algerian Dinar (DZD)' },
    { code: 'EGP', name: 'Egyptian Pound (EGP)' },
    { code: 'ERN', name: 'Eritrean Nakfa (ERN)' },
    { code: 'ETB', name: 'Ethiopian Birr (ETB)' },
    { code: 'FJD', name: 'Fijian Dollar (FJD)' },
    { code: 'FKP', name: 'Falkland Islands Pound (FKP)' },
    { code: 'GEL', name: 'Georgian Lari (GEL)' },
    { code: 'GHS', name: 'Ghanaian Cedi (GHS)' },
    { code: 'GIP', name: 'Gibraltar Pound (GIP)' },
    { code: 'GMD', name: 'Gambian Dalasi (GMD)' },
    { code: 'GNF', name: 'Guinean Franc (GNF)' },
    { code: 'GTQ', name: 'Guatemalan Quetzal (GTQ)' },
    { code: 'GYD', name: 'Guyanaese Dollar (GYD)' },
    { code: 'HKD', name: 'Hong Kong Dollar (HKD)' },
    { code: 'HNL', name: 'Honduran Lempira (HNL)' },
    { code: 'HRK', name: 'Croatian Kuna (HRK)' },
    { code: 'HTG', name: 'Haitian Gourde (HTG)' },
    { code: 'HUF', name: 'Hungarian Forint (HUF)' },
    { code: 'IDR', name: 'Indonesian Rupiah (IDR)' },
    { code: 'ILS', name: 'Israeli New Shekel (ILS)' },
    { code: 'IQD', name: 'Iraqi Dinar (IQD)' },
    { code: 'IRR', name: 'Iranian Rial (IRR)' },
    { code: 'ISK', name: 'Icelandic Króna (ISK)' },
    { code: 'JMD', name: 'Jamaican Dollar (JMD)' },
    { code: 'JOD', name: 'Jordanian Dinar (JOD)' },
    { code: 'KES', name: 'Kenyan Shilling (KES)' },
    { code: 'KGS', name: 'Kyrgystani Som (KGS)' },
    { code: 'KHR', name: 'Cambodian Riel (KHR)' },
    { code: 'KMF', name: 'Comorian Franc (KMF)' },
    { code: 'KPW', name: 'North Korean Won (KPW)' },
    { code: 'KRW', name: 'South Korean Won (KRW)' },
    { code: 'KWD', name: 'Kuwaiti Dinar (KWD)' },
    { code: 'KYD', name: 'Cayman Islands Dollar (KYD)' },
    { code: 'KZT', name: 'Kazakhstani Tenge (KZT)' },
    { code: 'LAK', name: 'Laotian Kip (LAK)' },
    { code: 'LBP', name: 'Lebanese Pound (LBP)' },
    { code: 'LKR', name: 'Sri Lankan Rupee (LKR)' },
    { code: 'LRD', name: 'Liberian Dollar (LRD)' },
    { code: 'LSL', name: 'Lesotho Loti (LSL)' },
    { code: 'LYD', name: 'Libyan Dinar (LYD)' },
    { code: 'MAD', name: 'Moroccan Dirham (MAD)' },
    { code: 'MDL', name: 'Moldovan Leu (MDL)' },
    { code: 'MGA', name: 'Malagasy Ariary (MGA)' },
    { code: 'MKD', name: 'Macedonian Denar (MKD)' },
    { code: 'MMK', name: 'Myanmar Kyat (MMK)' },
    { code: 'MNT', name: 'Mongolian Tugrik (MNT)' },
    { code: 'MOP', name: 'Macanese Pataca (MOP)' },
    { code: 'MRU', name: 'Mauritanian Ouguiya (MRU)' },
    { code: 'MUR', name: 'Mauritian Rupee (MUR)' },
    { code: 'MVR', name: 'Maldivian Rufiyaa (MVR)' },
    { code: 'MWK', name: 'Malawian Kwacha (MWK)' },
    { code: 'MXN', name: 'Mexican Peso (MXN)' },
    { code: 'MYR', name: 'Malaysian Ringgit (MYR)' },
    { code: 'MZN', name: 'Mozambican Metical (MZN)' },
    { code: 'NAD', name: 'Namibian Dollar (NAD)' },
    { code: 'NGN', name: 'Nigerian Naira (NGN)' },
    { code: 'NIO', name: 'Nicaraguan Córdoba (NIO)' },
    { code: 'NOK', name: 'Norwegian Krone (NOK)' },
    { code: 'NPR', name: 'Nepalese Rupee (NPR)' },
    { code: 'NZD', name: 'New Zealand Dollar (NZD)' },
    { code: 'OMR', name: 'Omani Rial (OMR)' },
    { code: 'PAB', name: 'Panamanian Balboa (PAB)' },
    { code: 'PEN', name: 'Peruvian Nuevo Sol (PEN)' },
    { code: 'PGK', name: 'Papua New Guinean Kina (PGK)' },
    { code: 'PHP', name: 'Philippine Peso (PHP)' },
    { code: 'PKR', name: 'Pakistani Rupee (PKR)' },
    { code: 'PLN', name: 'Polish Zloty (PLN)' },
    { code: 'PYG', name: 'Paraguayan Guarani (PYG)' },
    { code: 'QAR', name: 'Qatari Rial (QAR)' },
    { code: 'RON', name: 'Romanian Leu (RON)' },
    { code: 'RSD', name: 'Serbian Dinar (RSD)' },
    { code: 'RUB', name: 'Russian Ruble (RUB)' },
    { code: 'RWF', name: 'Rwandan Franc (RWF)' },
    { code: 'SAR', name: 'Saudi Riyal (SAR)' },
    { code: 'SBD', name: 'Solomon Islands Dollar (SBD)' },
    { code: 'SCR', name: 'Seychellois Rupee (SCR)' },
    { code: 'SDG', name: 'Sudanese Pound (SDG)' },
    { code: 'SEK', name: 'Swedish Krona (SEK)' },
    { code: 'SGD', name: 'Singapore Dollar (SGD)' },
    { code: 'SHP', name: 'Saint Helena Pound (SHP)' },
    { code: 'SLL', name: 'Sierra Leonean Leone (SLL)' },
    { code: 'SOS', name: 'Somali Shilling (SOS)' },
    { code: 'SRD', name: 'Surinamese Dollar (SRD)' },
    { code: 'SSP', name: 'South Sudanese Pound (SSP)' },
    { code: 'STN', name: 'São Tomé and Príncipe Dobra (STN)' },
    { code: 'SYP', name: 'Syrian Pound (SYP)' },
    { code: 'SZL', name: 'Swazi Lilangeni (SZL)' },
    { code: 'THB', name: 'Thai Baht (THB)' },
    { code: 'TJS', name: 'Tajikistani Somoni (TJS)' },
    { code: 'TMT', name: 'Turkmenistani Manat (TMT)' },
    { code: 'TND', name: 'Tunisian Dinar (TND)' },
    { code: 'TOP', name: 'Tongan Paʻanga (TOP)' },
    { code: 'TRY', name: 'Turkish Lira (TRY)' },
    { code: 'TTD', name: 'Trinidad and Tobago Dollar (TTD)' },
    { code: 'TWD', name: 'New Taiwan Dollar (TWD)' },
    { code: 'TZS', name: 'Tanzanian Shilling (TZS)' },
    { code: 'UAH', name: 'Ukrainian Hryvnia (UAH)' },
    { code: 'UGX', name: 'Ugandan Shilling (UGX)' },
    { code: 'UYU', name: 'Uruguayan Peso (UYU)' },
    { code: 'UZS', name: 'Uzbekistan Som (UZS)' },
    { code: 'VES', name: 'Venezuelan Bolívar (VES)' },
    { code: 'VND', name: 'Vietnamese Dong (VND)' },
    { code: 'VUV', name: 'Vanuatu Vatu (VUV)' },
    { code: 'WST', name: 'Samoan Tala (WST)' },
    { code: 'XAF', name: 'Central African CFA Franc (XAF)' },
    { code: 'XCD', name: 'East Caribbean Dollar (XCD)' },
    { code: 'XOF', name: 'West African CFA Franc (XOF)' },
    { code: 'XPF', name: 'CFP Franc (XPF)' },
    { code: 'YER', name: 'Yemeni Rial (YER)' },
    { code: 'ZAR', name: 'South African Rand (ZAR)' },
    { code: 'ZMW', name: 'Zambian Kwacha (ZMW)' },
    { code: 'ZWL', name: 'Zimbabwean Dollar (ZWL)' }
  ];

  statusOptions = ['Active', 'Paused', 'Pending', 'Deleted'];

  deviceOptions = ['ALL', 'Desktop', 'Mobile', 'Tablet'];

  osOptions = ['ALL', 'Android', 'iOS', 'Windows', 'Mac OS', 'Linux'];

  redirectTypes = ['302', '302 with Hide Referrer', '200 OK', '200 with Hide Referrer'];

  conversionStatusOptions = ['Approved', 'Pending', 'Rejected'];

  campaignStatusAfterOptions = ['Expired', 'Paused', 'Deleted'];

  trackingLinkFormats = [
    { value: 'numeric', label: 'Numeric ID' },
    { value: 'alphanumeric', label: 'Alphanumeric ID' }
  ];

  deepLinkOptions = ['Enabled', 'Disabled'];

  languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Hindi',
    'Dutch', 'Polish', 'Turkish', 'Vietnamese', 'Thai', 'Indonesian',
    'Malay', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Greek',
    'Hebrew', 'Czech', 'Romanian', 'Hungarian', 'Ukrainian', 'Bengali'
  ];

  carrierOptions = [
    'Vodafone', 'AT&T', 'Verizon', 'T-Mobile', 'Airtel', 'Jio',
    'Orange', 'Telefonica', 'Deutsche Telekom', 'China Mobile',
    'China Unicom', 'China Telecom', 'NTT Docomo', 'SoftBank',
    'SK Telecom', 'Rogers', 'Bell', 'Telus', 'Optus', 'Telstra',
    'Spark', 'Swisscom', 'A1', 'Telia', 'Telenor', 'Turkcell',
    'Etisalat', 'du', 'STC', 'Ooredoo', 'MTN', 'Safaricom'
  ];

  categoryOptions = [
    'E-commerce',
    'Gaming',
    'Finance',
    'Travel',
    'Education',
    'Health & Fitness',
    'Entertainment',
    'Food & Drink',
    'Utilities',
    'Social Networking',
    'Productivity',
    'News',
    'Sports',
    'Lifestyle',
    'Business',
    'Dating',
    'Real Estate',
    'Automotive',
    'Shopping',
    'Other'
  ];

  timezones = [
    '(GMT-12:00) International Date Line West',
    '(GMT-11:00) Midway Island, Samoa',
    '(GMT-10:00) Hawaii',
    '(GMT-09:00) Alaska',
    '(GMT-08:00) Pacific Time (US & Canada)',
    '(GMT-08:00) Tijuana, Baja California',
    '(GMT-07:00) Arizona',
    '(GMT-07:00) Chihuahua, La Paz, Mazatlan',
    '(GMT-07:00) Mountain Time (US & Canada)',
    '(GMT-06:00) Central America',
    '(GMT-06:00) Central Time (US & Canada)',
    '(GMT-06:00) Guadalajara, Mexico City, Monterrey',
    '(GMT-06:00) Saskatchewan',
    '(GMT-05:00) Bogota, Lima, Quito, Rio Branco',
    '(GMT-05:00) Eastern Time (US & Canada)',
    '(GMT-05:00) Indiana (East)',
    '(GMT-04:00) Atlantic Time (Canada)',
    '(GMT-04:00) Caracas, La Paz',
    '(GMT-04:00) Manaus',
    '(GMT-04:00) Santiago',
    '(GMT-03:30) Newfoundland',
    '(GMT-03:00) Brasilia',
    '(GMT-03:00) Buenos Aires, Georgetown',
    '(GMT-03:00) Greenland',
    '(GMT-03:00) Montevideo',
    '(GMT-02:00) Mid-Atlantic',
    '(GMT-01:00) Cape Verde Is.',
    '(GMT-01:00) Azores',
    '(GMT+00:00) Casablanca, Monrovia, Reykjavik',
    '(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London',
    '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
    '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
    '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris',
    '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb',
    '(GMT+01:00) West Central Africa',
    '(GMT+02:00) Amman',
    '(GMT+02:00) Athens, Bucharest, Istanbul',
    '(GMT+02:00) Beirut',
    '(GMT+02:00) Cairo',
    '(GMT+02:00) Harare, Pretoria',
    '(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
    '(GMT+02:00) Jerusalem',
    '(GMT+02:00) Minsk',
    '(GMT+02:00) Windhoek',
    '(GMT+03:00) Kuwait, Riyadh, Baghdad',
    '(GMT+03:00) Moscow, St. Petersburg, Volgograd',
    '(GMT+03:00) Nairobi',
    '(GMT+03:00) Tbilisi',
    '(GMT+03:30) Tehran',
    '(GMT+04:00) Abu Dhabi, Muscat',
    '(GMT+04:00) Baku',
    '(GMT+04:00) Yerevan',
    '(GMT+04:30) Kabul',
    '(GMT+05:00) Yekaterinburg',
    '(GMT+05:00) Islamabad, Karachi, Tashkent',
    '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    '(GMT+05:45) Kathmandu',
    '(GMT+06:00) Almaty, Novosibirsk',
    '(GMT+06:00) Astana, Dhaka',
    '(GMT+06:30) Yangon (Rangoon)',
    '(GMT+07:00) Bangkok, Hanoi, Jakarta',
    '(GMT+07:00) Krasnoyarsk',
    '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
    '(GMT+08:00) Kuala Lumpur, Singapore',
    '(GMT+08:00) Irkutsk, Ulaan Bataar',
    '(GMT+08:00) Perth',
    '(GMT+08:00) Taipei',
    '(GMT+09:00) Osaka, Sapporo, Tokyo',
    '(GMT+09:00) Seoul',
    '(GMT+09:00) Yakutsk',
    '(GMT+09:30) Adelaide',
    '(GMT+09:30) Darwin',
    '(GMT+10:00) Brisbane',
    '(GMT+10:00) Canberra, Melbourne, Sydney',
    '(GMT+10:00) Hobart',
    '(GMT+10:00) Guam, Port Moresby',
    '(GMT+10:00) Vladivostok',
    '(GMT+11:00) Magadan, Solomon Is., New Caledonia',
    '(GMT+12:00) Auckland, Wellington',
    '(GMT+12:00) Fiji, Kamchatka, Marshall Is.',
    '(GMT+13:00) Nuku\'alofa'
  ];

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Countries for Geo Coverage - All UN Member States + Observers + Territories
  countries = [
    { code: 'ALL', name: 'ALL Countries' },
    { code: 'AF', name: 'Afghanistan' },
    // ... (rest of countries remain the same in memory, just filtering logic added below)
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
    // ... (rest would be similar, just ensuring filtering works)
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

  addConversionFlowLanguage() {
    this.conversionFlowLanguages.push({ language: 'English', conversionFlow: '' });
  }

  removeConversionFlowLanguage(index: number) {
    this.conversionFlowLanguages.splice(index, 1);
  }

  toggleDay(day: string) {
    const index = this.timeTargeting.days.indexOf(day);
    if (index > -1) {
      this.timeTargeting.days.splice(index, 1);
    } else {
      this.timeTargeting.days.push(day);
    }
  }

  loading = false;
  error = '';

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    if (this.campaignId) {
      this.isEditMode = true;
      this.loadCampaign(this.campaignId);
    }
  }

  loadCampaign(id: string) {
    this.loading = true;
    this.campaignService.getCampaignDetail(id).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.data) {
          const data = res.data;
          // Map API data to form
          this.totalClicks = data.total_clicks || 0;
          this.campaign.title = data.title;
          this.campaign.description = data.description;
          this.campaign.advertiser = data.advertiser_id.toString();
          this.campaign.previewUrl = data.preview_url || '';
          this.campaign.defaultCampaignUrl = data.tracking_url;
          this.campaign.termsAndConditions = data.terms_conditions || '';
          // Helper to title case
          const toTitleCase = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

          this.campaign.status = data.status ? toTitleCase(data.status) : 'Active';

          this.advancedSettings.visibility = data.visibility;

          // Map devices
          if (!data.device || data.device === 'all') {
            this.advancedSettings.devices = ['ALL'];
          } else {
            this.advancedSettings.devices = data.device.split(',').map(d => {
              const trimmed = d.trim();
              return trimmed.toLowerCase() === 'all' ? 'ALL' : toTitleCase(trimmed);
            });
          }
          this.revenueAndPayout.geoCoverage = data.geo_coverage === 'global' ? ['ALL'] : (Array.isArray(data.geo_coverage) ? data.geo_coverage : [data.geo_coverage]);
          this.revenueAndPayout.currency = data.currency;

          // Additional mappings
          this.campaign.objective = data.objective || 'conversions';
          this.campaign.kpi = data.kpi || '';
          this.campaign.category = data.category || [];
          this.campaign.trafficChannels = data.traffic_channels || [];
          this.campaign.conversionTracking = data.conversion_tracking || 'server-postback';
          this.campaign.primaryTrackingDomain = data.primary_tracking_domain || '';
          this.campaign.conversionTrackingDomain = data.conversion_tracking_domain || '';
          this.campaign.requireTerms = data.require_terms || false;
          this.campaign.note = data.note || '';

          // Advanced settings mappings
          this.advancedSettings.defaultGoalName = data.default_goal_name || '';
          this.advancedSettings.defaultLandingPageName = data.default_landing_page_name || '';
          this.advancedSettings.appName = data.app_name || '';
          this.advancedSettings.appId = data.app_id || '';
          this.advancedSettings.conversionFlow = data.conversion_flow || '';
          this.advancedSettings.unsubscribeUrl = data.unsubscribe_url || '';
          this.advancedSettings.suppressionUrl = data.suppression_url || '';
          this.advancedSettings.externalOfferId = data.external_offer_id || '';
          this.advancedSettings.redirectType = data.redirect_type || '302';
          this.advancedSettings.uniqueClickSessionDuration = data.unique_click_session_duration?.toString() || '';
          this.advancedSettings.duplicateClickAction = data.duplicate_click_action || false;
          this.advancedSettings.duplicateClickRedirect = data.duplicate_click_redirect || 'blank_page';
          this.advancedSettings.conversionHoldPeriod = data.conversion_hold_period?.toString() || '';
          this.advancedSettings.conversionStatusAfterHold = data.conversion_status_after_hold || 'Approved';
          this.advancedSettings.operatingSystem = data.operating_system || 'ALL';
          this.advancedSettings.minOsVersion = data.min_os_version || '';
          this.advancedSettings.maxOsVersion = data.max_os_version || '';
          this.advancedSettings.carrierTargeting = data.carrier_targeting || [];
          this.advancedSettings.deepLink = data.deep_link || 'Enabled';
          this.advancedSettings.allowedTrackingLinkFormat = data.allowed_tracking_link_format || 'numeric';
          this.advancedSettings.enableStartEndDate = data.enable_start_end_date || false;
          this.advancedSettings.startDate = data.start_date || '';
          this.advancedSettings.endDate = data.end_date || '';
          this.advancedSettings.campaignStatus = data.campaign_status_after || 'Expired';
          this.advancedSettings.scheduleStatusChange = data.schedule_status_change || false;
          this.advancedSettings.statusToBeSet = data.status_to_be_set || '';
          this.advancedSettings.scheduleDate = data.schedule_date || '';
          this.advancedSettings.publisherManualNotify = data.publisher_manual_notify || false;
          this.advancedSettings.publisherNotifyTime = data.publisher_notify_time || '';

          // Time targeting mappings
          this.timeTargeting.enabled = data.time_targeting_enabled || false;
          this.timeTargeting.timezone = data.time_targeting_timezone || '';
          this.timeTargeting.startHour = data.time_targeting_start_hour?.toString() || '0';
          this.timeTargeting.endHour = data.time_targeting_end_hour?.toString() || '0';
          this.timeTargeting.enableInactiveHours = data.time_targeting_enable_inactive_hours || false;
          this.timeTargeting.days = data.time_targeting_days || [];

          // Find default goal to set revenue/payout
          this.allGoals = data.goals || [];
          const defaultGoal = data.goals?.find(g => g.is_default);
          if (defaultGoal) {
            this.defaultGoalId = defaultGoal.id;
            this.revenueAndPayout.revenue = defaultGoal.revenue.toString();
            this.revenueAndPayout.payout = defaultGoal.payout.toString();
            this.advancedSettings.defaultGoalName = defaultGoal.goal_name;
          }
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load campaign details';
        console.error(err);
      }
    });
  }

  createCampaign() {
    this.loading = true;
    this.error = '';

    try {
      const requestData = this.mapFormToRequest();

      if (this.isEditMode && this.campaignId) {
        this.campaignService.updateCampaign(this.campaignId, requestData).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              alert('Campaign updated successfully!');
              this.router.navigate(['/campaigns', this.campaignId]);
            } else {
              this.error = response.message || 'Failed to update campaign';
            }
          },
          error: (err) => {
            console.error('Update campaign failed', err);
            this.loading = false;
            this.error = err.error?.message || 'An error occurred while updating the campaign';
          }
        });
      } else {
        this.campaignService.createCampaign(requestData).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              alert('Campaign created successfully!');
              this.router.navigate(['/campaigns']);
            } else {
              this.error = response.message || 'Failed to create campaign';
            }
          },
          error: (err) => {
            console.error('Create campaign failed', err);
            this.loading = false;
            this.error = err.error?.message || 'An error occurred while creating the campaign';
          }
        });
      }
    } catch (e: any) {
      this.loading = false;
      this.error = e.message;
    }
  }

  private mapFormToRequest(): CreateCampaignRequest {
    if (!this.campaign.advertiser) throw new Error('Advertiser is required');
    if (!this.campaign.title) throw new Error('Campaign Title is required');
    if (!this.campaign.defaultCampaignUrl) throw new Error('Tracking URL is required');

    // Map goals (constructing a default goal from the main payout settings)
    const defaultGoal: CampaignGoal = {
      id: this.defaultGoalId,
      goal_id: 'default', // standard default
      goal_name: this.advancedSettings.defaultGoalName || 'Default',
      goal_value: 0,
      payout: this.revenueAndPayout.payout || 0,
      revenue: this.revenueAndPayout.revenue || 0,
      is_default: true,
      cutback_percent: 0
    };

    // Determine visibility
    let visibility: 'public' | 'private' | 'need_permission' = 'public';
    if (['public', 'private', 'need_permission'].includes(this.advancedSettings.visibility)) {
      visibility = this.advancedSettings.visibility as any;
    }

    // Determine Geo
    let geo: string | string[] = 'global';
    if (this.revenueAndPayout.geoCoverage && !this.revenueAndPayout.geoCoverage.includes('ALL')) {
      geo = this.revenueAndPayout.geoCoverage;
    }

    // Determine Device
    let device = 'all';
    if (this.advancedSettings.devices && !this.advancedSettings.devices.includes('ALL')) {
      device = this.advancedSettings.devices.join(',');
    }

    // Prepare goals payload - preserve existing goals in edit mode
    let goalsPayload = [defaultGoal];
    if (this.isEditMode && this.allGoals.length > 0) {
      const hasDefault = this.allGoals.some(g => g.is_default);
      goalsPayload = this.allGoals.map(g => g.is_default ? defaultGoal : g);
      if (!hasDefault) goalsPayload.push(defaultGoal);
    }

    // Build the complete request with all form fields
    const request: CreateCampaignRequest = {
      // Required fields
      advertiser_id: Number(this.campaign.advertiser),
      title: this.campaign.title,
      description: this.campaign.description || '',
      preview_url: this.campaign.previewUrl || '',
      terms_conditions: this.campaign.termsAndConditions || '',
      device: device,
      geo_coverage: geo,
      visibility: visibility,
      total_clicks: this.totalClicks,
      tracking_url: this.campaign.defaultCampaignUrl,
      goals: goalsPayload,

      // Additional campaign fields
      currency: this.revenueAndPayout.currency || 'INR',
      status: this.campaign.status?.toLowerCase() || 'active',
      objective: this.campaign.objective,
      kpi: this.campaign.kpi || '',
      category: Array.isArray(this.campaign.category) ? this.campaign.category : [],
      traffic_channels: this.campaign.trafficChannels || [],
      conversion_tracking: this.campaign.conversionTracking || 'server-postback',
      primary_tracking_domain: this.campaign.primaryTrackingDomain || '',
      conversion_tracking_domain: this.campaign.conversionTrackingDomain || '',
      require_terms: this.campaign.requireTerms || false,
      note: this.campaign.note || '',

      // Advanced Settings
      default_goal_name: this.advancedSettings.defaultGoalName || '',
      default_landing_page_name: this.advancedSettings.defaultLandingPageName || '',
      app_name: this.advancedSettings.appName || '',
      app_id: this.advancedSettings.appId || '',
      conversion_flow: this.advancedSettings.conversionFlow || '',
      unsubscribe_url: this.advancedSettings.unsubscribeUrl || '',
      suppression_url: this.advancedSettings.suppressionUrl || '',
      external_offer_id: this.advancedSettings.externalOfferId || '',
      redirect_type: this.advancedSettings.redirectType || '302',
      unique_click_session_duration: this.advancedSettings.uniqueClickSessionDuration
        ? Number(this.advancedSettings.uniqueClickSessionDuration)
        : undefined,
      duplicate_click_action: this.advancedSettings.duplicateClickAction || false,
      duplicate_click_redirect: this.advancedSettings.duplicateClickRedirect || '',
      conversion_hold_period: this.advancedSettings.conversionHoldPeriod
        ? Number(this.advancedSettings.conversionHoldPeriod)
        : undefined,
      conversion_status_after_hold: this.advancedSettings.conversionStatusAfterHold || '',
      operating_system: this.advancedSettings.operatingSystem !== 'ALL'
        ? this.advancedSettings.operatingSystem
        : '',
      min_os_version: this.advancedSettings.minOsVersion || '',
      max_os_version: this.advancedSettings.maxOsVersion || '',
      carrier_targeting: this.advancedSettings.carrierTargeting || [],
      deep_link: this.advancedSettings.deepLink || 'Enabled',
      allowed_tracking_link_format: this.advancedSettings.allowedTrackingLinkFormat || 'numeric',
      enable_start_end_date: this.advancedSettings.enableStartEndDate || false,
      start_date: this.advancedSettings.startDate || '',
      end_date: this.advancedSettings.endDate || '',
      campaign_status_after: this.advancedSettings.campaignStatus || '',
      schedule_status_change: this.advancedSettings.scheduleStatusChange || false,
      status_to_be_set: this.advancedSettings.statusToBeSet || '',
      schedule_date: this.advancedSettings.scheduleDate || '',
      publisher_manual_notify: this.advancedSettings.publisherManualNotify || false,
      publisher_notify_time: this.advancedSettings.publisherNotifyTime || '',

      // Time Targeting
      time_targeting_enabled: this.timeTargeting.enabled || false,
      time_targeting_timezone: this.timeTargeting.timezone || '',
      time_targeting_start_hour: Number(this.timeTargeting.startHour) || 0,
      time_targeting_end_hour: Number(this.timeTargeting.endHour) || 0,
      time_targeting_enable_inactive_hours: this.timeTargeting.enableInactiveHours || false,
      time_targeting_days: this.timeTargeting.days || []
    };

    return request;
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
