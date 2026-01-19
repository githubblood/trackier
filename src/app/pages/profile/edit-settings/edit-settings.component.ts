import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Permission {
  name: string;
  checked: boolean;
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

@Component({
  selector: 'app-edit-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent implements OnInit {
  userName = 'David Arora';

  settings = {
    currency: 'INR',
    language: 'English',
    additionalRole: 'Affiliate + Advertiser Manager',
    skype: ''
  };

  conversionAccess = 'viewEdit';
  couponCodeModuleAccess = 'no';
  dealModuleAccess = 'no';

  // Report KPI Selection
  allReportKPIs: string[] = [
    'Unique Clicks', 'Rejected Clicks', 'Clicks', 'Gross Clicks',
    'Impressions', 'Rejected Impressions', 'Campaign Payout', 'Campaign Revenue'
  ];
  selectedReportKPIs: string[] = [];
  reportKPISearch = '';

  // Conversion Report KPI Selection
  allConversionKPIs: string[] = [
    'Conversion Id', 'Click ID', 'Source', 'Click to Conversion Time',
    'Install to Event - Elapsed Time', 'Conversion Method'
  ];
  selectedConversionKPIs: string[] = [];
  conversionKPISearch = '';

  permissionGroups: PermissionGroup[] = [
    {
      name: 'Link Management',
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

  ngOnInit(): void { }

  hasAnyPermission(group: PermissionGroup): boolean {
    return group.permissions.some(p => p.checked);
  }

  checkAll(): void {
    this.permissionGroups.forEach(group => {
      group.permissions.forEach(perm => perm.checked = true);
    });
  }

  uncheckAll(): void {
    this.permissionGroups.forEach(group => {
      group.permissions.forEach(perm => perm.checked = false);
    });
  }

  // Report KPI methods
  get filteredReportKPIs(): string[] {
    return this.allReportKPIs.filter(kpi =>
      !this.selectedReportKPIs.includes(kpi) &&
      kpi.toLowerCase().includes(this.reportKPISearch.toLowerCase())
    );
  }

  addReportKPI(kpi: string): void {
    if (!this.selectedReportKPIs.includes(kpi)) {
      this.selectedReportKPIs.push(kpi);
    }
  }

  removeReportKPI(kpi: string): void {
    this.selectedReportKPIs = this.selectedReportKPIs.filter(k => k !== kpi);
  }

  // Conversion Report KPI methods
  get filteredConversionKPIs(): string[] {
    return this.allConversionKPIs.filter(kpi =>
      !this.selectedConversionKPIs.includes(kpi) &&
      kpi.toLowerCase().includes(this.conversionKPISearch.toLowerCase())
    );
  }

  addConversionKPI(kpi: string): void {
    if (!this.selectedConversionKPIs.includes(kpi)) {
      this.selectedConversionKPIs.push(kpi);
    }
  }

  removeConversionKPI(kpi: string): void {
    this.selectedConversionKPIs = this.selectedConversionKPIs.filter(k => k !== kpi);
  }

  save(): void {
    console.log('Saving settings:', this.settings);
    console.log('Permissions:', this.permissionGroups);
    console.log('Conversion Access:', this.conversionAccess);
    console.log('Coupon Code Module:', this.couponCodeModuleAccess);
    console.log('Deal Module:', this.dealModuleAccess);
    console.log('Report KPIs:', this.selectedReportKPIs);
    console.log('Conversion KPIs:', this.selectedConversionKPIs);
    this.router.navigate(['/profile']);
  }
}
