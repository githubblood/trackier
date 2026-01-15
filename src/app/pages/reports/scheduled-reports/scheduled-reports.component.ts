import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scheduled-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheduled-reports.component.html',
  styleUrls: ['./scheduled-reports.component.scss']
})
export class ScheduledReportsComponent {
  searchQuery = '';
  showCreateModal = false;

  newSchedule = {
    name: '',
    reportType: '',
    frequency: 'daily',
    time: '09:00',
    email: '',
    format: 'csv'
  };

  schedules = [
    { id: 1, name: 'Daily Campaign Summary', reportType: 'Campaign Report', frequency: 'Daily', time: '09:00 AM', email: 'admin@example.com', format: 'CSV', status: 'Active', lastRun: '2026-01-14 09:00:00', nextRun: '2026-01-15 09:00:00' },
    { id: 2, name: 'Weekly Publisher Report', reportType: 'Publisher Report', frequency: 'Weekly', time: '10:00 AM', email: 'manager@example.com', format: 'Excel', status: 'Active', lastRun: '2026-01-13 10:00:00', nextRun: '2026-01-20 10:00:00' },
    { id: 3, name: 'Monthly Conversion Analysis', reportType: 'Conversion Report', frequency: 'Monthly', time: '08:00 AM', email: 'team@example.com', format: 'PDF', status: 'Active', lastRun: '2026-01-01 08:00:00', nextRun: '2026-02-01 08:00:00' },
    { id: 4, name: 'Daily Click Report', reportType: 'Click Report', frequency: 'Daily', time: '18:00 PM', email: 'admin@example.com', format: 'CSV', status: 'Paused', lastRun: '2026-01-10 18:00:00', nextRun: '-' }
  ];

  get filteredData() {
    if (!this.searchQuery) return this.schedules;
    return this.schedules.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.reportType.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getStatusClass(status: string): string {
    return status === 'Active' ? 'bg-success' : 'bg-secondary';
  }

  getFrequencyClass(frequency: string): string {
    switch (frequency) {
      case 'Daily': return 'bg-primary';
      case 'Weekly': return 'bg-info';
      case 'Monthly': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  }

  openCreateModal() { this.showCreateModal = true; }
  closeCreateModal() { this.showCreateModal = false; this.resetForm(); }
  resetForm() {
    this.newSchedule = { name: '', reportType: '', frequency: 'daily', time: '09:00', email: '', format: 'csv' };
  }

  createSchedule() {
    if (this.newSchedule.name && this.newSchedule.reportType && this.newSchedule.email) {
      alert('Schedule "' + this.newSchedule.name + '" created successfully!');
      this.closeCreateModal();
    } else {
      alert('Please fill all required fields');
    }
  }

  editSchedule(id: number) {
    console.log('Editing schedule:', id);
    alert('Edit schedule #' + id);
  }

  toggleSchedule(id: number, currentStatus: string) {
    console.log('Toggling schedule:', id);
    alert(currentStatus === 'Active' ? 'Pausing schedule #' + id : 'Activating schedule #' + id);
  }

  deleteSchedule(id: number) {
    console.log('Deleting schedule:', id);
    alert('Delete schedule #' + id + '?');
  }
}
