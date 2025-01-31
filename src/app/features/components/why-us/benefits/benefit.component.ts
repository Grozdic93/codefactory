import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-benefit',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslateModule
  ],
  template:`
    <div class="sprite" [style.width]="size + 'px'">
      <div class="img-wrapper">
        <img priority width="{{size}}" height="{{size}}" [ngSrc]="img" alt="">
      </div>
      <p class="bold">{{ text }}</p>
    </div>`,
  styles:`.bold{
    font-weight: 700;
  }
  .sprite{
    padding: 1rem;
    margin-inline: auto;
  }
  .img-wrapper{
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding:1rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  p{
    text-align: center;
  }`
})
export class BenefitComponent {
  @Input({required:true}) text!: string;
  @Input({required:true}) img!: string;
  @Input() size?: number = 250;

}
