// Campaign Report
export interface CampaignReportItem {
    date: string;
    campaign_id: number;
    campaign_name: string;
    clicks: number;
    unique_clicks: number;
    conversions: number;
    payout: number;
    revenue: number;
    cr: number;
    epc: number;
}

export interface CampaignReportParams {
    start_date: string;
    end_date: string;
    campaign_id?: number;
    page?: number;
    limit?: number;
}

export interface CampaignReportResponse {
    success: boolean;
    data: CampaignReportItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
    error?: {
        code: string;
        message: string;
    };
}

// Click Report
export interface ClickReportItem {
    id: number;
    click_id: string;
    campaign_id: number;
    campaign_name: string;
    publisher_id: number;
    publisher_name: string;
    ip_address: string;
    user_agent: string;
    country: string;
    device: string;
    source_id: string;
    sub1: string | null;
    sub2: string | null;
    created_at: string;
}

export interface ClickReportParams {
    start_date: string;
    end_date: string;
    campaign_id?: number;
    publisher_id?: number;
    page?: number;
    limit?: number;
}

export interface ClickReportResponse {
    success: boolean;
    data: ClickReportItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
    error?: {
        code: string;
        message: string;
    };
}

// Conversion Report
export interface ConversionReportItem {
    id: number;
    click_id: string;
    campaign_id: number;
    campaign_name: string;
    publisher_id: number;
    publisher_name: string;
    goal_id: string;
    goal_name: string;
    payout: number;
    revenue: number;
    status: string;
    txn_id: string;
    created_at: string;
}

export interface ConversionReportParams {
    start_date: string;
    end_date: string;
    campaign_id?: number;
    publisher_id?: number;
    status?: string;
    page?: number;
    limit?: number;
}

export interface ConversionReportResponse {
    success: boolean;
    data: ConversionReportItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
    error?: {
        code: string;
        message: string;
    };
}

// Publisher Report
export interface PublisherReportItem {
    publisher_id: number;
    publisher_name: string;
    clicks: number;
    unique_clicks: number;
    conversions: number;
    payout: number;
    cr: number;
    epc: number;
}

export interface PublisherReportParams {
    start_date: string;
    end_date: string;
    page?: number;
    limit?: number;
}

export interface PublisherReportResponse {
    success: boolean;
    data: PublisherReportItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
    error?: {
        code: string;
        message: string;
    };
}

// Advertiser Report
export interface AdvertiserReportItem {
    advertiser_id: number;
    advertiser_name: string;
    offers: number;
    conversions: number;
    revenue: number;
}

export interface AdvertiserReportParams {
    start_date: string;
    end_date: string;
    page?: number;
    limit?: number;
}

export interface AdvertiserReportResponse {
    success: boolean;
    data: AdvertiserReportItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
    error?: {
        code: string;
        message: string;
    };
}
