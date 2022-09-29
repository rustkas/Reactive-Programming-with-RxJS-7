import { Component, OnInit } from '@angular/core';

import { interval, map, merge, range, take, reduce, scan, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<button id="stopStreams">Stop streams</button>',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RxJs Example';

  ngOnInit(): void {

    range(1, 3).subscribe(value => console.log(`Range value #${value}`)).unsubscribe();
    console.log('-------------------------------');
    
    const a$ = interval(200).pipe(map(i => `A${i}`), take(3));
    const b$ = interval(100).pipe(map(i => `B${i}`), take(3));

    const subscription01:Subscription = merge(a$, b$).subscribe({
      next: x => console.log(x),
      error: (err) => console.error(err),
      complete: ()=> {
        subscription01.unsubscribe();
        console.log('-------------------------------');

        range(0, 5).pipe(
          reduce(
            (previous, current) => {
              return {
                sum: previous.sum + current,
                count: previous.count + 1
              };
            },
            { sum: 0, count: 0 }
          ),
          map(result => result.sum / result.count)
        )
          .subscribe(x => console.log('Average is: ', x)).unsubscribe();
        console.log('-------------------------------');
      }
    });
    

  }// nfOnInir

}
