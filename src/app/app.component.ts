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

  constructor(private store: Store<any>, private http: HttpService) {
    http.getData("forms").subscribe((res: any) => {

      let dataObj = res.reverse()[0]

      store.dispatch(addFormAction({ JsonData: dataObj?.data ?? [] }))
    })
  }
}
