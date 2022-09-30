import { Component, OnInit } from '@angular/core';

import { from, fromEvent, of, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<button id="stopStreams">Stop streams</button>',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RxJs Example';

  ngOnInit(): void {

    // 'from' provides an Observable that emits three Observables
    from([
      of(1, 2, 3),
      of(4, 5, 6),
      of(7, 8, 9)
    ]).pipe(
      // flatMap(v => v) // depricated
      mergeMap(value => value)
    ).subscribe(v => console.log(v)).unsubscribe();

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
