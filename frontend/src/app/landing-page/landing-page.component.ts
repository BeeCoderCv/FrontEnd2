import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
  }
  resp(val:boolean){
   // this.modalSave.emit(val)
   val?
   this.router.navigate(['/askAI/evaluate']):
   this.router.navigate(['/askAI/rating'])
  }
}
