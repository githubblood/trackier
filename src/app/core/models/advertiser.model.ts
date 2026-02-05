export interface Advertiser {
    id: number;
    user_id: number;
    uid: string;
    name: string;
    email: string;
    company_name: string;
    website?: string;
    industry?: string;
    status: string;
    created_at: string;
    // UI adaptation fields (optional)
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
    tags?: string[];
}

export interface AdvertiserListResponse {
    success: boolean;
    data: Advertiser[];
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

export interface AdvertiserListParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}

export interface AdvertiserDetail {
    id: number;
    user_id: number;
    uid: string;
    name: string;
    email: string;
    company_name: string;
    website: string;
    industry: string;
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

export interface AdvertiserDetailResponse {
    success: boolean;
    data: AdvertiserDetail;
    error?: {
        code: string;
        message: string;
    };
}

export interface AddAdvertiserResponse {
    success: boolean;
    data: {
        id: number;
        user_id: number;
        email: string;
        name: string;
        company_name: string;
        website: string;
        industry: string;
        status: string;
        created_at: string;
    };
    message: string;
    error?: {
        code: string;
        message: string;
    };
}

export interface EditAdvertiserResponse {
    success: boolean;
    data: AdvertiserDetail;
    message: string;
    error?: {
        code: string;
        message: string;
    };
}
