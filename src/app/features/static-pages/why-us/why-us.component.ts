import {Component, inject} from '@angular/core';
import {SectionComponent} from "../../../shared/components/section/section.component";
import {HeroComponent} from "../../../shared/components/hero/hero.component";
import {BenefitsComponent} from "../../components/why-us/benefits/benefits.component";
import {TopChoiceComponent} from "../../components/why-us/top-choice/top-choice.component";
import {TranslateModule} from "@ngx-translate/core";
import {MiniSectionComponent} from "../../../shared/components/mini-section/mini-section.component";
import {OptionComponent} from "../../components/financing/option/option.component";
import {MatFabButton} from "@angular/material/button";
import {Overlay} from "@angular/cdk/overlay";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ContactDialogComponent} from "../../../shared/components/contact-dialog/contact-dialog.component";
import {StudentsProjectsComponent} from "../../components/custom-courses/students-projects/students-projects.component";

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [
    SectionComponent,
    HeroComponent,
    BenefitsComponent,
    TopChoiceComponent,
    TranslateModule,
    MiniSectionComponent,
    OptionComponent,
    MatFabButton,
    StudentsProjectsComponent
  ],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(ContactDialogComponent, dialogConfig);
  }
}
