import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-section',
  standalone: true,
  imports: [],
  template: `
    <section>
      <ng-content/>
    </section>

  `,
  styles: `
    @use '../../../../sass/abstracts/index' as a;

    section {
      width: min(calc(100% - 10rem), 90rem);
      margin-inline: auto;
      min-height: 50lvh;
      overflow-x: clip;
      overflow-y:visible;
      display: grid;
      align-items: center;
      @include a.mq('large') {
        padding-inline: 3rem;
        width: min(calc(100% - 8rem), 90rem);
        padding-block: 2rem;
        min-height: 700px;
      }
      @include a.mq('medium') {
        width: min(calc(100% - 4rem), 90rem);
        padding-inline: 2rem;
        padding-block: 3rem;
        min-height: 500px;
      }
    }
  `
})
export class MiniSectionComponent {

}
