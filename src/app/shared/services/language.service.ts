import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.use(savedLang);
  }

  toggleLanguage() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'en' ? 'de' : 'en';
    this.translate.use(newLang);
    localStorage.setItem('lang', newLang);
  }

  getButtonLabel(): string {
    const currentLang = localStorage.getItem('lang') || this.translate.currentLang;
    return currentLang === 'en' ? 'DE' : 'EN';
  }

}
