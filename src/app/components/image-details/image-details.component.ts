import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {BlurLevelOperations} from "../../services/images-service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-image-details',
  standalone: true,
  imports: [
    TranslateModule,
    MatButton,
    NgOptimizedImage
  ],
  templateUrl: './image-details.component.html',
  styleUrl: './image-details.component.css'
})
export class ImageDetailsComponent implements OnInit {
  imageId: string;
  imageUrl: string;
  imageWithColors: boolean = true;
  blurLevel: number = 0;

  private route: ActivatedRoute = inject(ActivatedRoute);

  protected readonly BlurLevelOperations = BlurLevelOperations;

  ngOnInit(): void {
    this.imageId = this.route.snapshot.paramMap.get('id')!;
    this.loadImage();
  }

  protected loadImage(): void {
    if (!this.blurLevel)
      this.imageUrl = `https://picsum.photos/id/${this.imageId}/350${this.imageWithColors ? '' : '?grayscale'}`;
    else if (this.blurLevel && this.imageWithColors)
      this.imageUrl = `https://picsum.photos/id/${this.imageId}/350/?blur=${this.blurLevel}`;
    else if (this.blurLevel && !this.imageWithColors)
      this.imageUrl = `https://picsum.photos/id/${this.imageId}/350?grayscale&blur=${this.blurLevel}`;
  }

  protected changeColors(toGreyscale: boolean): void {
    this.imageWithColors = !toGreyscale;
    this.loadImage();
  }

  protected changeBlurLevel(operation: string): void {
    switch (operation) {
      case BlurLevelOperations.INCREASE:
        this.blurLevel++;
        this.loadImage();
        break;
      case BlurLevelOperations.DECREASE:
        this.blurLevel--;
        this.loadImage();
        break;
    }
  }

  protected goBack(): void {
    window.history.back();
  }

  protected viewImageSource(): void {
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = this.imageUrl;
    link.download = `image-${this.imageId}.jpg`;
    link.click();
  }
}
