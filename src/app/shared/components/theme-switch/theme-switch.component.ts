
import {Component, Inject, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ThemeSwitchComponent implements OnInit {
  private isLightTheme!:boolean;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    const theme = this.themeService.getThemeFromLocalStorage();
    this.isLightTheme = theme === 'light';
    this.renderer.setAttribute(this.document.body, 'data-theme', theme);
  }

  onChangeTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    const theme = this.isLightTheme ? 'light' : 'dark';
    this.renderer.setAttribute(this.document.body, 'data-theme', theme);
    this.themeService.setThemeToLocalStorage(theme);
   
  }
}
