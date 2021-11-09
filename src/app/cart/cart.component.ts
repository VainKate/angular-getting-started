import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Product } from '../products';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  checkoutForm = this.formBuilder.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    items: [[]],
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe((items) => (this.items = items));
  }

  onUpdateCart(event: any, item: Product): void {
    this.cartService.updateCart(parseInt(event.target.value), item);
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.checkoutForm.setValue({
      ...this.checkoutForm.value,
      items: this.items,
    });

    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.cartService.clearCart();
    this.checkoutForm.reset();
  }
}
