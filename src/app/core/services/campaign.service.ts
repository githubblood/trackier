import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
    Campaign,
    CampaignListResponse,
    CampaignCreateResponse,
    CampaignDetailResponse,
    CreateCampaignRequest,
    UpdateCampaignRequest,
    CampaignUpdateResponse,
    CampaignListParams
} from '../models/campaign.model';

@Injectable({
    providedIn: 'root'
})
export class CampaignService {

    constructor(private apiService: ApiService) { }

    // Create a new campaign
    createCampaign(data: CreateCampaignRequest): Observable<CampaignCreateResponse> {
        return this.apiService.post<CampaignCreateResponse>('/admin/campaign/create', data);
    }

    // Update an existing campaign
    updateCampaign(id: number | string, data: UpdateCampaignRequest): Observable<CampaignUpdateResponse> {
        return this.apiService.put<CampaignUpdateResponse>(`/admin/campaign/edit/${id}`, data);
    }

    // Get list of campaigns
    getCampaigns(params: CampaignListParams = {}): Observable<CampaignListResponse> {
        return this.apiService.get<CampaignListResponse>('/admin/campaigns', { params });
    }

    // Get single campaign detail
    getCampaignDetail(id: number | string): Observable<CampaignDetailResponse> {
        return this.apiService.get<CampaignDetailResponse>(`/admin/campaign/manage/${id}`);
    }

    // Update campaign status
    updateStatus(id: number, status: string): Observable<any> {
        return this.apiService.post(`/admin/campaign/${id}/status`, { status });
    }
}
