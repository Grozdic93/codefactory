import {Component, OnInit} from '@angular/core';
import {SectionComponent} from "../../../shared/components/section/section.component";
import {MeetTheTeamComponent} from "../../../shared/components/meet-the-team/meet-the-team.component";
import {ITeam} from "../../../shared/team.model";
import {CEOS, MARKETING, TRAINERS} from "../../../shared/team";
import {OptionComponent} from "../../components/financing/option/option.component";
import {HeroComponent} from "../../../shared/components/hero/hero.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    SectionComponent,
    MeetTheTeamComponent,
    OptionComponent,
    HeroComponent,
    TranslateModule
  ],
  templateUrl: './team.component.html',
  styles:``
})
export class TeamComponent implements OnInit{

  ceos!:ITeam[]
  trainers!:ITeam[]
  marketing!:ITeam[]

  ngOnInit() {
    this.trainers = TRAINERS;
    this.ceos = CEOS;
    this.marketing = MARKETING;
  }

  protected readonly CEOS = CEOS;
  protected readonly TRAINERS = TRAINERS;
  protected readonly MARKETING = MARKETING;
}
