import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface AdditionalDataField {
  key: string;
  value: string;
}

@Component({
  selector: 'app-edit-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {
  userName = 'David Arora';

  details = {
    name: 'David Arora',
    email: 'parman@spaxads.com',
    phone: '09906992758'
  };

  additionalDataFields: AdditionalDataField[] = [];

  theme = {
    overridePanel: false,
    selected: 'light'
  };

  privateNotes = '';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  addDataField(): void {
    this.additionalDataFields.push({ key: '', value: '' });
  }

  removeDataField(index: number): void {
    this.additionalDataFields.splice(index, 1);
  }

  selectTheme(themeName: string): void {
    if (this.theme.overridePanel) {
      this.theme.selected = themeName;
    }
  }

  save(): void {
    console.log('Saving details:', this.details);
    console.log('Additional data:', this.additionalDataFields);
    console.log('Theme:', this.theme);
    console.log('Notes:', this.privateNotes);
    this.router.navigate(['/profile']);
  }
}
