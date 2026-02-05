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
