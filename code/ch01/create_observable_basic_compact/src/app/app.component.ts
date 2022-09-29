import { Component, OnInit } from '@angular/core';

import { from, Observable, Observer } from 'rxjs';



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
    // 1
    from(["Adrià", "Julian", "Jen", "Sergi"]).subscribe({
      next: (name: string) => console.log('Next: ', name),
      error: (err: Error) => console.error('Error: ', err),
      complete: () => console.log('Completed #1')
    }).unsubscribe();

    // 2
    const names: Observable<string> = from(["Adrià", "Julian", "Jen", "Sergi"]);
    names.subscribe((name: string) => console.log('Next: ', name)).unsubscribe();


  }// nfOnInir

}


