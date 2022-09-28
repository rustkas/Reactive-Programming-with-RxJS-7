import { Component, OnInit } from '@angular/core';

import { of, debounceTime, from, map, mergeMap, mergeWith, Observable, ObservableInput, pluck, merge, pipe } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { fromEvent, distinct, take, scheduled } from 'rxjs';

interface ZipCode {
  zipcode: string;
  city: string;
  state: string;
}
interface Person {
  location: {
    city: string;
  }
}

@Component({
  selector: 'app-root',
  template: `
    <button id="retrieveDataBtn">Get data</button>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const button = document.getElementById("retrieveDataBtn");
    const obs1$ = ajax.getJSON<ZipCode[]>("/data/zipcodes.json")
      .pipe(map((zipCodes) => {
        if (zipCodes) {
          const newArray = zipCodes.map((item) => item.city);
          const newArray2 = newArray.filter((n, i) => newArray.indexOf(n) === i);
          return from(newArray2);
        } else {
          return of('0');
        }
      })
      );

    const obs2$ = ajax.getJSON<Person[]>("/data/persons.json")
      .pipe(map((persons) => {
        // console.log(persons);
        if (persons) {
          const newArray = persons.map((item) => item.location?.city);
          // console.log(newArray);
          const newArray2 = newArray.filter((n, i) => newArray.indexOf(n) === i);
          return from(newArray2);
        } else {
          return of('0');
        }

      }));


    const obs$ = merge(obs1$, obs2$);
    const obs01$ = obs$.pipe(distinct());
    const getResults = (amount: number) =>
      obs01$.pipe(take(amount));

    getResults(5).subscribe(value => value.subscribe(
      {
        next: value1 => console.log("Received value", value1),
        error: err => console.error(err),
        complete: () => console.log("All values retrieved!")
      }
    ));

  }
  title = 'RxJs Example';
}


