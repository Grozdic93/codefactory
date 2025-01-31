import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';import {SectionComponent} from "../../../shared/components/section/section.component";
import {HeroComponent} from "../../../shared/components/hero/hero.component";
import {TranslateModule} from "@ngx-translate/core";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    MatExpansionModule,
    SectionComponent,
    HeroComponent,
    TranslateModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription
  ],
  templateUrl: './faq.component.html',
  styles:`.link{color:black; text-decoration:underline;} p{color:black;}`,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FaqComponent {
  readonly panelOpenState = signal(false);

}
