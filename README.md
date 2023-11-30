Hi,
"npm install" to get packages
Before starting, start the API in visual studio, normal debug is fine.

"npm start" to start, open a browser window at http://localhost:4200/
"npm test" to test

In this angular app is a single page component in person-search. The page has controls and logic to call the person.service.ts. This service gets the data from the .NET API. The data is an array of person objects. It then uses a *ngfor loop to create the table rows. Some basic logic in here around the warning div, this is added based on the requirement in the test doc.

So once you've got it running, the home page is the Person Search page. Add your test search term, or not, and click the button.

If there's a problem with the API URL when in debug mode, the API URL is in teh environments/environment.ts file.

Thanks for your time and the interview.

I wish you all well whatever happens.

Regards
Jim