import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-viewform',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ButtonModule],
  templateUrl: './viewform.component.html',
})
export class ViewformComponent {

  JsonForm: any = [];
  formData: any = {}


  selectedOptions: any = []

  base64Image: string | null = null;
  base64Images: any = {}


  optionalDataBooleans: any = {}



  constructor(private store: Store<any>, private httpService: HttpService) {
    this.store.select("form").subscribe((res: any) => {
      this.JsonForm = res.JsonData
      // console.log('res :>> ', this.JsonForm)


      res.JsonData.map((field: any) => {
        console.log('field :>> ', field);

        switch (field.category) {

          case "Text":
            this.formData[`input ${field.elementId}`] = ""
            break
          case "Multiple Choice":
            this.formData[`multi ${field.elementId}`] = []
            break
          case "Radio Button":
            this.formData[`radio button ${field.elementId}`] = ""
            break
          case "Textarea":
            this.formData[`textarea ${field.elementId}`] = ""
            break
          case "date":
            this.formData[`date ${field.elementId}`] = ""
            break
          case "file upload":
            this.formData[`file ${field.elementId}`] = ""
            break
          case "optional":
            this.optionalDataBooleans[field.elementId] = false
            this.formData[`optional ${field.elementId}`] = ""
            break
          default:
            console.log("Invalid entry!");
        }
      })
      console.log('optio :>> ', this.formData, this.optionalDataBooleans);
    })

  }


  optionChangeHelper(elementId: any, optionId: any, checked: boolean) {

    let options = this.JsonForm[elementId].options
    let selection: any[] = [...this.formData[`multi ${elementId}`]]

    if (checked) {
      options.forEach((ele: any) => {
        if (ele.optionId === optionId) {
          selection.push(ele.optionValue)
        }
      });

      this.formData[`multi ${elementId}`] = selection
    }
    else {
      options.forEach((ele: any) => {
        if (ele.optionId === optionId) {
          selection = selection.filter(item => item !== ele.optionValue);
        }
      });


      this.formData[`multi ${elementId}`] = selection
    }

  }







  // uploadImage(image: File): Observable<Response> {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   return this.http.post('/api/v1/image-upload', formData);
  // }

  handleImageUpload(event: any, elementId: any): void {
    const input = event.target;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.base64Image = reader.result as string

        this.base64Images[`file ${elementId}`] = reader.result as string

      };

      reader.readAsDataURL(file);
    }
  }

  optionalDataBooleansChangeHandler(id: any, value: any) {
    this.optionalDataBooleans[id] = value
    console.log('object :>> ', this.optionalDataBooleans);
  }

  submitForm(data: any) {


    for (let key in this.formData) {
      if (this.formData.hasOwnProperty(key)) {

        if (key.toString().split(" ")[0] !== "multi") {

          this.formData[key] = data[key]
        }
      }
    }

    for (let key in this.base64Images) {
      if (this.formData.hasOwnProperty(key)) {
        this.formData[key] = this.base64Images[key]
      }
    }

    console.log('form :>> ', this.formData);

    this.httpService.postData("responses", this.formData).subscribe((res) => {
      console.log('res :>> ', res);
    })

  }
}
