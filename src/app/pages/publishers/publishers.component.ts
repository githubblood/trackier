import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publishers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publishers.component.html',
  styleUrl: './publishers.component.scss'
})
export class PublishersComponent {
  publishers = [
    { id: 501, name: 'TopMedia Group', email: 'contact@topmedia.com', status: 'Active', balance: '$1,200.00' },
    { id: 502, name: 'Affiliate King', email: 'admin@affking.com', status: 'Active', balance: '$450.00' },
    { id: 503, name: 'Traffic Source X', email: 'support@trafficx.com', status: 'Pending', balance: '$0.00' },
  ];
}
