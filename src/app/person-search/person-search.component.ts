import { Component } from '@angular/core';
import { Person } from '../models/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss']
})
export class PersonSearchComponent {
  pageTitle: string = 'Person Search';
  people: Person[] = [];
  searchTerm: string ="";
  searchTermUsed: string="";
  warningText: string="";

  constructor(private readonly personService: PersonService){}

  getPersonData() {
    if (this.searchTerm == "" ){
      this.warningText = "Please provide a search term";
      this.people = [];
      return;
    }
    this.warningText = "";

    this.personService.getPeople(this.searchTerm).subscribe(
      (people: Person[]) => {
        console.log('Fetched Persons:', people);
        // Handle the fetched data as needed
        this.searchTermUsed = this.searchTerm;
        this.people = people;
      },
      (error: any) => {
        console.error('Error fetching Persons:', error);
        this.people = [];
      }
    );
  }
  
}

