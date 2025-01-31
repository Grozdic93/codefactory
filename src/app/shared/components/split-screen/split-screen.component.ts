import { Component } from '@angular/core';

@Component({
  selector: 'app-split-screen',
  standalone: true,
  imports: [],
  template: `
    <div class="equal-columns">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './split-screen.component.scss'
})
export class SplitScreenComponent {

}
