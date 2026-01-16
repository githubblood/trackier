import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface PostbackPixel {
  id: number;
  publisherId: number;
  publisherName: string;
  campaignId: number | null;
  campaignName: string;
  status: string;
  event: string;
  type: string;
  code: string;
}

@Component({
  selector: 'app-postbacks-pixels',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './postbacks-pixels.component.html',
  styleUrls: ['./postbacks-pixels.component.scss']
})
export class PostbacksPixelsComponent {
  showFilterPanel = false;
  showBulkDropdown = false;
  perPage = 100;
  searchQuery = '';
  selectAll = false;

  // Filter values
  filters = {
    campaign: '',
    publisher: '',
    eventType: '',
    status: '',
    pixelType: ''
  };

  // Campaign options
  campaignOptions = [
    { id: 12345, name: 'Spingranny- CA- Jan\'26' },
    { id: 12346, name: 'Winner Casino UK' },
    { id: 12347, name: 'Bet O Bet NL' },
    { id: 12348, name: 'Play Ojo AU' },
    { id: 12349, name: 'Monster Casino DE' },
    { id: 12340, name: 'Growe Demat' },
    { id: 12335, name: 'Poker Circle' },
    { id: 12354, name: 'Ace23 Rummy CPI' }
  ];

  // Publisher options
  publisherOptions = [
    { id: 43, name: 'shikhar Chouhan' },
    { id: 45, name: 'shikhar Chouhan' },
    { id: 35, name: 'Ravi Squad Media' },
    { id: 51, name: 'Vivek Growmore' },
    { id: 47, name: 'Vikas' },
    { id: 57, name: 'Free Foketi' },
    { id: 64, name: 'Ajeet' },
    { id: 70, name: 'Redeffox' },
    { id: 65, name: 'Divyanshu' },
    { id: 34, name: 'Ram Spaagds' }
  ];

  // Event type options
  eventTypeOptions = [
    { value: 'conversion', label: 'Conversion' },
    { value: 'registration', label: 'Goal: Registration' },
    { value: 'af_purchase', label: 'Goal: af_purchase' },
    { value: 'install', label: 'Goal: Install' },
    { value: 'all_goals', label: 'Goal: All Goals' }
  ];

  // Status options
  statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  // Pixel type options
  pixelTypeOptions = [
    { value: 'postback', label: 'Postback' },
    { value: 'html', label: 'HTML Pixel' },
    { value: 'javascript', label: 'JavaScript Pixel' }
  ];

