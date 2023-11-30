import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PersonService } from './person.service';
import { Person } from '../models/person';
import { environment } from '../../environments/environment';

describe('PersonService', () => {
  let service: PersonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonService]
    });

    service = TestBed.inject(PersonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding HTTP requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch people based on the search term', () => {
    const searchTerm = 'john';
    const mockPeople: Person[] = [
      { id: 1, first_name: 'John', last_name:'Doe', email:'John@Doe.com', gender:'Male'},
      { id: 2, first_name: 'John', last_name:'Smith', email:'John@Smith.com', gender:'Male' }
    ];

    service.getPeople(searchTerm).subscribe((people: Person[]) => {
      expect(people).toEqual(mockPeople);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}?searchTerm=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPeople);
  });

  // Add more tests as needed

});
