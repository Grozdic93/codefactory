import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ButtonComponent} from "../../../../../shared/components/button/button.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RequestDialogComponent} from "../../../../../shared/components/request-dialog/request-dialog.component";
import {Overlay} from "@angular/cdk/overlay";
import {TranslateModule} from "@ngx-translate/core";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-course-details-info-section',
  standalone: true,
  imports: [
    ButtonComponent,
    TranslateModule
  ],
  templateUrl: './course-details-info-section.component.html',
  styleUrl: './course-details-info-section.component.scss'
})
export class CourseDetailsInfoSectionComponent implements OnInit, OnChanges{
  @Input({required: true}) description!: string;
  @Input({required: true}) courseName!: string;
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);
  descArray: string[] = [];
  private descriptionSubject = new BehaviorSubject<string>(this.description);


  ngOnInit() {
    this.descArray = this.description.split(".");
    this.descriptionSubject.subscribe(desc => {
      this.descArray = desc.split(".");
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['description']) {
      this.descriptionSubject.next(this.description);
    }
  }

  openRegisterDialog() {
    const dialogData = {action: 'register'}
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogData;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(RequestDialogComponent, dialogConfig);
  }
}
