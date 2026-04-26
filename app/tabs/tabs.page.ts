import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

// Tabs page for bottom navigation
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class TabsPage {
  constructor() {}
}