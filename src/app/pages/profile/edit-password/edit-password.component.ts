import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  userName = 'David Arora';
  twoFactorEnabled = false;
  showOldPassword = false;
  showNewPassword = false;

  passwords = {
    oldPassword: '',
    newPassword: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void { }

  save(): void {
    console.log('Saving password settings');
    console.log('2FA Enabled:', this.twoFactorEnabled);
    if (this.passwords.newPassword) {
      console.log('Password will be changed');
    }
    this.router.navigate(['/profile']);
  }
}
