import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { product } from '../data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popular!: product[];
  trendy!: product[];
  constructor(private router: Router, private products: ProductsService) {
  }
  ngOnInit(): void {
    this.products.popularProducts().subscribe((data) => {
      this.popular = data
    })

    this.products.TrendyProducts().subscribe((data) => {
      this.trendy = data
    })
  }
}
