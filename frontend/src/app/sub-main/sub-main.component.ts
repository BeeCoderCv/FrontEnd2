import { Component, OnInit } from '@angular/core';
import { LongEasyManagerService } from '../long-easy-manager.service';

@Component({
  selector: 'app-sub-main',
  templateUrl: './sub-main.component.html',
  styleUrls: ['./sub-main.component.css']
})
export class SubMainComponent implements OnInit {

   status : any;
  constructor(private restService :  LongEasyManagerService ) { }
  ngOnInit(): void {
     this.getServerResponse();

  

  }

  getServerResponse() {
    this.restService.fetchData()
    .subscribe( data => this.status = data );
   }

 


  isEvaluate:boolean=true
    Switch(){
     this.isEvaluate=false
    }

    

}
