import {Component, inject} from '@angular/core';
import {SectionComponent} from "../../../shared/components/section/section.component";
import {ButtonComponent} from "../../../shared/components/button/button.component";
import {NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {BenefitsComponent} from "../../components/custom-courses/benefits/benefits.component";
import {OptionComponent} from "../../components/financing/option/option.component";
import {MiniSectionComponent} from "../../../shared/components/mini-section/mini-section.component";
import {MatFabButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ContactDialogComponent} from "../../../shared/components/contact-dialog/contact-dialog.component";
import {Overlay} from "@angular/cdk/overlay";
import {StudentsProjectsComponent} from "../../components/custom-courses/students-projects/students-projects.component";
import {HeroComponent} from "../../../shared/components/hero/hero.component";

@Component({
  selector: 'app-custom-courses',
  standalone: true,
  imports: [
    SectionComponent,
    ButtonComponent,
    NgOptimizedImage,
    TranslateModule,
    BenefitsComponent,
    OptionComponent,
    MiniSectionComponent,
    MatFabButton,
    StudentsProjectsComponent,
    HeroComponent
  ],
  templateUrl: './custom-courses.component.html',
  styleUrl: './custom-courses.component.scss'
})
export class CustomCoursesComponent {
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(ContactDialogComponent, dialogConfig);
  }
}
