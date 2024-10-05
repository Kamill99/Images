import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../components/images-list/images-list.component";

export enum BlurLevelOperations {
  INCREASE = "increase",
  DECREASE = "decrease",
}

@Injectable({providedIn: 'root'})
export class ImagesService {
  private apiUrl: string = 'https://picsum.photos/v2/list';

  constructor(private http: HttpClient) {
  }

  getImages(page: number = 1, limit: number = 30): Observable<Image[]> {
    const url: string = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get<Image[]>(url);
  }
}
