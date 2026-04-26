import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface InventoryItem {
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  featured_item: number;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private readonly STORAGE_KEY = 'inventory_data';
  private itemsSubject = new BehaviorSubject<InventoryItem[]>([]);
  public items$ = this.itemsSubject.asObservable();

  constructor() {
    this.loadSavedData();
  }

  // Load data from localStorage on app start
  private loadSavedData() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.itemsSubject.next(JSON.parse(saved));
    } else {
      const defaultItems: InventoryItem[] = [
        { item_name: "Laptop", category: "Electronics", quantity: 15, price: 999, supplier_name: "Tech Corp", stock_status: "In Stock", featured_item: 1 },
        { item_name: "Phone", category: "Electronics", quantity: 8, price: 699, supplier_name: "Mobile Inc", stock_status: "In Stock", featured_item: 1 },
        { item_name: "Keyboard", category: "Electronics", quantity: 3, price: 49, supplier_name: "Accessory Co", stock_status: "Low Stock", featured_item: 0 },
        { item_name: "Office Chair", category: "Furniture", quantity: 10, price: 199, supplier_name: "Furnish Ltd", stock_status: "In Stock", featured_item: 1 },
        { item_name: "Desk", category: "Furniture", quantity: 2, price: 299, supplier_name: "Home Goods", stock_status: "Low Stock", featured_item: 0 },
        { item_name: "T-Shirt", category: "Clothing", quantity: 50, price: 19, supplier_name: "Fashion Wear", stock_status: "In Stock", featured_item: 1 },
        { item_name: "Jacket", category: "Clothing", quantity: 1, price: 89, supplier_name: "Outerwear Pro", stock_status: "Out of Stock", featured_item: 0 },
        { item_name: "Hammer", category: "Tools", quantity: 12, price: 12, supplier_name: "Hardware Shop", stock_status: "In Stock", featured_item: 1 },
        { item_name: "Drill Machine", category: "Tools", quantity: 4, price: 79, supplier_name: "Power Tools", stock_status: "Low Stock", featured_item: 0 },
      ];
      this.itemsSubject.next(defaultItems);
      this.saveToLocalStorage(defaultItems);
    }
  }

  private saveToLocalStorage(items: InventoryItem[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  getCurrentItems(): InventoryItem[] {
    return this.itemsSubject.value;
  }

  addItem(item: InventoryItem) {
    const current = this.getCurrentItems();
    const updated = [...current, item];
    this.itemsSubject.next(updated);
    this.saveToLocalStorage(updated);
  }

  updateItem(updatedItem: InventoryItem) {
    const current = this.getCurrentItems();
    const index = current.findIndex(i => i.item_name.toLowerCase() === updatedItem.item_name.toLowerCase());
    if (index !== -1) {
      current[index] = { ...updatedItem };
      this.itemsSubject.next([...current]);
      this.saveToLocalStorage(current);
    }
  }

  deleteItem(itemName: string) {
    const current = this.getCurrentItems();
    const filtered = current.filter(i => i.item_name.toLowerCase() !== itemName.toLowerCase());
    this.itemsSubject.next(filtered);
    this.saveToLocalStorage(filtered);
  }
}