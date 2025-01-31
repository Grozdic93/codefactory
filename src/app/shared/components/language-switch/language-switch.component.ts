// src/app/shared/components/language-switch.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-language-switch',
  template: `
    <button (click)="toggleLanguage()" class="language-switch-button">
      <i class="fas fa-globe"></i>
      <span>{{ buttonLabel }}<i class="fa-solid fa-arrow-right"></i></span>
    </button>
  `,
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent {
  buttonLabel: string;
  private languageService = inject(LanguageService);

  constructor() {
    this.buttonLabel = this.languageService.getButtonLabel();
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
    this.buttonLabel = this.languageService.getButtonLabel();
  }
}
