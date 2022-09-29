import { Component, OnInit } from '@angular/core';

import { fromEvent, filter, map, merge, distinctUntilChanged } from 'rxjs';

interface Point {
  x: number,
  y: number
}

@Component({
  selector: 'app-root',
  template: '<button id="stopStreams">Stop streams</button>',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RxJs Example';

  ngOnInit(): void {

    const allMoves = fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        map<MouseEvent, Point>(e => ({
          x: e.clientX,
          y: e.clientY
        })),
        distinctUntilChanged()
      );

    const rightSide = allMoves.pipe(
      filter(c => c.x > window.innerWidth / 2),
      distinctUntilChanged());
    const leftSide = allMoves.pipe(
      filter(c => c.x < window.innerWidth / 2),
      distinctUntilChanged()
      );

    const rightSideSubscription = rightSide.subscribe(() => {
      console.log('Mouse pointer on the right');
    });

    const leftSideSubscription = leftSide.subscribe(() => {
      console.log('Mouse pointer on the left');
    });

    function isOnUpperSide(coord: Point) {
      return coord.y < window.innerHeight / 2;
    }

    const upperLeft = leftSide.pipe(filter(isOnUpperSide), distinctUntilChanged());
    const upperRight = rightSide.pipe(filter(isOnUpperSide), distinctUntilChanged());

    const upperLeftSubscription = upperLeft.subscribe(() => {
      console.log('Mouse pointer on the upper left');
    });

    const upperRightSubscription = upperRight.subscribe(() => {
      console.log('Mouse pointer on the upper right');
    });

    const upperLeftRightSubscription = merge(upperLeft, upperRight).subscribe(() => {
      console.log('Mouse pointer on the upper side');
    });

    // Stop streams

    const stopSteamsBtn = document.getElementById('stopStreams');
    if (stopSteamsBtn) {
      const stop_stream$ = fromEvent(stopSteamsBtn, 'click');
      const stop_stream_subscription = stop_stream$.subscribe(_element => {
        rightSideSubscription.unsubscribe();
        leftSideSubscription.unsubscribe();

        upperLeftSubscription.unsubscribe();
        upperRightSubscription.unsubscribe();
        upperLeftRightSubscription.unsubscribe();

        stop_stream_subscription.unsubscribe();
        console.clear();
      });
    }

  }// nfOnInir

}


