import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-display',
  standalone: true,
  imports: [],
  templateUrl: './result-display.component.html',
})
export class ResultDisplayComponent {

  @Input() data: any;




}
