import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AdvertiserListResponse, AdvertiserListParams, AdvertiserDetailResponse, AddAdvertiserResponse, EditAdvertiserResponse } from '../models/advertiser.model';
import { AddAdvertiserRequest } from '../models/requests/addAdvertiserRequest';
import { EditAdvertiserRequest } from '../models/requests/editAdvertiserRequest';

@Injectable({
    providedIn: 'root'
})
export class AdvertiserService {

    constructor(private apiService: ApiService) { }

    getAdvertisers(params?: AdvertiserListParams): Observable<AdvertiserListResponse> {
        const queryParams: any = {
            page: params?.page || 1,
            limit: params?.limit || 10,
            search: params?.search || '',
            status: params?.status || ''
        };

        return this.apiService.get<AdvertiserListResponse>('/admin/advertisers', queryParams);
    }

    getAdvertiserById(id: number): Observable<AdvertiserDetailResponse> {
        return this.apiService.get<AdvertiserDetailResponse>(`/admin/advertiser/manage/${id}`);
    }

    addAdvertiser(request: AddAdvertiserRequest): Observable<AddAdvertiserResponse> {
        return this.apiService.post<AddAdvertiserResponse>('/admin/advertiser/add', request);
    }

    editAdvertiser(id: number, request: EditAdvertiserRequest): Observable<EditAdvertiserResponse> {
        return this.apiService.put<EditAdvertiserResponse>(`/admin/advertiser/edit/${id}`, request);
    }
}