  // Postbacks & Pixels data
  postbacksPixels: PostbackPixel[] = [
    { id: 1, publisherId: 43, publisherName: 'shikhar Chouhan', campaignId: null, campaignName: 'All Campaigns', status: 'Active', event: 'conversion', type: 'Postback', code: 'https://postback.example.com/track?click_id={click_id}' },
    { id: 2, publisherId: 43, publisherName: 'shikhar Chouhan', campaignId: 15, campaignName: 'Poker Circle', status: 'Active', event: 'Goal: Registration', type: 'Postback', code: 'https://postback.example.com/goal?goal_id=reg' },
    { id: 3, publisherId: 35, publisherName: 'Ravi Squad Media', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: af_purchase', type: 'Postback', code: 'https://postback.example.com/purchase' },
    { id: 4, publisherId: 51, publisherName: 'Vivek Growmore', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: af_purchase', type: 'Postback', code: 'https://postback.example.com/purchase' },
    { id: 5, publisherId: 47, publisherName: 'Vikas', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: All Goals', type: 'Postback', code: 'https://postback.example.com/all' },
    { id: 6, publisherId: 35, publisherName: 'Ravi Squad Media', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: registration', type: 'Postback', code: 'https://postback.example.com/reg' },
    { id: 7, publisherId: 57, publisherName: 'Free Foketi', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: All Goals', type: 'Postback', code: 'https://postback.example.com/all' },
    { id: 8, publisherId: 57, publisherName: 'Free Foketi', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: registration', type: 'Postback', code: 'https://postback.example.com/reg' },
    { id: 9, publisherId: 57, publisherName: 'Free Foketi', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: af_purchase', type: 'Postback', code: 'https://postback.example.com/purchase' },
    { id: 10, publisherId: 47, publisherName: 'Vikas', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: registration', type: 'Postback', code: 'https://postback.example.com/reg' },
    { id: 11, publisherId: 47, publisherName: 'Vikas', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: All Goals', type: 'Postback', code: 'https://postback.example.com/all' },
    { id: 12, publisherId: 64, publisherName: 'Ajeet', campaignId: null, campaignName: 'All Campaigns', status: 'Active', event: 'conversion', type: 'Postback', code: 'https://postback.example.com/conv' },
    { id: 13, publisherId: 70, publisherName: 'Redeffox', campaignId: 154, campaignName: 'Ace23 Rummy CPI', status: 'Active', event: 'Goal: Install', type: 'Postback', code: 'https://postback.example.com/install' },
    { id: 14, publisherId: 65, publisherName: 'Divyanshu', campaignId: null, campaignName: 'All Campaigns', status: 'Active', event: 'conversion', type: 'Postback', code: 'https://postback.example.com/conv' },
    { id: 15, publisherId: 64, publisherName: 'Ajeet', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: All Goals', type: 'Postback', code: 'https://postback.example.com/all' },
    { id: 16, publisherId: 64, publisherName: 'Ajeet', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: registration', type: 'Postback', code: 'https://postback.example.com/reg' },
    { id: 17, publisherId: 64, publisherName: 'Ajeet', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: af_purchase', type: 'Postback', code: 'https://postback.example.com/purchase' },
    { id: 18, publisherId: 34, publisherName: 'Ram Spaagds', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: af_purchase', type: 'Postback', code: 'https://postback.example.com/purchase' },
    { id: 19, publisherId: 34, publisherName: 'Ram Spaagds', campaignId: 12, campaignName: 'Growe Demat', status: 'Active', event: 'Goal: registration', type: 'Postback', code: 'https://postback.example.com/reg' }
  ];

  selectedItems: Set<number> = new Set();

  get filteredData(): PostbackPixel[] {
    return this.postbacksPixels.filter(item => {
      const matchesSearch = !this.searchQuery ||
        item.publisherName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.campaignName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCampaign = !this.filters.campaign ||
        (item.campaignId && item.campaignId.toString() === this.filters.campaign);

      const matchesPublisher = !this.filters.publisher ||
        item.publisherId.toString() === this.filters.publisher;

      const matchesStatus = !this.filters.status ||
        item.status.toLowerCase() === this.filters.status;

      const matchesPixelType = !this.filters.pixelType ||
        item.type.toLowerCase() === this.filters.pixelType;

      return matchesSearch && matchesCampaign && matchesPublisher && matchesStatus && matchesPixelType;
    });
  }

  get totalCount(): number {
    return 362; // Static count as shown in Trackier
  }

  constructor(private router: Router) { }

  toggleFilterPanel(): void {
    this.showFilterPanel = !this.showFilterPanel;
  }

  closeFilterPanel(): void {
    this.showFilterPanel = false;
  }

  applyFilters(): void {
    this.closeFilterPanel();
  }

  resetFilters(): void {
    this.filters = {
      campaign: '',
      publisher: '',
      eventType: '',
      status: '',
      pixelType: ''
    };
  }

  exportData(): void {
    console.log('Exporting data...');
    this.closeFilterPanel();
  }

  toggleSelectAll(): void {
    if (this.selectAll) {
      this.filteredData.forEach(item => this.selectedItems.add(item.id));
    } else {
      this.selectedItems.clear();
    }
  }

  toggleItemSelection(id: number): void {
    if (this.selectedItems.has(id)) {
      this.selectedItems.delete(id);
    } else {
      this.selectedItems.add(id);
    }
    this.selectAll = this.selectedItems.size === this.filteredData.length;
  }

  isSelected(id: number): boolean {
    return this.selectedItems.has(id);
  }

  toggleBulkDropdown(): void {
    this.showBulkDropdown = !this.showBulkDropdown;
  }

  bulkDelete(): void {
    console.log('Deleting selected items:', Array.from(this.selectedItems));
    this.showBulkDropdown = false;
  }

  viewCode(item: PostbackPixel): void {
    alert('Postback URL:\n' + item.code);
  }

  editPostback(item: PostbackPixel): void {
    this.router.navigate(['/publishers/postbacks-pixels/edit', item.id]);
  }

  viewLogs(item: PostbackPixel): void {
    this.router.navigate(['/publishers/postbacks-pixels/logs', item.id]);
  }

  deletePostback(item: PostbackPixel): void {
    if (confirm(`Are you sure you want to delete postback #${item.id}?`)) {
      this.postbacksPixels = this.postbacksPixels.filter(p => p.id !== item.id);
    }
  }
}
