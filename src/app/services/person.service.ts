import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Person } from "../models/person";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private http: HttpClient) { }

    getPeople(searchTerm: string): Observable<Person[]> {
        return this.http.get<Person[]>(environment.apiUrl + '?searchTerm='+ searchTerm);
    }

}
