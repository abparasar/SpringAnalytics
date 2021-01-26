import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CustomHttpService } from './core/http/custom-http.service';
import { DialogService } from './shared/services/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spring-analytics';
  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  fillerNav = ['Home','Coming Next']

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private customHttp: CustomHttpService, private dialogService: DialogService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  post(){
    console.log('hi');
    this.customHttp.post('https://spring-analytics.firebaseio.com/posts.json', {tes: 'test'});
  }

  get(){
    console.log('hi');
    this.customHttp.get('https://spring-analytics.firebaseio.com/posts.json').subscribe(response=>{
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  login(){
    debugger;
    this.dialogService.openAuthComponent();
  }
}
