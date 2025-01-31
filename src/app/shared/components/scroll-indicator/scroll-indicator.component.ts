import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-scroll-indicator',
  standalone: true,
  templateUrl: './scroll-indicator.component.html',
  styleUrls: ['./scroll-indicator.component.scss']
})
export class ScrollIndicatorComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const arrowContainer = this.el.nativeElement.querySelector('.arrow-container');

    if (scrollPosition > 100) {
      this.renderer.addClass(arrowContainer, 'toTop');
      this.renderer.removeClass(arrowContainer, 'toTopReverse');
    } else {
      this.renderer.addClass(arrowContainer, 'toTopReverse');
      this.renderer.removeClass(arrowContainer, 'toTop');
    }
  }

  onScrollToTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior:'smooth'
    });
  }
}
