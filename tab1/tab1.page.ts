import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedService, InventoryItem } from '../services/shared.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab1Page implements OnInit {
  inventoryList: InventoryItem[] = [];
  searchKeyword = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    // Subscribe to shared data updates
    this.sharedService.items$.subscribe(items => {
      this.inventoryList = items;
    });
  }

  // Filter items based on search keyword
  searchItem() {
    if (!this.searchKeyword.trim()) {
      this.inventoryList = this.sharedService.getCurrentItems();
      return;
    }

    this.inventoryList = this.sharedService.getCurrentItems().filter(item =>
      item.item_name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  showHelp() {
    alert('Help: Browse or search inventory items. New items will appear here after being added.');
  }
}