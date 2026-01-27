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
    // Additional optional fields
    currency?: string;
    status?: string;
    objective?: string;
    kpi?: string;
    category?: string[];
    traffic_channels?: string[];
    conversion_tracking?: string;
    primary_tracking_domain?: string;
    conversion_tracking_domain?: string;
    require_terms?: boolean;
    note?: string;
    // Advanced Settings
    default_goal_name?: string;
    default_landing_page_name?: string;
    app_name?: string;
    app_id?: string;
    conversion_flow?: string;
    unsubscribe_url?: string;
    suppression_url?: string;
    external_offer_id?: string;
    redirect_type?: string;
    unique_click_session_duration?: number;
    duplicate_click_action?: boolean;
    duplicate_click_redirect?: string;
    conversion_hold_period?: number;
    conversion_status_after_hold?: string;
    operating_system?: string;
    min_os_version?: string;
    max_os_version?: string;
    carrier_targeting?: string[];
    deep_link?: string;
    allowed_tracking_link_format?: string;
    enable_start_end_date?: boolean;
    start_date?: string;
    end_date?: string;
    campaign_status_after?: string;
    schedule_status_change?: boolean;
    status_to_be_set?: string;
    schedule_date?: string;
    publisher_manual_notify?: boolean;
    publisher_notify_time?: string;
    // Time Targeting
    time_targeting_enabled?: boolean;
    time_targeting_timezone?: string;
    time_targeting_start_hour?: number;
    time_targeting_end_hour?: number;
    time_targeting_enable_inactive_hours?: boolean;
    time_targeting_days?: string[];
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

// Campaign Goal with status (for detail view)
export interface CampaignGoalDetail extends CampaignGoal {
    status: 'active' | 'paused' | 'archived';
}

// Campaign Access (publishers with access)
export interface CampaignAccess {
    id: number;
    publisher_id: number;
    publisher_name: string;
    status: 'approved' | 'pending' | 'rejected';
    requested_at: string;
    approved_at?: string;
}

// Detailed Campaign (for single campaign view)
export interface CampaignDetail {
    id: number;
    uid: string;
    advertiser_id: number;
    advertiser_name: string;
    name: string;
    title: string;
    description: string;
    url: string;
    tracking_url: string;
    preview_url?: string;
    terms_conditions?: string;
    currency: string;
    device: string;
    geo_coverage: string | string[];
    visibility: 'public' | 'private' | 'need_permission';
    total_clicks: number;
    status: 'active' | 'paused' | 'archived' | 'pending' | 'expired';
    created_at: string;
    updated_at?: string | null;
    goals: CampaignGoalDetail[];
    access: CampaignAccess[];
    // Additional fields matching Create/Update
    objective?: string;
    kpi?: string;
    category?: string[];
    traffic_channels?: string[];
    conversion_tracking?: string;
    primary_tracking_domain?: string;
    conversion_tracking_domain?: string;
    require_terms?: boolean;
    note?: string;
    default_goal_name?: string;
    default_landing_page_name?: string;
    app_name?: string;
    app_id?: string;
    conversion_flow?: string;
    unsubscribe_url?: string;
    suppression_url?: string;
    external_offer_id?: string;
    redirect_type?: string;
    unique_click_session_duration?: number;
    duplicate_click_action?: boolean;
    duplicate_click_redirect?: string;
    conversion_hold_period?: number;
    conversion_status_after_hold?: string;
    operating_system?: string;
    min_os_version?: string;
    max_os_version?: string;
    carrier_targeting?: string[];
    deep_link?: string;
    allowed_tracking_link_format?: string;
    enable_start_end_date?: boolean;
    start_date?: string;
    end_date?: string;
    campaign_status_after?: string;
    schedule_status_change?: boolean;
    status_to_be_set?: string;
    schedule_date?: string;
    publisher_manual_notify?: boolean;
    publisher_notify_time?: string;
    time_targeting_enabled?: boolean;
    time_targeting_timezone?: string;
    time_targeting_start_hour?: number;
    time_targeting_end_hour?: number;
    time_targeting_enable_inactive_hours?: boolean;
    time_targeting_days?: string[];
}

// Campaign Detail API Response
export interface CampaignDetailResponse {
    success: boolean;
    data: CampaignDetail;
}

// Update Campaign Request (Partial of Create)
export interface UpdateCampaignRequest extends Partial<CreateCampaignRequest> {
    // any specific fields for update if different
}

export interface CampaignUpdateResponse {
    success: boolean;
    data: CampaignDetail;
    message: string;
}
