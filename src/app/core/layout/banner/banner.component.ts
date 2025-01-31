import { Component, inject } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MatButtonModule, MatBottomSheetModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.sheet.scss',
})
export class BannerComponent {
  private _bottomSheet = inject(MatBottomSheet);

  constructor() {
    this.openBottomSheet();
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet, {
      panelClass: 'banner-bottom-sheet',
    });
  }
}
// backdropClass: 'main-sheet',
// direction: 'ltr',
// hasBackdrop: false,

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet.html',
  styleUrl: './banner.sheet.scss',
  standalone: true,
  imports: [MatListModule],
})
export class BottomSheetOverviewExampleSheet {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewExampleSheet>>(
      MatBottomSheetRef
    );

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
