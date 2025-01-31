import { Component } from '@angular/core';
import {SectionComponent} from "../../../shared/components/section/section.component";
import {HeroComponent} from "../../../shared/components/hero/hero.component";
import {TranslateModule} from "@ngx-translate/core";
import {MiniSectionComponent} from "../../../shared/components/mini-section/mini-section.component";

@Component({
  selector: 'app-mission-statement',
  standalone: true,
  imports: [
    SectionComponent,
    HeroComponent,
    TranslateModule,
    MiniSectionComponent
  ],
  templateUrl: './mission-statement.component.html',
  styleUrl: './mission-statement.component.scss'
})
export class MissionStatementComponent {

}
