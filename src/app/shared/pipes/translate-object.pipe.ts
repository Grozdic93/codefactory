import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translateObject',
  pure: false,
  standalone: true
})
export class TranslateObjectPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: any, field: string, fieldDe: string): string {
    if (!value) return '';
    const currentLang = this.translateService.currentLang || this.translateService.defaultLang;
    return currentLang === 'de' ? value[fieldDe] : value[field];
  }
}
