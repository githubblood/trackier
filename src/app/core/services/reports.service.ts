import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
    CampaignReportResponse,
    CampaignReportParams,
    ClickReportResponse,
    ClickReportParams,
    ConversionReportResponse,
    ConversionReportParams,
    PublisherReportResponse,
    PublisherReportParams,
    AdvertiserReportResponse,
    AdvertiserReportParams
} from '../models/report.model';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {

    constructor(private apiService: ApiService) { }

    getCampaignReport(params: CampaignReportParams): Observable<CampaignReportResponse> {
        const queryParams: any = {
            start_date: params.start_date,
            end_date: params.end_date
        };

        if (params.campaign_id) queryParams.campaign_id = params.campaign_id;
        if (params.page) queryParams.page = params.page;
        if (params.limit) queryParams.limit = params.limit;

        return this.apiService.get<CampaignReportResponse>('/admin/reports/campaign', { params: queryParams });
    }

    getClickReport(params: ClickReportParams): Observable<ClickReportResponse> {
        const queryParams: any = {
            start_date: params.start_date,
            end_date: params.end_date
        };

        if (params.campaign_id) queryParams.campaign_id = params.campaign_id;
        if (params.publisher_id) queryParams.publisher_id = params.publisher_id;
        if (params.page) queryParams.page = params.page;
        if (params.limit) queryParams.limit = params.limit;

        return this.apiService.get<ClickReportResponse>('/admin/reports/click', { params: queryParams });
    }

    getConversionReport(params: ConversionReportParams): Observable<ConversionReportResponse> {
        const queryParams: any = {
            start_date: params.start_date,
            end_date: params.end_date
        };

        if (params.campaign_id) queryParams.campaign_id = params.campaign_id;
        if (params.publisher_id) queryParams.publisher_id = params.publisher_id;
        if (params.status) queryParams.status = params.status;
        if (params.page) queryParams.page = params.page;
        if (params.limit) queryParams.limit = params.limit;

        return this.apiService.get<ConversionReportResponse>('/admin/reports/conversion', { params: queryParams });
    }

    getPublisherReport(params: PublisherReportParams): Observable<PublisherReportResponse> {
        const queryParams: any = {
            start_date: params.start_date,
            end_date: params.end_date
        };

        if (params.page) queryParams.page = params.page;
        if (params.limit) queryParams.limit = params.limit;

        return this.apiService.get<PublisherReportResponse>('/admin/reports/publishers', { params: queryParams });
    }

    getAdvertiserReport(params: AdvertiserReportParams): Observable<AdvertiserReportResponse> {
        const queryParams: any = {
            start_date: params.start_date,
            end_date: params.end_date
        };

        if (params.page) queryParams.page = params.page;
        if (params.limit) queryParams.limit = params.limit;

        return this.apiService.get<AdvertiserReportResponse>('/admin/reports/advertisers', { params: queryParams });
    }
}



