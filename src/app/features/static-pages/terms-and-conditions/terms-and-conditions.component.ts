import {Component, inject} from '@angular/core';
import {SectionComponent} from "../../../shared/components/section/section.component";
import {NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RequestDialogComponent} from "../../../shared/components/request-dialog/request-dialog.component";
import {ContactDialogComponent} from "../../../shared/components/contact-dialog/contact-dialog.component";
import {Overlay} from "@angular/cdk/overlay";
import {RouterLink} from "@angular/router";
import {HeroComponent} from "../../../shared/components/hero/hero.component";

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [
    SectionComponent,
    NgOptimizedImage,
    TranslateModule,
    RouterLink,
    HeroComponent
  ],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent {
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);

  openContactDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(ContactDialogComponent, dialogConfig);
  }
  openRegisterDialog(){
    const dialogData = {action:'register'}
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogData;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(RequestDialogComponent, dialogConfig);
  }
}
