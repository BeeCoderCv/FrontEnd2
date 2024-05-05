import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LongEasyManagerService } from '../long-easy-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {
  status: any;
  specific: string = "";
  constructor(private restService: LongEasyManagerService, private router: Router, private route: ActivatedRoute) { }
  selectedVal: any= ""
  Category: any= "0";
  question=[
    {
     category: "Art",
     qest:"What is the best art ever produced"
    },
    {
      category: "Art",
      qest:"What is the color mixing"
     },
     {
      category: "Science",
      qest:"What is Physics"
     },
     {
       category: "Science",
       qest:"Describe string thoery"
      },
      {
        category: "Politics",
        qest:"Who is the current President of Nigeria"
       },
       {
         category: "Politics",
         qest:"Who is the current President of Unites State"
        },
  ]

  ngOnInit(): void {
    this.getServerResponse();
    this.getRecord();
 //  this.getQuestion(0, this.question.length)
  }
  getRecord() {
    this. selectedVal = this.route.snapshot.params["reference"];
    console.log(this.selectedVal)
  }
  getServerResponse() {
    this.restService.fetchData()
      .subscribe(data => this.status = data);
  }
  getQuestion(min:number, max:number){
    if(this.Category!="0"){
      var List =this.question.filter(v=>v.category==this.Category)
      max=List.length
      var val= Math.round(Math.random()* (max - min + 1) + min)
      console.log(val,min,max)
      this.specific=   List[val].qest?List[val].qest:List[0].qest
    }

  }



  arr: ElementRef<HTMLElement>[] = [];
  isSlim: boolean = false;
  showResponse: boolean = false;


  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  data = [
    {
      month: "February",
      chats: [
        "How to create a robotic car",
        "What is the highest view on the plannet"
      ]
    },
    {
      month: "January",
      chats: [
        "How to become a Politician",
        "History of Albert Einstein",
        "Theory of Dark matter and the Uncertainty Principle"
      ]
    },
    {
      month: "2023",
      chats: [
        "The Greatest of all time, Messi or Ronaldo",
        "statistics of Manchester United last season"
      ]
    }
  ]
  title = 'marketPlaceFrontend';
  truncateMsg(x: string) {
    var ans = x;
    var suffix = x.length > 24 ? "..." : ""
    return ans.substring(0, 24) + suffix;
  }
  togglePane() {
    this.isSlim ? this.isSlim = false : this.isSlim = true;
  }
  toggleRes(val: boolean) {
    if(this.specific != null && this.specific != ""){
      val ? this.showResponse ? this.showResponse = false : this.showResponse = true : this.showResponse = false;
      console.log(this.showResponse)
    }

  }
  onChange() {

  }
  resp() {
    this.modalSave.emit(true)
  }
}
