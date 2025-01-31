import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-top-choice',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './top-choice.component.html',
  styleUrl: './top-choice.component.scss'
})
export class TopChoiceComponent {
  @Input() title?: string;
  @Input() imgTitle?: string;
  @Input({required:true}) image!: string;
  @Input() textLeft: boolean = false;
}
