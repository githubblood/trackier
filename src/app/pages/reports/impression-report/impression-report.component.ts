import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-impression-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './impression-report.component.html',
  styleUrls: ['./impression-report.component.scss']
})
export class ImpressionReportComponent {
  searchQuery = '';
  showFilterPanel = false;
  showDownloadMenu = false;
  startDate = '2026-01-14';
  endDate = '2026-01-15';

  filters = {
    campaign: '',
    publisher: '',
    advertiser: '',
    impressionId: '',
    p1: ''
  };

  impressions = [
    { impressionId: 'IMP001', publisher: 'ATUL Kumar', publisherId: 'P001', campaign: 'Spingranny- CA- Jan\'26', campaignId: 12345, advertiser: 'Fomento Shivani', p1: 'sub123', device: 'Mobile', os: 'iOS', country: 'CA', created: '2026-01-14 10:23:45' },
    { impressionId: 'IMP002', publisher: 'IG Link', publisherId: 'P002', campaign: 'Winner Casino UK', campaignId: 12346, advertiser: 'Li- David', p1: 'sub456', device: 'Desktop', os: 'Windows', country: 'UK', created: '2026-01-14 10:22:30' },
    { impressionId: 'IMP003', publisher: 'Shivai Networks', publisherId: 'P003', campaign: 'Bet O Bet NL', campaignId: 12347, advertiser: 'AdNetwork Inc', p1: 'sub789', device: 'Mobile', os: 'Android', country: 'NL', created: '2026-01-14 10:21:15' },
    { impressionId: 'IMP004', publisher: 'Digital Media Pro', publisherId: 'P004', campaign: 'Play Ojo AU', campaignId: 12348, advertiser: 'Global Media', p1: 'sub321', device: 'Tablet', os: 'iOS', country: 'AU', created: '2026-01-14 10:20:00' },
    { impressionId: 'IMP005', publisher: 'AdNetwork Plus', publisherId: 'P005', campaign: 'Monster Casino DE', campaignId: 12349, advertiser: 'Digital Ventures', p1: 'sub654', device: 'Mobile', os: 'Android', country: 'DE', created: '2026-01-14 10:19:45' }
  ];

  get filteredData() {
    return this.impressions.filter(item => {
      const matchesSearch = !this.searchQuery ||
        item.publisher.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.campaign.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesSearch;
    });
  }

  toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
  closeFilterPanel() { this.showFilterPanel = false; }
  applyFilters() { this.closeFilterPanel(); }
  toggleDownloadMenu() { this.showDownloadMenu = !this.showDownloadMenu; }
  downloadCSV() { console.log('Downloading CSV'); this.showDownloadMenu = false; }
  downloadExcel() { console.log('Downloading Excel'); this.showDownloadMenu = false; }
  downloadPDF() { console.log('Downloading PDF'); this.showDownloadMenu = false; }
}
