import {Component} from '@angular/core';
import {LinkComponent} from "../../../../shared/components/link/link.component";
import {LogoComponent} from "../../three/logo/logo.component";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    LinkComponent,
    LogoComponent,
    TranslateModule,
    ButtonComponent,

  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor(private router: Router,) {
  }
  onNavigateToCoursesSection(event: Event) {
    event.preventDefault();


      const section = document.getElementById('courseCategories');
      if (section) {
        setTimeout(()=>{
          section.scrollIntoView({behavior: 'smooth', block: 'start'});

        })
      }


  }
}
