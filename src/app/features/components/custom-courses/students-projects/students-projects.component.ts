import {Component, inject, OnInit} from '@angular/core';
import {LinkComponent} from "../../../../shared/components/link/link.component";
import {LogoScrollerComponent} from "../../../../shared/components/after-course/logo-scroller/logo-scroller.component";
import {TranslateModule} from "@ngx-translate/core";
import {Overlay} from "@angular/cdk/overlay";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ContactDialogComponent} from "../../../../shared/components/contact-dialog/contact-dialog.component";
import {NgOptimizedImage} from "@angular/common";
import {PROJECT_IMAGES} from "../../../../shared/studentProjectsImages";

@Component({
  selector: 'app-students-projects',
  standalone: true,
  imports: [
    LinkComponent,
    LogoScrollerComponent,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './students-projects.component.html',
  styleUrl: './students-projects.component.scss'
})
export class StudentsProjectsComponent implements OnInit{
  students!: { name: string; link: string; image:string }[];
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.students = PROJECT_IMAGES.slice(0,3);
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(ContactDialogComponent, dialogConfig);
  }

}
