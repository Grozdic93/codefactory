import {Component, inject} from '@angular/core';
import {SectionComponent} from "../../../shared/components/section/section.component";
import {HeroComponent} from "../../../shared/components/hero/hero.component";
import {TranslateModule} from "@ngx-translate/core";
import {OptionComponent} from "../../components/financing/option/option.component";
import {MiniSectionComponent} from "../../../shared/components/mini-section/mini-section.component";
import {StudentsProjectsComponent} from "../../components/custom-courses/students-projects/students-projects.component";
import {BenefitComponent} from "../../components/why-us/benefits/benefit.component";
import {MatFabButton} from "@angular/material/button";
import {Overlay} from "@angular/cdk/overlay";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ContactDialogComponent} from "../../../shared/components/contact-dialog/contact-dialog.component";

@Component({
  selector: 'app-career-net',
  standalone: true,
  imports: [
    SectionComponent,
    HeroComponent,
    TranslateModule,
    OptionComponent,
    MiniSectionComponent,
    StudentsProjectsComponent,
    BenefitComponent,
    MatFabButton
  ],
  templateUrl: './career-net.component.html',
  styleUrl: './career-net.component.scss'
})
export class CareerNetComponent {
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(ContactDialogComponent, dialogConfig);
  }

}
