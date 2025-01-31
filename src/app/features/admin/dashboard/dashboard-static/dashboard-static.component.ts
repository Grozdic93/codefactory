import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-static',
  template: `
    <div class="wrapper">
      <h2>Welcome to Code Factory Dashboard</h2>
      <h3> &gt;&gt;&gt; Select the action on the left</h3>
    </div>`,
  styles: [`
  .wrapper{
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    gap: 2rem;
  }

  `]
})
export class DashboardStaticComponent {

}
