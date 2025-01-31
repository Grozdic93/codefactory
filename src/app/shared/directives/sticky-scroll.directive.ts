import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStickyScroll]',
  standalone: true
})
export class StickyScrollDirective {
  @Input() scrollThreshold: number = 150; // Default threshold

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowScroll = window.scrollY;
    if (windowScroll > this.scrollThreshold) {
      this.renderer.addClass(this.el.nativeElement, 'sticky');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'sticky');
    }
  }
}
