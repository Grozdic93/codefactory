import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss'
})
export class OptionComponent {
  @Input() title?: string;
  @Input() imgTitle?: string;
  @Input({required:true}) image!: string;
  @Input() textLeft: boolean = false;

}
