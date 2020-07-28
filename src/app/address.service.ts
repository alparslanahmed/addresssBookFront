import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Address} from "./address/address.component";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {
  }

  index() {
    return this.http.get('api/address');
  }

  get(id) {
    return this.http.get('api/address/' + id);
  }

  create(element: Address) {
    return this.http.post('api/address', element)
  }

  update(element: Address) {
    return this.http.put('api/address/' + element.id, element)
  }

  delete(element: Address) {
    return this.http.delete('api/address/' + element.id)
  }
}
