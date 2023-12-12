import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../services/http-service.service';
import { addResponseAction } from '../../reducers/formReducer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-res',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './res.component.html',
  styleUrl: './res.component.css'
})
export class ResComponent {


  rawJson: any;

  filtered: any

  constructor(private store: Store<any>, private httpService: HttpService) {


    this.httpService.getData("responses").subscribe((rawRes: any) => {
      console.log('res :>> ', rawRes);

      rawRes.map((res: any) => {
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            console.log('key :>> ', key);
          }
        }
      })

      this.rawJson = rawRes
      this.store.dispatch(addResponseAction({ data: rawRes }))

    })

  }


}
