import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Privacy and security page
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class PrivacyPage {
  constructor() {}

  // Show help information for privacy page
  showHelp() {
    alert('Help:\n- This page explains app privacy policy\n- All data is stored locally on your device\n- No data is shared with third parties');
  }
}