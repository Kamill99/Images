import {Component, inject, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {ImagesService} from "../../services/images-service";
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";
import {map} from "rxjs";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

export interface Image {
  id: string;
  author: string;
  download_url: string;
  height: number;
  width: number;
  url: string;
}

@Component({
  selector: 'app-images-list',
  standalone: true,
  imports: [
    TranslateModule,
    MatCard,
    MatCardContent,
    MatCardImage,
    NgOptimizedImage,
    MatCardActions,
    MatButton,
    RouterLink,
    FormsModule
  ],
  templateUrl: './images-list.component.html',
  styleUrl: './images-list.component.css'
})
export class ImagesListComponent implements OnInit {
  private imagesService: ImagesService = inject(ImagesService);
  protected images: Image[];
  protected currentPage: number = 1;
  protected totalPages: number = 10;

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.imagesService.getImages(this.currentPage).pipe(
      map((images: Image[]) => images.map((image: Image) => {
        return {...image, download_url: image.download_url + '.jpg'};
      }))
    ).subscribe(
      images => {
        this.images = images;
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadImages();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadImages();
    }
  }
}
