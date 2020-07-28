import {Injectable} from '@angular/core';
import {Person} from "./person/person.component";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {
  }

  index() {
    return this.http.get('api/person');
  }

  get(id) {
    return this.http.get('api/person/' + id);
  }

  create(element: Person) {
    return this.http.post('api/person', element)
  }

  update(element: Person) {
    return this.http.put('api/person/' + element.id, element)
  }

  delete(element: Person) {
    return this.http.delete('api/person/' + element.id)
  }
}
