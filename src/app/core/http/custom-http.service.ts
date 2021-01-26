import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
  }

  post(url, data) {
    this.spinner.show();
    return Observable.create((observer) => {
      this.http.post(url, data).subscribe(response => {
        console.log(response);
        this.spinner.hide();
        observer.next(response);
      }, (err: any) => {
        this.spinner.hide();
        observer.error(err);
      });

    });

  }

  get(url) {
    this.spinner.show();
    return Observable.create((observer) => {
      this.http
        .get(url, {
          headers: new HttpHeaders({ "Custom-Header": "Hello" }),
          params: new HttpParams().set('print', 'pretty')
        })
        .pipe(map(response => {
          const postArray = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              postArray.push({ ...response[key], id: key })
            }
          }
          return postArray;
        })).subscribe((result) => {
          this.spinner.hide();
          observer.next(result);
        }, (err: any) => {
          this.spinner.hide();
          observer.error(err);
        });
    });

  }
}
