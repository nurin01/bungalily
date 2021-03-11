import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
 
const { Storage } = Plugins;
 
const CART_STORAGE_KEY = 'MY_CART';
 
const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);
 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cart = new BehaviorSubject({});
  cartKey = null;
  productsCollection: AngularFirestoreCollection;
 
  constructor(private afs: AngularFirestore) {
    this.loadCart();
    this.productsCollection = this.afs.collection('products');
  }
 
  getProducts() {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }
 
  async loadCart() {
    const result = await Storage.get({ key: CART_STORAGE_KEY });
    if (result.value) {
      this.cartKey = result.value;
 
      this.afs.collection('carts').doc(this.cartKey).valueChanges().subscribe((result: any) => {
        // Filter out our timestamp
        delete result['lastUpdate'];
 
        this.cart.next(result || {});
      });
 
    } else {
      // Start a new cart
      const fbDocument = await this.afs.collection('carts').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      });
      this.cartKey = fbDocument.id;
      // Store the document ID locally
      await Storage.set({ key: CART_STORAGE_KEY, value: this.cartKey });
 
      // Subscribe to changes
      this.afs.collection('carts').doc(this.cartKey).valueChanges().subscribe((result: any) => {
        delete result['lastUpdate'];
        console.log('cart changed: ', result);
        this.cart.next(result || {});
      });
    }
  }

  addToCart(id) {
    // Update the FB cart
    this.afs.collection('carts').doc(this.cartKey).update({
      [id]: INCREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
   
    // Update the stock value of the product
    this.productsCollection.doc(id).update({
      stock: DECREMENT
    });
  }
   
  removeFromCart(id) {
    // Update the FB cart
    this.afs.collection('carts').doc(this.cartKey).update({
      [id]: DECREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
   
    // Update the stock value of the product
    this.productsCollection.doc(id).update({
      stock: INCREMENT
    });
  }
   
  async checkoutCart() {
    // Create an order
    await this.afs.collection('orders').add(this.cart.value);
   
    // Clear old cart
    this.afs.collection('carts').doc(this.cartKey).set({
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}
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

  constructor() { }

  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Womens',
      image: '../../assets/categories/category-1.png'
    }
    let cat2: ICategory = {
      id: 2,
      name: 'Mens',
      image: '../../assets/categories/category-2.png'
    }
    let cat3: ICategory = {
      id: 3,
      name: 'Kids',
      image: '../../assets/categories/category-3.png'
    }

    categories.push(cat1, cat2, cat3);

    return categories;
  }

  getFeaturedProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 55,
      image: '../../assets/products/prod-1.png'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Mens T-Shirt',
      price: 34,
      image: '../../assets/products/prod-2.png'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 40,
      image: '../../assets/products/prod-3.png'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 55,
      image: '../../assets/products/prod-4.png'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Mens T-Shirt',
      price: 34,
      image: '../../assets/products/prod-5.png'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 40,
      image: '../../assets/products/prod-6.png'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }
}
