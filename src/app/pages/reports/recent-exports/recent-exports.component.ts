import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recent-exports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recent-exports.component.html',
  styleUrls: ['./recent-exports.component.scss']
})
export class RecentExportsComponent {
  searchQuery = '';

  exports = [
    { fileName: 'Campaign_Report_2026-01-14.csv', reportType: 'Campaign Report', format: 'CSV', size: '2.4 MB', status: 'Ready', createdBy: 'Admin', created: '2026-01-14 15:30:00', expiresAt: '2026-01-21 15:30:00' },
    { fileName: 'Publisher_Report_2026-01-14.xlsx', reportType: 'Publisher Report', format: 'Excel', size: '1.8 MB', status: 'Ready', createdBy: 'Manager', created: '2026-01-14 14:15:00', expiresAt: '2026-01-21 14:15:00' },
    { fileName: 'Conversion_Report_2026-01-13.pdf', reportType: 'Conversion Report', format: 'PDF', size: '856 KB', status: 'Ready', createdBy: 'Admin', created: '2026-01-13 10:45:00', expiresAt: '2026-01-20 10:45:00' },
    { fileName: 'Click_Report_2026-01-13.csv', reportType: 'Click Report', format: 'CSV', size: '5.2 MB', status: 'Processing', createdBy: 'Manager', created: '2026-01-13 09:30:00', expiresAt: '2026-01-20 09:30:00' },
    { fileName: 'Daily_Report_2026-01-12.xlsx', reportType: 'Daily Report', format: 'Excel', size: '3.1 MB', status: 'Ready', createdBy: 'Admin', created: '2026-01-12 16:00:00', expiresAt: '2026-01-19 16:00:00' },
    { fileName: 'Cohort_Report_2026-01-12.csv', reportType: 'Cohort Report', format: 'CSV', size: '1.2 MB', status: 'Expired', createdBy: 'Admin', created: '2026-01-05 12:00:00', expiresAt: '2026-01-12 12:00:00' }
  ];

  get filteredData() {
    if (!this.searchQuery) return this.exports;
    return this.exports.filter(item =>
      item.fileName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.reportType.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Ready': return 'bg-success';
      case 'Processing': return 'bg-warning text-dark';
      case 'Expired': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  getFormatIcon(format: string): string {
    switch (format) {
      case 'CSV': return 'fa-file-csv';
      case 'Excel': return 'fa-file-excel';
      case 'PDF': return 'fa-file-pdf';
      default: return 'fa-file';
    }
  }

  downloadFile(fileName: string) {
    console.log('Downloading:', fileName);
    alert('Downloading ' + fileName);
  }

  deleteFile(fileName: string) {
    console.log('Deleting:', fileName);
    alert('Are you sure you want to delete ' + fileName + '?');
  }
}
