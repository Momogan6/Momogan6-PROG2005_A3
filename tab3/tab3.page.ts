import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedService, InventoryItem } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab3Page {
  searchName = '';
  editingItem: InventoryItem | null = null;

  constructor(private sharedService: SharedService) {}

  // Load item by name to edit
  loadItem() {
    if (!this.searchName.trim()) {
      alert('Please enter an item name.');
      return;
    }

    const found = this.sharedService.getCurrentItems().find(
      item => item.item_name.toLowerCase() === this.searchName.toLowerCase()
    );

    if (found) {
      this.editingItem = { ...found };
    } else {
      alert('Item not found!');
      this.editingItem = null;
    }
  }

  // Update item with permanent localStorage save
  updateItem() {
    if (!this.editingItem) return;

    // Auto set stock status based on quantity
    if (this.editingItem.quantity <= 0) {
      this.editingItem.stock_status = 'Out of Stock';
    } else if (this.editingItem.quantity <= 5) {
      this.editingItem.stock_status = 'Low Stock';
    } else {
      this.editingItem.stock_status = 'In Stock';
    }

    // Update and save permanently
    this.sharedService.updateItem(this.editingItem);
    alert('Item updated successfully! (Saved permanently)');
    this.resetForm();
  }

  // Delete item with permanent localStorage save
  deleteItem() {
    if (!this.editingItem) return;

    // Prevent deleting Laptop
    if (this.editingItem.item_name.toLowerCase() === 'laptop') {
      alert('Laptop cannot be deleted!');
      return;
    }

    // Delete and save permanently
    this.sharedService.deleteItem(this.editingItem.item_name);
    alert('Item deleted successfully! (Saved permanently)');
    this.resetForm();
  }

  // Reset form
  resetForm() {
    this.searchName = '';
    this.editingItem = null;
  }

  showHelp() {
    alert('Help: Enter item name, load it, then update or delete. Data is saved permanently.');
  }
}