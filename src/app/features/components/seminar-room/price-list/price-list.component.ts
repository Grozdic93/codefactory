import {Component, inject} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ContactDialogComponent} from "../../../../shared/components/contact-dialog/contact-dialog.component";
import {Overlay} from "@angular/cdk/overlay";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [
    MatFabButton,
    TranslateModule
  ],
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.scss'
})
export class PriceListComponent {
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);

  openContactDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(ContactDialogComponent, dialogConfig);
  }

}
