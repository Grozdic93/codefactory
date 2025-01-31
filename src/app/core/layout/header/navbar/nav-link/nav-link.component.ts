import {Component, ElementRef, Input, Renderer2} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.scss'
})
export class NavLinkComponent {
  @Input() link?: string;
  @Input() isDropdown = false;
  @Input() class = '';
  @Input() coursesClass?:boolean;
  isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {}

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.renderer.addClass(this.el.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'open');
    }
  }

}
