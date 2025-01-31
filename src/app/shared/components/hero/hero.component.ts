import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
@Input({required:true}) title!:string;
@Input({required:true}) img!:string;
}
