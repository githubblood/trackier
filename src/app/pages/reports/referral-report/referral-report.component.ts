import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-referral-report',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './referral-report.component.html',
    styleUrls: ['./referral-report.component.scss']
})
export class ReferralReportComponent {
    searchQuery = '';
    showDownloadMenu = false;
    startDate = '2026-01-01';
    endDate = '2026-01-15';

    referralData = [
        { referrer: 'ATUL Kumar', referrerId: 'P001', referred: 'John Smith', referredId: 'P101', status: 'Active', signupDate: '2026-01-10', bonus: 100, conversions: 45 },
        { referrer: 'IG Link', referrerId: 'P002', referred: 'Jane Doe', referredId: 'P102', status: 'Active', signupDate: '2026-01-08', bonus: 100, conversions: 28 },
        { referrer: 'Shivai Networks', referrerId: 'P003', referred: 'Mike Johnson', referredId: 'P103', status: 'Pending', signupDate: '2026-01-12', bonus: 0, conversions: 0 },
        { referrer: 'Digital Media Pro', referrerId: 'P004', referred: 'Sarah Williams', referredId: 'P104', status: 'Active', signupDate: '2026-01-05', bonus: 150, conversions: 62 },
        { referrer: 'ATUL Kumar', referrerId: 'P001', referred: 'David Brown', referredId: 'P105', status: 'Active', signupDate: '2026-01-03', bonus: 100, conversions: 35 }
    ];

    get filteredData() {
        if (!this.searchQuery) return this.referralData;
        return this.referralData.filter(item =>
            item.referrer.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.referred.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    get totals() {
        return {
            bonus: this.referralData.reduce((sum, item) => sum + item.bonus, 0),
            conversions: this.referralData.reduce((sum, item) => sum + item.conversions, 0)
        };
    }

    toggleDownloadMenu() { this.showDownloadMenu = !this.showDownloadMenu; }
    downloadCSV() { console.log('Downloading CSV'); this.showDownloadMenu = false; }
    downloadExcel() { console.log('Downloading Excel'); this.showDownloadMenu = false; }
    downloadPDF() { console.log('Downloading PDF'); this.showDownloadMenu = false; }
}
