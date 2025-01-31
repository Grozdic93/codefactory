import {Component, Inject, Renderer2, signal} from '@angular/core';
import {StickyScrollDirective} from "../../../shared/directives/sticky-scroll.directive";
import {NavbarComponent} from "./navbar/navbar.component";
import {DOCUMENT, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    StickyScrollDirective,
    NavbarComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  navVisible = signal(false);

  constructor(@Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) {
  }

  onSetVisible(){
    this.navVisible.update((navVisible )=> !navVisible);
    if(this.document.body.classList.contains('nav-visible')){
      this.renderer.removeClass(this.document.body, 'nav-visible');
    }else{
      this.renderer.addClass(this.document.body, 'nav-visible');
    }
  }

  onNavReset(){
    this.navVisible.set(false);
    if(this.document.body.classList.contains('nav-visible')){
      this.renderer.removeClass(this.document.body, 'nav-visible');
    }
  }


}
