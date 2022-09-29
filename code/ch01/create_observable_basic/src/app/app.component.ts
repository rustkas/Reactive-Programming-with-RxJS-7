import { Component, OnInit } from '@angular/core';

import { Observable, Observer } from 'rxjs';



@Component({
  selector: 'app-root',
  template: `
    <button id="retrieveDataBtn">Get data</button>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RxJs Example';

  ngOnInit(): void {
    const button = document.getElementById("retrieveDataBtn");
   
   const dataSource = (observer:Observer<string>) => {
	  observer.next("Simon");
	  observer.next("Jen");
	  observer.next("Sergi");
	  observer.complete(); // We are done
	};
   const stream$ = new Observable(dataSource);
   
   const logObserver = {
	  next: (value:string) => console.log('Next: ', value),
	  error: (err:Error) => console.error('Error: ', err),
	  complete: () => console.log('Completed')
	};
   
   const subscriber = stream$.subscribe(logObserver);
   subscriber.unsubscribe();
  }
  
}


