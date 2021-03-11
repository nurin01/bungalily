import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
}

// Product Interface
export interface IProduct {
  id: number,
  name: string,
  price: number,
  image: string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items: any[];

  constructor( )  {
    this.items = [
      {title: ""},
      {title: "kelantan"},
    ];
  }

  filterItems(searchTerm){
    return this.items.filter(item =>
      {
        return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
  }
  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Design',
      image: '../../assets/categories/design.jpg'
    
    }
    let cat2: ICategory = {
      id: 2,
      name: 'Lace',
      image: '../../assets/categories/lace.jpg'
    }
    let cat3: ICategory = {
      id: 3,
      name: 'Fabric',
      image: '../../assets/categories/silk.jpg'
    }

    categories.push(cat1, cat2, cat3);

    return categories;
  }

  getFeaturedProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Pure Silk',
      price: 30,
      image: '../../assets/product-slider/puresilk.jpg'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Cotton',
      price: 30,
      image: '../../assets/products/cotton.jpg'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Brocade',
      price: 30,
      image: '../../assets/products/brocade.jpg'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Belluci',
      price: 55,
      image: '../../assets/products/belluci.jpg'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Italian',
      price: 34,
      image: '../../assets/products/italian.jpg'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Red',
      price: 30,
      image: '../../assets/products/merah.jpg'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }
}
