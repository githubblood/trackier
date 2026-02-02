import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PublisherListResponse, PublisherListParams, PublisherDetailResponse, AddPublisherRequest, AddPublisherResponse } from '../models/publisher.model';

@Injectable({
    providedIn: 'root'
})
export class PublisherService {
    constructor(private apiService: ApiService) { }

    getPublishers(params: PublisherListParams = {}): Observable<PublisherListResponse> {
        const queryParams: any = {
            page: params.page || 1,
            limit: params.limit || 10
        };

        if (params.search) {
            queryParams.search = params.search;
        }
        if (params.status) {
            queryParams.status = params.status;
        }

        return this.apiService.get<PublisherListResponse>('/admin/publishers', { params: queryParams });
    }

    getPublisherById(id: number): Observable<PublisherDetailResponse> {
        return this.apiService.get<PublisherDetailResponse>(`/admin/publisher/manage/${id}`);
    }

    addPublisher(data: AddPublisherRequest): Observable<AddPublisherResponse> {
        return this.apiService.post<AddPublisherResponse>('/admin/publisher/add', data);
    }
}
