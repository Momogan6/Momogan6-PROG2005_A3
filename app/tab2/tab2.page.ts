import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedService, InventoryItem } from '../services/shared.service';

// Page component for adding new inventory items
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab2Page {

  // Initialize empty object for new item
  newItem: InventoryItem = {
    item_name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier_name: '',
    stock_status: 'In Stock',
    featured_item: 0 // 0 = not featured (default)
  };

  // Inject shared data service
  constructor(private sharedService: SharedService) {}

  // Validate and add new item to the inventory
  addNewItem() {
    // Form validation: check required fields
    if (
      !this.newItem.item_name.trim() ||
      !this.newItem.supplier_name.trim() ||
      this.newItem.quantity < 0 ||
      this.newItem.price < 0
    ) {
      alert('Please fill all required fields correctly!');
      return;
    }

    // Auto set stock status based on quantity
    if (this.newItem.quantity <= 0) {
      this.newItem.stock_status = 'Out of Stock';
    } else if (this.newItem.quantity <= 5) {
      this.newItem.stock_status = 'Low Stock';
    } else {
      this.newItem.stock_status = 'In Stock';
    }

    // Ensure featured_item is stored as number (1 or 0)
    const itemToSave = { ...this.newItem };
    itemToSave.featured_item = this.newItem.featured_item === 1 ? 1 : 0;

    // Save item permanently
    this.sharedService.addItem(itemToSave);
    alert('Item added successfully!');
    this.resetForm();
  }

  // Reset form to default empty state
  resetForm() {
    this.newItem = {
      item_name: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplier_name: '',
      stock_status: 'In Stock',
      featured_item: 0
    };
  }

  // Show help information for this page
  showHelp() {
    alert('Help:\n- Fill all required fields\n- Toggle to mark as Featured Item\n- Data is saved permanently');
  }
}