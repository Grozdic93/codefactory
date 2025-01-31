import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="link">
      <ng-content></ng-content>
    </a>
  `,
  styles: [
    `
      @use '../../../../sass/abstracts' as a;
      a {
        background-color: a.clr(bg, dark);
        color: a.clr(text, light);
        display: inline-block;
        padding: 1rem;
        width: max-content;
        border-radius: 10px;
        text-decoration: none;
      }
    `,
  ],
})
export class LinkComponent {
  @Input({ required: true }) link!: string;
}
