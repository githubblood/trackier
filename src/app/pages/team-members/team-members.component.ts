import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  avatarColor: string;
  phone?: string;
  skype?: string;
}

interface Permission {
  name: string;
  checked: boolean;
}

interface PermissionGroup {
  name: string;
  hasAccess: boolean;
  permissions: Permission[];
}

interface AdditionalDataField {
  key: string;
  value: string;
}

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  searchQuery: string = '';
  showAddModal: boolean = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 25;

  // Additional Data Fields
  additionalDataFields: AdditionalDataField[] = [];

  // New member form
  newMember = {
    name: '',
    email: '',
    role: 'Sub Admin',
    password: '',
    phone: '',
    skype: '',
    status: 'Active',
    notifyEmail: false
  };

  // Permission groups
  permissionGroups: PermissionGroup[] = [
    {
      name: 'Link Management',
      hasAccess: false,
      permissions: [
        { name: 'View', checked: false },
        { name: 'Create', checked: false },
        { name: 'Export', checked: false },
        { name: 'Edit', checked: false },
        { name: 'Delete', checked: false },
        { name: 'Full Access', checked: false }
      ]
    },
    {
      name: 'Team Member Management',
      hasAccess: false,
      permissions: [
        { name: 'View', checked: false },
        { name: 'Create', checked: false },
        { name: 'Export', checked: false },
        { name: 'Edit', checked: false },
        { name: 'Delete', checked: false },
        { name: 'Full Access', checked: false }
      ]
    },
    {
      name: 'Invoice Management',
      hasAccess: false,
      permissions: [
        { name: 'View', checked: false },
        { name: 'Create', checked: false },
        { name: 'Export', checked: false },
        { name: 'Edit', checked: false },
        { name: 'Delete', checked: false },
        { name: 'Full Access', checked: false }
      ]
    },
    {
      name: 'Automation',
      hasAccess: false,
      permissions: [
        { name: 'View', checked: false },
        { name: 'Create', checked: false },
        { name: 'Export', checked: false },
        { name: 'Edit', checked: false },
        { name: 'Delete', checked: false },
        { name: 'Full Access', checked: false }
      ]
    },
    {
      name: 'Sampling Management',
      hasAccess: false,
      permissions: [
        { name: 'View', checked: false },
        { name: 'Create', checked: false },
        { name: 'Export', checked: false },
        { name: 'Edit', checked: false },
        { name: 'Delete', checked: false },
        { name: 'Full Access', checked: false }
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  loadTeamMembers(): void {
    this.teamMembers = [
      { id: 456, name: 'Amit Kanojiya', email: 'amit.k@spaxads.com', role: 'Sub Admin', status: 'Active', lastLogin: 'December 26, 2025 at 5:58 pm', avatarColor: '#e91e63' },
      { id: 317, name: 'Farik Khan', email: 'farik@spaxads.com', role: 'Sub Admin', status: 'Active', lastLogin: 'January 15, 2026 at 4:37 pm', avatarColor: '#9c27b0' },
      { id: 31, name: 'Shivani', email: 'shivani@spaxads.com', role: 'Admin', status: 'Active', lastLogin: 'June 4, 2025 at 12:11 pm', avatarColor: '#2196f3' },
      { id: 30, name: 'Sanjay', email: 'sanjay@spaxads.com', role: 'Advertiser Manager', status: 'Active', lastLogin: '', avatarColor: '#4caf50' },
      { id: 29, name: 'Yash', email: 'yash.q@spaxads.com', role: 'Sub Admin', status: 'Active', lastLogin: '', avatarColor: '#ff9800' }
    ];
  }

  get filteredMembers(): TeamMember[] {
    if (!this.searchQuery) return this.teamMembers;
    const query = this.searchQuery.toLowerCase();
    return this.teamMembers.filter(m =>
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query)
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredMembers.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getStatusClass(status: string): string {
    return status === 'Active' ? 'status-active' : 'status-disabled';
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.resetForm();
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  resetForm(): void {
    this.newMember = {
      name: '',
      email: '',
      role: 'Sub Admin',
      password: '',
      phone: '',
      skype: '',
      status: 'Active',
      notifyEmail: false
    };
    this.additionalDataFields = [];
    this.permissionGroups.forEach(group => {
      group.permissions.forEach(perm => perm.checked = false);
      group.hasAccess = false;
    });
  }

  addDataField(): void {
    this.additionalDataFields.push({ key: '', value: '' });
  }

  removeDataField(index: number): void {
    this.additionalDataFields.splice(index, 1);
  }

  saveMember(): void {
    console.log('Saving member:', this.newMember);
    console.log('Additional Data:', this.additionalDataFields);
    this.closeAddModal();
    this.loadTeamMembers();
  }

  editMember(member: TeamMember): void {
    console.log('Edit member:', member);
    this.router.navigate(['/team-members', member.id]);
  }

  toggleStatus(member: TeamMember): void {
    member.status = member.status === 'Active' ? 'Disabled' : 'Active';
    console.log('Toggle status:', member);
  }

  deleteMember(member: TeamMember): void {
    console.log('Delete member:', member);
  }

  loginAs(member: TeamMember): void {
    console.log('Login as:', member);
  }

  checkAllPermissions(): void {
    this.permissionGroups.forEach(group => {
      group.hasAccess = true;
      group.permissions.forEach(perm => perm.checked = true);
    });
  }

  uncheckAllPermissions(): void {
    this.permissionGroups.forEach(group => {
      group.hasAccess = false;
      group.permissions.forEach(perm => perm.checked = false);
    });
  }
}
