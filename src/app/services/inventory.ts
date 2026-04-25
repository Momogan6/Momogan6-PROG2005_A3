import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // Base API URL provided by the course
  private apiUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) { }

  /**
   * Get all inventory items from the API
   * @returns Observable of all inventory items
   */
  getAllItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  /**
   * Get a single inventory item by its name
   * @param name The exact name of the item to retrieve
   * @returns Observable of the matching inventory item
   */
  getItemByName(name: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${name}`);
  }

  /**
   * Add a new inventory item to the API
   * @param item The new inventory item object to add
   * @returns Observable response from the API
   */
  addItem(item: Inventory): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  /**
   * Update an existing inventory item by its name
   * @param name The original name of the item to update
   * @param item The updated inventory item object
   * @returns Observable response from the API
   */
  updateItem(name: string, item: Inventory): Observable<any> {
    return this.http.put(`${this.apiUrl}/${name}`, item);
  }

  /**
   * Delete an inventory item by its name
   * Note: The item named "Laptop" cannot be deleted
   * @param name The name of the item to delete
   * @returns Observable response from the API
   */
  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`);
  }
}