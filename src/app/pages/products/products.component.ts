import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe,SlicePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
apiService=inject(ApiService)

 $productsAPI = toSignal(
  this.apiService.getProducts()
);
}
