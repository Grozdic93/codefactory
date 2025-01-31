import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {BenefitComponent} from "./benefit.component";

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslateModule,
    BenefitComponent
  ],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss'
})
export class BenefitsComponent {

}
