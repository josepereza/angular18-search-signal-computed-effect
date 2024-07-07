import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  $favorites = signal<Product[]>([]);
 apiUrl="https://fakestoreapi.com/products";
  constructor() {
    effect(() => {
      if (this.$favorites().length >= 3) {
        document.body.classList.add('red');
      }else document.body.classList.remove('red')
    });
   }
  http=inject(HttpClient)


  private $searchFilter = signal<string>('');
  private $productsAPI = toSignal(
    this.http.get<Product[]>(this.apiUrl),
  );
  $products = computed(() => {
    return this.$productsAPI()?.filter((p) =>
      p.title.toLowerCase().includes(this.$searchFilter()),
    );
  });
  getProducts(){
 return this.http.get<Product[]>(this.apiUrl)
  }

  addFavorite(product: Product) {
    this.$favorites.update((p) => [...p, product]);
  }

  clearFavorites(): void {
    this.$favorites.set([]);
  }

  updateFilter(filter: string) {
    const filterValue = filter.length > 3 ? filter : '';
    this.$searchFilter.set(filterValue);
  }



}
