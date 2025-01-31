import { Component } from '@angular/core';
import {SectionComponent} from "../../../shared/components/section/section.component";
import {HeroComponent} from "../../../shared/components/hero/hero.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-brand-ambassador',
  standalone: true,
  imports: [
    SectionComponent,
    HeroComponent,
    TranslateModule
  ],
  templateUrl: './brand-ambassador.component.html',
  styles: `
    @use '../../../../sass/abstracts' as a;
    .txt {
      width: 80%;
      margin-inline: auto;
      margin-bottom: 200px;
      text-align: center;
      @include a.mq(medium){
        width: 100%;
      }
    }`
})
export class BrandAmbassadorComponent {

}
