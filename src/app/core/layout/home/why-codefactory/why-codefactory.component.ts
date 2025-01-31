import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {LinkComponent} from "../../../../shared/components/link/link.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-why-codefactory',
  standalone: true,
  imports: [
    NgOptimizedImage,
    LinkComponent,
    TranslateModule
  ],
  templateUrl: './why-codefactory.component.html',
  styleUrl: './why-codefactory.component.scss'
})
export class WhyCodefactoryComponent implements OnInit {

  constructor() { }

ngOnInit(): void{

}
}
