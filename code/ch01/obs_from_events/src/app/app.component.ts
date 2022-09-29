import { Component, OnInit } from '@angular/core';

import { fromEvent, filter } from 'rxjs';



@Component({
  selector: 'app-root',
  template: '<button id="stopStreams">Stop streams</button>',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RxJs Example';

  ngOnInit(): void {
    const allMoves$ = fromEvent<MouseEvent>(document, 'mousemove');
    const movesOnTheRight$ = allMoves$.pipe(filter(
      e => e.clientX > window.innerWidth / 2
    ));

    const movesOnTheLeft$ = allMoves$.pipe(filter(
      e => e.clientX < window.innerWidth / 2
    ));

    const subscription01 = movesOnTheRight$.subscribe(e => {
      console.log('Mouse is on the right:', e.clientX);
    });

    const subscription02 = movesOnTheLeft$.subscribe(e => {
      console.log('Mouse is on the left:', e.clientX);
    });

    // Stop streams

    const stopSteamsBtn = document.getElementById('stopStreams');
    if (stopSteamsBtn) {
      const stop_stream$ = fromEvent(stopSteamsBtn, 'click');
      const stop_stream_subscription = stop_stream$.subscribe(_element => {
        subscription01.unsubscribe();
        subscription02.unsubscribe();
        stop_stream_subscription.unsubscribe();
      });
    }




  }// nfOnInir

}


