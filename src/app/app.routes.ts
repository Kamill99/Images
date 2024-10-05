import {Routes} from '@angular/router';
import {ImagesListComponent} from "./components/images-list/images-list.component";
import {HomeComponent} from "./components/home/home.component";
import {ImageDetailsComponent} from "./components/image-details/image-details.component";

export const routes: Routes = [
  {path: '', component: HomeComponent, data: {animation: 'HomePage'}},
  {path: 'list', component: ImagesListComponent, data: {animation: 'ListPage'}},
  {path: 'image/:id', component: ImageDetailsComponent, data: {animation: 'ImageDetailPage'}},
];
