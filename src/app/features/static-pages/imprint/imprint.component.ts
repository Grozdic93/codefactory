import { Component } from '@angular/core';
import {HeroComponent} from "../../../shared/components/hero/hero.component";
import {MiniSectionComponent} from "../../../shared/components/mini-section/mini-section.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [
    HeroComponent,
    MiniSectionComponent,
    TranslateModule
  ],
  templateUrl: './imprint.component.html',
  styles:`
    @use '../../../../sass/abstracts' as a;
    .content{
    display: grid;
    width: 70%;
    margin-inline: auto;
    gap: 1rem;
    margin-bottom: 6rem;
      @include a.mq(medium){
        width: 100%;
      }
  }
  .link{
    text-decoration: underline;
  }`
})
export class ImprintComponent {

}
