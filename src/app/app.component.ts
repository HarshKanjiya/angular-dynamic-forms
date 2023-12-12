import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from './services/http-service.service';
import { addFormAction } from './reducers/formReducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private store: Store<any>, private httpService: HttpService) {
    httpService.getData("forms").subscribe((res: any) => {
      store.dispatch(addFormAction({ JsonData: res[0].data }))
    })
  }
}
