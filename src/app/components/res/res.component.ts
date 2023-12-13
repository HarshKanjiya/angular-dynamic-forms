import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { addResponseAction } from '../../reducers/formReducer';
import { HttpService } from '../../services/http-service.service';
import { ResultDisplayComponent } from "../result-display/result-display.component";

@Component({
  selector: 'app-res',
  standalone: true,
  templateUrl: './res.component.html',
  imports: [RouterLink, ButtonModule, ResultDisplayComponent]
})
export class ResComponent {


  rawJson: any;

  filtered: any;

  selectedRes: number = 1;
  currentRes: any

  constructor(private store: Store<any>, private httpService: HttpService) {


    this.httpService.getData("responses").subscribe((rawRes: any) => {

      // rawRes.map((res: any) => {
      //   for (let key in res) {
      //     if (res.hasOwnProperty(key)) {
      //       console.log('key :>> ', key);
      //     }
      //   }
      // })

      this.rawJson = rawRes

      this.store.dispatch(addResponseAction({ data: rawRes }))

    })

  }


  clickHandler(id: any) {

    let temp: any

    this.rawJson.map((item: any) => {
      if (item.id === id) {
        // console.log('hit :>> ', id, item);
        temp = item
      }
    })

    let text = []
    let checkbox = []
    let radio = []
    let textarea = []
    let date = []
    let file = []
    let optional = []

    for (let key in temp) {
      if (temp.hasOwnProperty(key)) {

        switch (key.split(" ")[0]) {
          case "input":
            text.push(temp[key])
            break
          case "multi":
            checkbox.push(temp[key])
            break
          case "radio":
            radio.push(temp[key])
            break
          case "textarea":
            textarea.push(temp[key])
            break
          case "date":
            date.push(temp[key])
            break
          case "file":
            file.push(temp[key])
            break
          case "optional":
            optional.push(temp[key])
            break
          default:
            break
        }
      }


    }
    this.currentRes = {
      id: temp.id,
      text, checkbox, radio, textarea, date, file, optional
    }
    console.log(' :>> ', this.currentRes);

  }


}
