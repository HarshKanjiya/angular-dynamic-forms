import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, ButtonModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  labelString: string = ""

  labels: any = []
  counter = 0

  add() {
    this.labels.push({ id: this.counter, text: this.labelString })
    this.labelString = ""
    this.counter += 1
  }
  remove(id: any) {
    this.labels = this.labels.filter((item: any) => {
      if (item.id === id) {
        return false
      }
      return true
    })

  }
}
