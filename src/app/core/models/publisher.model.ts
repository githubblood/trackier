export interface Publisher {
    id: number;
    user_id: number;
    uid: string;
    name: string;
    email: string;
    company_name: string;
    website?: string;
    status: string;
    created_at: string;
    // UI adaptation fields (optional or mapped)
    last_login?: string;
    reference_id?: string;
    tax_id?: string;
    referred_by?: string;
    manager?: string;
    username?: string;
    country?: string;
    currency?: string;
    city?: string;
    phone?: string;
    signup_ip?: string;
    traffic_channels?: string[];
    tags?: string[];
}

export interface PublisherListResponse {
    success: boolean;
    data: Publisher[];
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

export interface PublisherListParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}
