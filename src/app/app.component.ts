import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ImagesListComponent} from "./components/images-list/images-list.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HeaderComponent} from "./components/header/header.component";
import {slideInAnimation} from "./animations/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImagesListComponent, TranslateModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent {
  private title: string = 'Images';

  constructor(protected translate: TranslateService) {
    translate.addLangs(['pl', 'en']);
    translate.setDefaultLang('pl');
    const browserLang = translate.getBrowserLang() as string;
    translate.use(browserLang.match(/pl|en/) ? browserLang : 'pl');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
