import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  constructor() { }


  getThemeFromLocalStorage(): string {
    const theme = localStorage.getItem('theme');
    return theme !== null ? theme : 'light';
  }

  setThemeToLocalStorage(theme: string): void {
    localStorage.setItem('theme', theme);
  }

}
