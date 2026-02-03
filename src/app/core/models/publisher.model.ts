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

export interface PublisherDetail {
    id: number;
    user_id: number;
    uid: string;
    name: string;
    email: string;
    company_name: string;
    website: string;
    traffic_sources: string;
    status: string;
    created_at: string;
    updated_at: string | null;
    // Extended fields
    reference_id?: string;
    manager?: string;
    phone?: string;
    skype?: string;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
    tags?: string | string[];
    tax_id?: string;
    username?: string;
    notes?: string;
}

export interface PublisherDetailResponse {
    success: boolean;
    data: PublisherDetail;
    error?: {
        code: string;
        message: string;
    };
}

export interface AddPublisherResponse {
    success: boolean;
    data: {
        id: number;
        user_id: number;
        email: string;
        name: string;
        company_name: string;
        website: string;
        traffic_sources: string;
        status: string;
        created_at: string;
    };
    message: string;
    error?: {
        code: string;
        message: string;
    };
}

export interface UpdatePublisherResponse {
    success: boolean;
    data: Publisher;
    message: string;
    error?: {
        code: string;
        message: string;
    };
}
