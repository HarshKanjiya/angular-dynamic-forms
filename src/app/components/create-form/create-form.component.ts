import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop";
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import Toast from 'awesome-toast-component';
import { ButtonModule } from 'primeng/button';
import { Overlay } from 'primeng/overlay';
import { HttpService } from '../../services/http-service.service';
import { addFormAction } from "../../reducers/formReducer";

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ButtonModule, CdkDrag, CdkDragHandle, CdkDropList, CdkDropListGroup, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './create-form.component.html',
  animations: [Overlay]

})
export class CreateFormComponent {


  constructor(private store: Store<any>, private httpService: HttpService) {
    store.select((state) => state.form.JsonData).subscribe(res => {
      this.jsonData = res
      console.log('json :>> ', res);
    })

  }

  jsonData: any[] = []

  availableInputs = ["Text", "Multiple Choice", "Radio Button", "Textarea", "date", "file upload", "optional", "conditional"]
  selectedInput: string = "conditional"

  temp: any = {};
  counter: number = 20
  OptionsCounter: number = 100


  required: boolean | null = null;
  labelString: string = ""
  optionsTempString: string = ""
  OptionTempValueString: string = ""

  // input Props
  placeholderString: string = ""
  selectedTypeOfInput: string = "text"
  typeOfInput = ["text", "password", "number"]


  multiChoiceOptions: any[] =
    [{ text: "bharat", optionValue: "in", optionId: 236 },
    { text: "america", optionValue: "usa", optionId: 234 },]

  minDate: string = "";
  maxDate: string = "";

  selectedFileType: string = "image/png"


  conditionalInputsArray: any = [

  ]

  conditionalInputLabelString: string = ""
  conditionalInputPlaceholderValue: string = ""
  conditionalInputSelectedField: string = ""
  conditionalInputsQuestionArray: any = []

  conditionalQuestionsOptionHelper(x: any) {
    this.conditionalInputSelectedField = x.value

  }

  addConditionalQuestion() {
    this.conditionalInputsQuestionArray.push({
      id: this.counter,
      condition: this.conditionalInputSelectedField,
      label: this.conditionalInputLabelString,
      placeholder: this.conditionalInputPlaceholderValue
    })

    this.counter += 1
    this.conditionalInputPlaceholderValue = ""
    this.conditionalInputLabelString = ""

  }

  removeConditionalQuestion(id: any) {
    this.conditionalInputsQuestionArray = this.conditionalInputsQuestionArray.filter((item: any) => (item.id !== id))

  }
  addConditionalBody() {
    let _temp = {
      id: this.counter,
      label: this.labelString,
      conditions: this.multiChoiceOptions,
      questions: this.conditionalInputsQuestionArray,
      "category": this.selectedInput

    }

    this.jsonData = [...this.jsonData, _temp]
  }


  addInputType() {
    // this.multiChoiceOptions = []
    this.temp["category"] = this.selectedInput

  }

  addInputBody() {

    if (this.labelString.trim().length > 0 && this.placeholderString.trim().length > 0 && this.required !== null) {

      let _temp: any = {
        "elementId": this.counter,
        "label": this.labelString,
        "placeholder": this.placeholderString,
        "required": this.required,
        "category": this.selectedInput
      }
      if (this.selectedInput === "Text") _temp["type"] = this.selectedTypeOfInput
      console.log('_temp :>> ', _temp);
      this.jsonData = [...this.jsonData, _temp]

      this.labelString = ""
      this.placeholderString = ""
      this.selectedTypeOfInput = "text"
      this.required = false

      this.counter += 1
    } else {
      new Toast("Please fill all the Details 🙏", { position: "top", timeout: 1300, theme: "light" })
    }
  }

  addOptions() {

    if (this.optionsTempString.trim().length > 0 && this.OptionTempValueString.trim().length > 0) {


      if (this.optionsTempString.trim() === "") return

      let temp = {
        optionId: this.OptionsCounter,
        optionValue: this.OptionTempValueString,
        text: this.optionsTempString
      }
      this.multiChoiceOptions.push(temp)
      this.optionsTempString = ""
      this.OptionTempValueString = ""

      this.OptionsCounter += 1
    } else {
      new Toast("Please fill all the Details 🙏", { position: "top", timeout: 1300, theme: "light" })
    }
  }


