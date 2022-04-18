import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse,HttpStatusCode } from '@angular/common/http';
import { retry, catchError,map} from 'rxjs/operators';
import { throwError, zip} from 'rxjs';

import { checkTime } from './../interceptors/time.interceptor';
import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public apiURL = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) { }
  //Para traer todos los productos
  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiURL,{params, context: checkTime()})
    .pipe(
      retry(3),
      map(products => products.map(items => {
        return {
          ...items,
          taxes: .19 * items.price
        }
      }))
    );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id,dto)
    );
  }

  //para traer un producto en especifico
  getProduct(id: string){
    return this.http.get<Product>(`${this.apiURL}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el server error N° 500');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe error n° 404');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('no estas autorizado error n° 401');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }
  //para registrar un elemento nuevo y nos devuelve el producto creado
  create(data: CreateProductDTO){
    return this.http.post<Product>(this.apiURL, data);
  }
  //para actualizar un elemento y nos devuelve el producto actualizado
  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiURL}/${id}`,dto);
  }
  //hacer eliminación,
  delete(id: string){
    return this.http.delete<boolean>(`${this.apiURL}/${id}`);
  }
  //útil para hacer paginación
  // getProductsByPage(limit: number, offset: number){
  //   return this.http.get<Product[]>(`${this.apiURL}`,{
  //     params: {limit, offset}
  //   });
  // }
}
