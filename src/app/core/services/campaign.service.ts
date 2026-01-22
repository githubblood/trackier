import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
    Campaign,
    CampaignListResponse,
    CampaignCreateResponse,
    CreateCampaignRequest,
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

    // Get list of campaigns
    getCampaigns(params: CampaignListParams = {}): Observable<CampaignListResponse> {
        return this.apiService.get<CampaignListResponse>('/admin/campaigns', { params });
    }

    // Get single campaign detail (stub for now, can be expanded)
    getCampaign(id: number): Observable<any> {
        return this.apiService.get<any>(`/admin/campaign/${id}`);
    }

    // Update campaign status
    updateStatus(id: number, status: string): Observable<any> {
        return this.apiService.post(`/admin/campaign/${id}/status`, { status });
    }
}
