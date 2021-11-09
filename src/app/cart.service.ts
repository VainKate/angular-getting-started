import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, map } from 'rxjs';

import { Product } from './products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items = new BehaviorSubject<Product[]>([]);
  itemsQuantity = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  addToCart(product: Product, quantity?: number | undefined) {
    const item: Product | undefined = this.items.value.find(
      (item) => item.id === product.id
    );
    let newCart: Product[] = [...this.items.value];

    if (!quantity) {
      if (!item) {
        newCart.push({
          ...product,
          quantity: 1,
        });
      } else {
        newCart.map((item) => {
          if (item.id === product.id) {
            item.quantity!++;
          }
        });
      }

      this.itemsQuantity.next(this.itemsQuantity.value + 1);
    } else {
      newCart.map((item) => {
        if (item.id === product.id) {
          const total = quantity - item.quantity!;
          this.itemsQuantity.next(this.itemsQuantity.value + total);
          item.quantity = quantity;
        }
      });
    }

    this.items.next(newCart);
  }

  removeFromCart(product: Product) {
    this.items.next(this.items.value.filter((item) => item.id !== product.id));
    this.itemsQuantity.next(this.itemsQuantity.value - 1);
  }

  updateCart(quantity: number, product: Product) {
    console.log(quantity < 1);

    if (quantity < 1) {
      this.removeFromCart(product);
    } else {
      this.addToCart(product, quantity);
    }
  }

  getItems() {
    return this.items;
  }

  getItemsQuantity() {
    return this.itemsQuantity;
  }

  clearCart() {
    this.items.next([]);
    this.itemsQuantity.next(0);

    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }
}
