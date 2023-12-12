import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-res',
  standalone: true,
  imports: [],
  templateUrl: './res.component.html',
  styleUrl: './res.component.css'
})
export class ResComponent {
  constructor(private store: Store<any>, private httpService: HttpService) { }


}
