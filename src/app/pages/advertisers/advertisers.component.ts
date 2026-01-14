import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advertisers.component.html',
  styleUrl: './advertisers.component.scss'
})
export class AdvertisersComponent {
  advertisers = [
    { id: 201, name: 'Brand Major', email: 'ads@brandmajor.com', status: 'Active', manager: 'John Doe' },
    { id: 202, name: 'Game Studio', email: 'marketing@gamestudio.com', status: 'Active', manager: 'Sarah Smith' },
    { id: 203, name: 'Finance Corp', email: 'growth@financecorp.com', status: 'Inactive', manager: 'John Doe' },
  ];
}
