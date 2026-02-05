import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CampaignReportResponse, CampaignReportParams } from '../models/report.model';

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

        return this.apiService.get<CampaignReportResponse>('/admin/reports/campaign', queryParams);
    }
}
