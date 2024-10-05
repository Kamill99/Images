import {Component} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private translateService: TranslateService) {
  }

  protected lang: string = 'pl';

  changeLanguage(lang: string): void {
    this.lang = lang;
    this.translateService.use(lang);
  }
}
