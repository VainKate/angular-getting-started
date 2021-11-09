import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../products';

@Component({
  selector: 'app-buy-button',
  templateUrl: './buy-button.component.html',
  styleUrls: ['./buy-button.component.css'],
})
export class BuyButtonComponent implements OnInit {
  @Input() product!: Product | undefined;
  @Output() buy = new EventEmitter();

  addToCart = (product: Product) => {
    window.alert('Your item has been added to the cart.');
    this.cartService.addToCart(product);
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
}
