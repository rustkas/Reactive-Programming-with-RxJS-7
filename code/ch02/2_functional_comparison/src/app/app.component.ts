import { Component, OnInit } from '@angular/core';

import { filter, fromEvent, map, range, reduce, scan } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<button id="stopStreams">Stop streams</button>',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RxJs Example';

  ngOnInit(): void {

    range(1, 3).pipe(
      map(x => x * 3),
      filter(x => x % 2 !== 0)
    ).subscribe(value => console.log('Output value is ', value)).unsubscribe();
    console.log('-------------------------------');

    range(1, 5).pipe(
      map(name => name * 2)
    ).subscribe(value => console.log('Output value is ', value)).unsubscribe();
    console.log('-------------------------------');

    const isEven = (val: number) => val % 2 === 0;
    range(1, 5).pipe(filter(isEven)).subscribe(value => console.log(value)).unsubscribe();
    console.log('-------------------------------');;

    range(1, 5).pipe(
      reduce((acc, x) => acc + x)
    ).subscribe(value => console.log(value)).unsubscribe();
    console.log('-------------------------------');;

    range(1, 5).pipe(
      scan((
        x,
        acc // Inverted reduce parameters
      ) => acc + x
      )
    ).subscribe(val => console.log('Next: ', val)).unsubscribe();

    // Stop streams

    const stopSteamsBtn = document.getElementById('stopStreams');
    if (stopSteamsBtn) {
      const stop_stream$ = fromEvent(stopSteamsBtn, 'click');
      const stop_stream_subscription = stop_stream$.subscribe(_element => {
        stop_stream_subscription.unsubscribe();
        console.clear();
      });
    }
  }// nfOnInir

}
