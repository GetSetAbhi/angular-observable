import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular ' + VERSION.major;

  // https://mocki.io/v1/2bb1d1e8-2847-4a5e-9234-baa56f6c962f

  myObservable = of(1, 2, 3);

  // Create observer object
  myObserver = {
    next: (x: number) => console.log('Observer got a next value: ' + x),
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  sequenceSubscriber(observer: Observer<number>) {
    // synchronously deliver 1, 2, and 3, then complete
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();

    // unsubscribe function doesn't need to do anything in this
    // because values are delivered synchronously
    return { unsubscribe() {} };
  }

  ngOnInit(): void {
    //this.myObservable.subscribe(this.myObserver);

    const sequence = new Observable(this.sequenceSubscriber);

    // execute the Observable and print the result of each notification
    sequence.subscribe({
      next(num) {
        console.log(num);
      },
      complete() {
        console.log('Finished sequence');
      },
    });
  }

  ngOnDestroy(): void {}
}
