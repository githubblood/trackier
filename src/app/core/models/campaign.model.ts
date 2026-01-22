// Campaign Goals
export interface CampaignGoal {
    id?: number;
    goal_id: string;
    goal_name: string;
    goal_value: number | string;
    payout: number | string;
    revenue: number | string;
    is_default: boolean;
    cutback_percent: number | string;
}

// Campaign Interface
export interface Campaign {
    id: number;
    uid: string;
    advertiser_id: number;
    advertiser_name?: string;
    title: string;
    description: string;
    preview_url?: string;
    terms_conditions?: string;
    currency: string;
    device: string;
    geo_coverage: string | string[];
    visibility: 'public' | 'private' | 'need_permission';
    tracking_url: string;
    total_clicks?: number;
    status: 'active' | 'paused' | 'archived' | 'pending' | 'expired';
    created_at: string;
    goals?: CampaignGoal[];
}

// Create Campaign Request
export interface CreateCampaignRequest {
    advertiser_id: number;
    title: string;
    description: string;
    preview_url: string;
    terms_conditions: string;
    device: string;
    geo_coverage: string | string[];
    visibility: 'public' | 'private' | 'need_permission';
    total_clicks?: number;
    tracking_url: string;
    goals: CampaignGoal[];
}

// API Responses
export interface CampaignListResponse {
    success: boolean;
    data: Campaign[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface CampaignCreateResponse {
    success: boolean;
    data: Campaign;
    message: string;
}

// List Query Parameters
export interface CampaignListParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    advertiser_id?: number;
    visibility?: string;
}
