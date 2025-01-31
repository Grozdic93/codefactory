import {Component} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-benefits',
  standalone: true,
    imports: [
        MatFabButton,
        NgIf,
        NgOptimizedImage,
        TranslateModule
    ],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss'
})
export class BenefitsComponent {


}
