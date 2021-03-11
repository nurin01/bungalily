import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public searchTerm: string="";
  public items:any;
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];
 

  constructor(
    private data: DataService,
  ) { }

  ngOnInit() {
    this.items = this.data.filterItems(this.searchTerm);
    this.categories = this.data.getCategories();
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
  }

  setFilteredItems() {
    this.items = this.data.filterItems(this.searchTerm);
  }
}
