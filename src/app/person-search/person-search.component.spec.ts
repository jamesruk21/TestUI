/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { PersonSearchComponent } from './person-search.component';

describe('PersonSearchComponent', () => {
  let component: PersonSearchComponent;
  let fixture: ComponentFixture<PersonSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [PersonSearchComponent]
    });
    fixture = TestBed.createComponent(PersonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PersonSearchComponent } from './person-search.component';
import { PersonService } from '../services/person.service';
import { of, throwError } from 'rxjs';
import { Person } from '../models/person';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('PersonSearchComponent', () => {
  let component: PersonSearchComponent;
  let fixture: ComponentFixture<PersonSearchComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonService>;

  beforeEach(() => {
    personServiceSpy = jasmine.createSpyObj('PersonService', ['getPeople']);

    TestBed.configureTestingModule({
      declarations: [PersonSearchComponent],
      providers: [{ provide: PersonService, useValue: personServiceSpy }],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(PersonSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a warning when no search term is provided', () => {
    component.getPersonData();

    expect(component.warningText).toEqual('Please provide a search term');
    expect(component.people).toEqual([]);
  });

  it('should fetch people and update the component properties on successful search', () => {
    const mockPeople: Person[] = [
      { id: 1, first_name: 'John', last_name:'Doe', email:'John@Doe.com', gender:'Male'},
      { id: 2, first_name: 'Jim', last_name:'Smith', email:'Jim@Smith.com', gender:'Male' }
    ];

    personServiceSpy.getPeople.and.returnValue(of(mockPeople));

    component.searchTerm = 'john';
    component.getPersonData();

    expect(component.warningText).toEqual('');
    expect(component.searchTermUsed).toEqual('john');
    expect(component.people).toEqual(mockPeople);
  });

  it('should handle errors during the search', () => {
    const error = new Error('An error occurred during the search.');
    const consoleErrorSpy = spyOn(console, 'error'); // Spy on console.error
  
    personServiceSpy.getPeople.and.returnValue(throwError(() => error));
  
    component.searchTerm = 'john';
    component.getPersonData();
  
    expect(component.warningText).toEqual('');
    expect(component.people).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching Persons:', error);
  });
 
  it('should update the view when the "Get Data" button is clicked', async(() => {
    spyOn(component, 'getPersonData');

    fixture.detectChanges(); // Initial data binding

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges(); // Trigger change detection

    fixture.whenStable().then(() => {
      expect(component.getPersonData).toHaveBeenCalled();
    });
  }));
});
