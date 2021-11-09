import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  itemsQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService
      .getItemsQuantity()
      .subscribe((itemsQuantity) => (this.itemsQuantity = itemsQuantity));
  }
}