  removeOptions(id: number) {
    this.multiChoiceOptions = this.multiChoiceOptions.filter((item) => (item.id !== id))
  }

  removeField(elementId: number) {
    this.jsonData = this.jsonData.filter((item) => (item.elementId !== elementId))
  }

  addMultipleChoiceBody() {

    if (this.labelString.trim().length > 0 && this.multiChoiceOptions.length > 0 && this.required !== null) {
      let _temp = {
        "options": this.multiChoiceOptions,
        "elementId": this.counter,
        "label": this.labelString,
        "required": this.required,
        "category": this.selectedInput
      }
      this.jsonData = [...this.jsonData, _temp]
      console.log('_temp :>> ', _temp);

      // console.log(this.jsonData);
      this.OptionTempValueString = ""
      this.labelString = ""
      this.placeholderString = ""
      this.required = null
      this.multiChoiceOptions = []

      this.counter += 1
    } else {
      new Toast("Please fill all the Details 🙏", { position: "top", timeout: 1300, theme: "light" })
    }

  }

  addDateBody() {
    if (this.labelString.trim().length > 0 && this.minDate.trim().length > 0 && this.maxDate.trim().length > 0 && this.required !== null) {

      if (new Date(this.minDate) < new Date(this.maxDate)) {
        new Toast("Max date can not be smaller then the Min date.", { position: "top", timeout: 1300, theme: "light" })
      }

      let _temp = {
        "elementId": this.counter,
        "label": this.labelString,
        "required": this.required,
        "minDate": this.minDate,
        "maxDate": this.maxDate,
        "category": this.selectedInput
      }
      console.log('_temp :>> ', _temp);
      this.jsonData = [...this.jsonData, _temp]

      this.labelString = ""
      this.placeholderString = ""
      this.selectedTypeOfInput = "text"
      this.required = false

      this.counter += 1
    } else {
      new Toast("Please fill all the Details 🙏", { position: "top", timeout: 1300, theme: "light" })
    }
  }

  addFileUploadBody() {

    if (this.labelString.trim().length > 0 && this.required !== null) {

      let _temp = {
        "elementId": this.counter,
        "label": this.labelString,
        "required": this.required,
        "accept": this.selectedFileType,
        "category": this.selectedInput
      }
      console.log('_temp :>> ', _temp);
      this.jsonData = [...this.jsonData, _temp]

      this.labelString = ""
      this.placeholderString = ""
      this.selectedTypeOfInput = "text"
      this.required = false

      this.counter += 1
    } else {
      new Toast("Please fill all the Details 🙏", { position: "top", timeout: 1300, theme: "light" })
    }
  }

  addOptionalBody() {
    if (this.labelString.trim().length > 0 && this.placeholderString.trim().length > 0) {

      let _temp: any = {
        "elementId": this.counter,
        "label": this.labelString,
        "placeholder": this.placeholderString,
        "required": false,
        "category": this.selectedInput
      }
      console.log('_temp :>> ', _temp, this.jsonData);

      this.jsonData = [...this.jsonData, _temp]

      this.labelString = ""
      this.placeholderString = ""
      this.selectedTypeOfInput = "text"
      this.required = false

      this.counter += 1
    } else {
      new Toast("Please fill all the Details 🙏", { position: "top", timeout: 1300, theme: "light" })
    }
  }



  //

  discardAll() {
    this.jsonData = []
    this.temp = {}
    this.optionsTempString = ""
    this.multiChoiceOptions = []
    this.labelString = ""
    this.placeholderString = ""
    this.required = false
  }


  drop(event: CdkDragDrop<any[]>) {
    console.log('drop :>> ', event);

    let _temp = [...this.jsonData]

    const movedItem = _temp.splice(event.previousIndex, 1)
    _temp.splice(event.currentIndex, 0, movedItem[0]);

    console.log('_temp :>> ', _temp);
    this.jsonData = _temp
  }



  saveForm() {
    console.log('form :>> ', this.jsonData);
    this.httpService.postData("forms", { "data": this.jsonData }).subscribe(res => {
      console.log('res :>> ', res);
    })



    this.store.dispatch(addFormAction({ JsonData: this.jsonData }))
  }

}
