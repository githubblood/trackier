import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

interface ListItem {
  id: number;
  name: string;
  type: string;
}

@Component({
  selector: 'app-team-member-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.scss']
})
export class TeamMemberDetailComponent implements OnInit {
  // ... properties ...
  memberId: number = 0;

  member = {
    id: 456,
    name: 'Amit Kanojiya',
    email: 'amit.k@spaxads.com',
    phone: '',
    status: 'Active',
    role: 'Sub Admin',
    avatarColor: '#e91e63'
  };

  settings = {
    currency: 'INR',
    language: 'English',
    emailNotifications: 'Yes'
  };

  additionalRole = {
    role: 'Affiliate + Advertiser Manager',
    dataVisibility: 'Show all data',
    viewCampaigns: true,
    assignViaTags: true
  };

  // Search filters
  searchAvailable: string = '';
  searchAssigned: string = '';

  // Available and Assigned lists
  availableItems: ListItem[] = [
    { id: 2, name: 'DEMO Publisher', type: 'publisher' },
    { id: 20, name: 'Pixel ads', type: 'publisher' },
    { id: 35, name: 'Ravi Squad Media', type: 'publisher' },
    { id: 36, name: 'Viral Gupta', type: 'publisher' }
  ];

  assignedItems: ListItem[] = [
    { id: 410, name: 'My lead Gaming', type: 'publisher' },
    { id: 423, name: 'DMS', type: 'advertiser' },
    { id: 470, name: 'Adswapper', type: 'advertiser' },
    { id: 430, name: 'Loading Ads', type: 'advertiser' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.memberId = +params['id'];
      this.loadMemberDetails();
    });
  }

  loadMemberDetails(): void {
    // Mock data - would be loaded from API
    const mockMembers: { [key: number]: any } = {
      456: { id: 456, name: 'Amit Kanojiya', email: 'amit.k@spaxads.com', phone: '', status: 'Active', role: 'Sub Admin', avatarColor: '#e91e63' },
      317: { id: 317, name: 'Farik Khan', email: 'farik@spaxads.com', phone: '', status: 'Active', role: 'Sub Admin', avatarColor: '#9c27b0' },
      31: { id: 31, name: 'Shivani', email: 'shivani@spaxads.com', phone: '', status: 'Active', role: 'Admin', avatarColor: '#2196f3' },
      30: { id: 30, name: 'Sanjay', email: 'sanjay@spaxads.com', phone: '', status: 'Active', role: 'Advertiser Manager', avatarColor: '#4caf50' },
      29: { id: 29, name: 'Yash', email: 'yash.q@spaxads.com', phone: '', status: 'Active', role: 'Sub Admin', avatarColor: '#ff9800' }
    };

    if (mockMembers[this.memberId]) {
      this.member = mockMembers[this.memberId];
    }
  }

  getInitials(): string {
    const parts = this.member.name.split(' ');
    if (parts.length >= 2) {
      return parts[0].charAt(0) + parts[1].charAt(0);
    }
    return this.member.name.charAt(0);
  }

  editProfile(): void {
    this.router.navigate(['/profile/edit-details'], { queryParams: { id: this.memberId } });
  }

  editSettings(): void {
    this.router.navigate(['/profile/edit-settings'], { queryParams: { id: this.memberId } });
  }

  saveAdditionalRole(): void {
    console.log('Save additional role:', this.additionalRole);
    console.log('Assigned items:', this.assignedItems);
  }

  getFilteredAvailable(): ListItem[] {
    if (!this.searchAvailable) return this.availableItems;
    const query = this.searchAvailable.toLowerCase();
    return this.availableItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.id.toString().includes(query)
    );
  }

  getFilteredAssigned(): ListItem[] {
    if (!this.searchAssigned) return this.assignedItems;
    const query = this.searchAssigned.toLowerCase();
    return this.assignedItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.id.toString().includes(query)
    );
  }

  assignItem(item: ListItem): void {
    const index = this.availableItems.indexOf(item);
    if (index > -1) {
      this.availableItems.splice(index, 1);
      this.assignedItems.push(item);
    }
  }

  unassignItem(item: ListItem): void {
    const index = this.assignedItems.indexOf(item);
    if (index > -1) {
      this.assignedItems.splice(index, 1);
      this.availableItems.push(item);
    }
  }

  assignAll(): void {
    this.assignedItems = [...this.assignedItems, ...this.availableItems];
    this.availableItems = [];
  }

  unassignAll(): void {
    this.availableItems = [...this.availableItems, ...this.assignedItems];
    this.assignedItems = [];
  }
}
