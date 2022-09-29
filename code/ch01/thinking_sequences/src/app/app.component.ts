import { Component, OnInit } from '@angular/core';

import { fromEvent, filter, take } from 'rxjs';



@Component({
  selector: 'app-root',
  template: '<button id="stopStreams">Stop streams</button>',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RxJs Example';

  ngOnInit(): void {

  const subscription = fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(
        e => e.clientX > window.innerWidth / 2
      ),
      take(10)
      ).subscribe(e => console.log(e.clientX, e.clientY));

    // Stop streams

    const stopSteamsBtn = document.getElementById('stopStreams');
    if (stopSteamsBtn) {
      const stop_stream$ = fromEvent(stopSteamsBtn, 'click');
      const stop_stream_subscription = stop_stream$.subscribe(_element => {
        subscription.unsubscribe();
        stop_stream_subscription.unsubscribe();
        console.clear();
      });
    }




  }// nfOnInir

}


