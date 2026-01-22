export interface DashboardStats {
    clicks: StatPeriod;
    unique_clicks: StatPeriod;
    conversions: StatPeriod;
    impressions: StatPeriod;
    payout: StatPeriod;
    revenue: StatPeriod;
}

export interface StatPeriod {
    today: number;
    yesterday: number;
    mtd: number;
}

export interface CampaignStatus {
    active: number;
    paused: number;
    pending: number;
    disabled: number;
    expired: number;
}

export interface AnalyticsData {
    date: string;
    clicks: number;
    unique_clicks: number;
    conversions: number;
    payout: number;
    revenue: number;
}

export interface DashboardData {
    stats: DashboardStats;
    campaign_status: CampaignStatus;
    analytics: AnalyticsData[];
}

export interface DashboardResponse {
    success: boolean;
    data: DashboardData;
}
