import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-postback-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postback-logs.component.html',
  styleUrls: ['./postback-logs.component.scss']
})
export class PostbackLogsComponent {
  searchQuery = '';
  showFilterPanel = false;
  showDownloadMenu = false;
  startDate = '2026-01-14';
  endDate = '2026-01-15';

  filters = {
    campaign: '',
    publisher: '',
    postbackId: '',
    statusCode: 'all'
  };

  postbackLogs = [
    { postbackId: 'PB001', campaign: 'Spingranny- CA- Jan\'26', campaignId: 12345, publisher: 'ATUL Kumar', conversionId: 'CONV001', url: 'https://postback.example.com/track?conv=123', statusCode: 200, response: 'OK', created: '2026-01-14 10:23:45' },
    { postbackId: 'PB002', campaign: 'Winner Casino UK', campaignId: 12346, publisher: 'IG Link', conversionId: 'CONV002', url: 'https://postback.example.com/track?conv=456', statusCode: 200, response: 'Success', created: '2026-01-14 10:22:30' },
    { postbackId: 'PB003', campaign: 'Bet O Bet NL', campaignId: 12347, publisher: 'Shivai Networks', conversionId: 'CONV003', url: 'https://postback.example.com/track?conv=789', statusCode: 500, response: 'Server Error', created: '2026-01-14 10:21:15' },
    { postbackId: 'PB004', campaign: 'Play Ojo AU', campaignId: 12348, publisher: 'Digital Media Pro', conversionId: 'CONV004', url: 'https://postback.example.com/track?conv=321', statusCode: 200, response: 'OK', created: '2026-01-14 10:20:00' },
    { postbackId: 'PB005', campaign: 'Monster Casino DE', campaignId: 12349, publisher: 'AdNetwork Plus', conversionId: 'CONV005', url: 'https://postback.example.com/track?conv=654', statusCode: 404, response: 'Not Found', created: '2026-01-14 10:19:45' }
  ];

  get filteredData() {
    return this.postbackLogs.filter(item => {
      const matchesSearch = !this.searchQuery ||
        item.campaign.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.publisher.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.filters.statusCode === 'all' || item.statusCode.toString() === this.filters.statusCode;
      return matchesSearch && matchesStatus;
    });
  }

  getStatusClass(code: number): string {
    if (code >= 200 && code < 300) return 'bg-success';
    if (code >= 400 && code < 500) return 'bg-warning text-dark';
    if (code >= 500) return 'bg-danger';
    return 'bg-secondary';
  }

  toggleFilterPanel() { this.showFilterPanel = !this.showFilterPanel; }
  closeFilterPanel() { this.showFilterPanel = false; }
  applyFilters() { this.closeFilterPanel(); }
  toggleDownloadMenu() { this.showDownloadMenu = !this.showDownloadMenu; }
  downloadCSV() { console.log('Downloading CSV'); this.showDownloadMenu = false; }
  downloadExcel() { console.log('Downloading Excel'); this.showDownloadMenu = false; }
  downloadPDF() { console.log('Downloading PDF'); this.showDownloadMenu = false; }
}
