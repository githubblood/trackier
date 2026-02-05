export interface EditAdvertiserRequest {
    name: string;
    company_name: string;
    website: string;
    industry: string;
    status: string;
    phone?: string;
    skype?: string;
    tags?: string[];
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    zipcode?: string;
    tax_id?: string;
    reference_id?: string;
    account_manager?: string[];
    password?: string;
}
