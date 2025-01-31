import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-logo-scroller',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './logo-scroller.component.html',
  styleUrl: './logo-scroller.component.scss'
})
export class LogoScrollerComponent {
  logos = [
    './images/company-logos/a1.png',
    './images/company-logos/ADAWEB.png',
    './images/company-logos/awattar.png',
    './images/company-logos/bawag.png',
    './images/company-logos/bitpanda.png',
    './images/company-logos/blubito.png',
    './images/company-logos/compax.png',
    './images/company-logos/dxc.png',
    './images/company-logos/energieSteiermark.png',
    './images/company-logos/ersteBank.png',
    './images/company-logos/internex.png',
    './images/company-logos/jobsAt.jpeg',
    './images/company-logos/microsoft.png',
    './images/company-logos/navax.png',
    './images/company-logos/novartis.png',
    './images/company-logos/planRadar.png',
    './images/company-logos/platomics.png',
    './images/company-logos/w1.png',
  ];

}
