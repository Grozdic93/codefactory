import {Component} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {trigger, transition, style, animate, query, group, animateChild, sequence} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    sequence([
      query(':enter', [
        style({ opacity: 0 })
      ], { optional: true }),

      query(':leave', [
        style({ opacity: 1, transform: 'translateX(0%)' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(100%)' }))
      ], { optional: true }),

      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
        ], { optional: true })
      ])
    ])
  ])
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  constructor(private router: Router) {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
