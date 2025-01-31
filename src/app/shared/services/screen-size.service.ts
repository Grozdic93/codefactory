import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        startWith(window.innerWidth)
      )
      .subscribe(this.screenWidth$);
  }

  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  isSmallScreen(): Observable<boolean> {
    return this.getScreenWidth().pipe(
      map(width => width < 720)
    );
  }
}
