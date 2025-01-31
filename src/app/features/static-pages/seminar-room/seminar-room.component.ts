import {AfterViewInit, Component, inject} from '@angular/core';
import {SectionComponent} from "../../../shared/components/section/section.component";
import {NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "../../../shared/components/button/button.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {ContactDialogComponent} from "../../../shared/components/contact-dialog/contact-dialog.component";

import {LargeRoomComponent} from "../../components/seminar-room/large-room/large-room.component";
import {MatFabButton} from "@angular/material/button";
import {PriceListComponent} from "../../components/seminar-room/price-list/price-list.component";
import {HeroComponent} from "../../../shared/components/hero/hero.component";


const ROOM_IMAGES: string[] = [
  'big-room/raum-gross-1.png',
  'big-room/raum-gross-2.png',
  'big-room/raum-gross-3.png',
  'big-room/raum-gross-4.png',
  'big-room/raum-gross-5.png',
  'big-room/raum-gross-6.png'
];
const SMALLROOM_IMAGES: string[] = [
  'small-room/small_room1.png',
  'small-room/small_room2.png',
  'small-room/small_room1.png',
  'small-room/small_room2.png'
]

const OTHER_ROOMS_IMAGES: string[] =[
  'other-rooms/room1.png',
  'other-rooms/room2.png',
  'other-rooms/room3.png',
  'other-rooms/room4.png'
]

@Component({
  selector: 'app-seminar-room',
  standalone: true,
  imports: [
    SectionComponent,
    NgOptimizedImage,
    TranslateModule,
    ButtonComponent,
    LargeRoomComponent,
    MatFabButton,
    PriceListComponent,
    HeroComponent,
  ],
  templateUrl: './seminar-room.component.html',
  styleUrl: './seminar-room.component.scss'
})


export class SeminarRoomComponent{
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);



  openContactDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(ContactDialogComponent, dialogConfig);
  }

  protected readonly ROOM_IMAGES = ROOM_IMAGES;
  protected readonly SMALLROOM_IMAGES = SMALLROOM_IMAGES;
  protected readonly OTHER_ROOMS_IMAGES = OTHER_ROOMS_IMAGES;
}
