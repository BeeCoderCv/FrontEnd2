import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LongEasyManagerService } from '../long-easy-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ExpenseEntryService } from '../expense-entry.service';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {
  status: any;
  specific: string = "";
  constructor(private restService: LongEasyManagerService, private router: Router, private route: ActivatedRoute,private _test:ExpenseEntryService) { }
  selectedVal: any= ""
  Category: any= "0";
  ListCategory: any= [];
  question2:any=[];
  listOfGenerated :any=[];
  answer:string=""
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
hideGenerate:boolean=false;
alert:boolean=false;
  ngOnInit(): void {
    this.getServerResponse();
    this.getRecord();
    this.getCat();
 //  this.getQuestion(0, this.question.length)
  }
  getRecord() {
    this. selectedVal = this.route.snapshot.params["reference"];
    console.log(this.selectedVal)
  }
  getCat() {
    this._test.getCategory()
      .subscribe(data => {
        console.log(data)
        this.ListCategory = data.data
      });
  }
  getQuestions(cat:string,min:number, max:number) {
    this.alert =false;
    if(this.Category!="0"){
    this._test.getQuestionByCategory(cat)
      .subscribe(data => {
        max=this.question2.length;
        console.log(data)
        this.question2= data.data;
       
          var List =this.question2
          max=List.length-1
          var val= Math.round(Math.random()* (max - min))
          console.log(val,min,max)
          var ddt= List[val]// val<=List.length-1?List[val]:List[0];
          this.handleAnsweredQuestion(val)
          if(this.question2.length>0 &&this.listOfGenerated.length<this.question2.length ){
          while(! this.proceed){
            val= Math.round(Math.random()* (max - min)) //Math.round(Math.random()* (max - min + 1) + min)
            ddt= List[val]
            this.handleAnsweredQuestion(List[val])
          }
          this.specific= ddt.question;
          this.answer =ddt.answer;
          this.hideGenerate=false;
          setTimeout(()=>this.toggleRes(true)   ,500)
          ;
        }else{
     this.alert=true;
     this.hideGenerate=false;
          }
      });
    }else{
      this.hideGenerate=false;
    }
  }
  getServerResponse() {
    this.restService.fetchData()
      .subscribe(data => this.status = data);
  }
  getQuestion(cat:string,min:number, max:number){
    this.hideGenerate=true
    this.getQuestions(cat,min, max)
  }



  arr: ElementRef<HTMLElement>[] = [];
  isSlim: boolean = false;
  showResponse: boolean = false;
  proceed:boolean=false;


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
    }else{
      this.showResponse = false
    }

  }
  revert(val:boolean){
    this.specific='';
   this.alert=false;
    this.toggleRes(val)
  }
  revert2(){
    this.specific='';
   this.alert=false;
  this.listOfGenerated=[]
  }
  onChange() {

  }
  resp() {
    this.modalSave.emit(true)
  }

  handleAnsweredQuestion(ind:any){
    debugger
    if(this.listOfGenerated.indexOf(ind)==-1){
      this.listOfGenerated.push(ind)
      this.proceed =true
    }else{
      this.proceed =false
    }
  }
}
