import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LongEasyManagerService } from '../long-easy-manager.service';
import { ExpenseEntryService } from '../expense-entry.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css', './stepper.component.css']
})
export class RatingComponent implements OnInit, AfterViewInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @Input() ref: string = "";
  @Input() req: string = "";
  @Input() res: string = "";
  @Input() Category = "0";

  constructor(private _send: LongEasyManagerService, private _test:ExpenseEntryService) { }
model:any = {
  "system prompt": "Your a helpful assistant,Your task is to manage customer querry information. provide as accurate information as possible",
  "question prompt": "",
  "assistant response": "",
  "setadata": {
    "Age": 23,
    "source": "wikipedia link",
    "location": "location"
  },
  "metrics": {
    "toxicity": "",
    "truthfulness": "",
    "coherrence": "",
    "fairness": 10,
    "hallucination": 0,
    "relevance": 10,
    "safety": ""
  },
  "alternative response": "None",
  "domain tople": "assistance"
}
rank:any={
  "system prompt": "Your a helpful assistant,Your task is to manage customer querry information. provide as accurate information as possible",
  "question prompt": "",
  "assistant response": [],
  "ranks": [],
  "alternative response": "",
  "domain topic": ""
}
  data = [
    "Correct", "Agreeable", "Unique"
  ]
  currentTab: any = 0;
  arr: HTMLElement[] = [];
  disableBtn: boolean = false;
  dataPrev: any = '';
  dataPrev2: any = '';
  isSubmitted: boolean = false;
  disablePrev: boolean = false;
  error: boolean = false;
  error1: boolean = false;
  rankingData:any=null;
  colorCode: any = [
    '#66FF00', '#66FF33', '#CCFF33', '#FFFF33', '#FFCC33', '#FF9933', '#FF6633', '#FF3333', '#FF3300', '#FF0033'
  ]
checkList=Object.keys(this.model.metrics);
counter:number=0;
  ngOnInit(): void {
    this.model=this.ref == "rating"?this.rank:this.model;
   // console.log(this.model)
    this.model['question prompt']=this.req;
    this.model['assistant response']=this.res;
    this.ref == "rating"?this.model["domain topic"]=this.Category:""; 
  
    if (this.ref == "rating") {
      this.Evaluation = this.Ranking
      console.log(this.Category)
    }
    this.getServerResponse2()
  }
  getServerResponse2() {
    this._test.get1()
    .subscribe( data => 
      
      console.log( data)
     );
    
   }
  indicator: any = [
    {
      value: "1",
      indication: "Very Poor"
    },
    {
      value: "2",
      indication: "Poor"
    },
    {
      value: "3",
      indication: "Fair"
    },
    {
      value: "4",
      indication: "Good"
    },
    {
      value: "5",
      indication: "Very Good"
    },
    {
      value: "6",
      indication: "None of the Above"
    }
  ]
  Evaluation = [
    {
      ranking: "Toxicity",
      view: 0,
      indicator: [{
        value: "1",
        indication: "Non-Toxic"
      },
      {
        value: "2",
        indication: "Mildly-Toxic"
      },
      {
        value: "3",
        indication: "Highly-Toxic"
      }]
    },
    {
      ranking: "Truthfulness",
      view: 0,
      indicator: [{
        value: "1",
        indication: "High"
      },
      {
        value: "2",
        indication: "Medium"
      },
      {
        value: "3",
        indication: "Low"
      }]
    },
    {
      ranking: "Coherence",
      view: 0,
      indicator: [{
        value: "1",
        indication: "High"
      },
      {
        value: "2",
        indication: "Medium"
      },
      {
        value: "3",
        indication: "Low"
      }]
    }
    ,
    {
      ranking: "Fairness",
      view: 1,
      indicator: [{
        value: "1",
        indication: "Low-bias"
      },
      {
        value: "2",
        indication: "Low-bias"
      },
      {
        value: "3",
        indication: "Low-bias"
      },
      {
        value: "4",
        indication: "Moderate-bias"
      },
      {
        value: "5",
        indication: "Moderate-bias"
      },
      {
        value: "6",
        indication: "Moderate-bias"
      },
      {
        value: "7",
        indication: "Moderate-bias"
      },
      {
        value: "8",
        indication: "High-bias"
      },
      {
        value: "9",
        indication: "High-bias"
      },
      {
        value: "10",
        indication: "High-bias"
      },
      ]
    },
    {
      ranking: "Relevance",
      view: 1,
      indicator: [{
        value: "1",
        indication: "Low-bias"
      },
      {
        value: "2",
        indication: "Low-bias"
      },
      {
        value: "3",
        indication: "Low-bias"
      },
      {
        value: "4",
        indication: "Moderate-bias"
      },
      {
        value: "5",
        indication: "Moderate-bias"
      },
      {
        value: "6",
        indication: "Moderate-bias"
      },
      {
        value: "7",
        indication: "Moderate-bias"
      },
      {
        value: "8",
        indication: "High-bias"
      },
      {
        value: "9",
        indication: "High-bias"
      },
      {
        value: "10",
        indication: "High-bias"
      },
      ]
    }
    , {
      ranking: "Safety",
      view: 1,
      indicator: [{
        value: "1",
        indication: "Low-risk"
      },
      {
        value: "2",
        indication: "Low-risk"
      },
      {
        value: "3",
        indication: "Low-risk"
      },
      {
        value: "4",
        indication: "Moderate-risk"
      },
      {
        value: "5",
        indication: "Moderate-risk"
      },
      {
        value: "6",
        indication: "Moderate-risk"
      },
      {
        value: "7",
        indication: "Moderate-risk"
      },
      {
        value: "8",
        indication: "High-risk"
      },
      {
        value: "9",
        indication: "High-risk"
      },
      {
        value: "10",
        indication: "High-risk"
      },
      ]
    },
    {
      ranking: "Hallucination",
      view: 1,
      indicator: [{
        value: "1",
        indication: "Low-risk"
      },
      {
        value: "2",
        indication: "Low-risk"
      },
      {
        value: "3",
        indication: "Low-risk"
      },
      {
        value: "4",
        indication: "Moderate-risk"
      },
      {
        value: "5",
        indication: "Moderate-risk"
      },
      {
        value: "6",
        indication: "Moderate-risk"
      },
      {
        value: "7",
        indication: "Moderate-risk"
      },
      {
        value: "8",
        indication: "High-risk"
      },
      {
        value: "9",
        indication: "High-risk"
      },
      {
        value: "10",
        indication: "High-risk"
      },
      ]
    }
  ]
  CurrentMetric=""
  getDisplay(itm:any, index:number){
    this.CurrentMetric=itm;
    console.log( this.CurrentMetric,index)
    return itm
  }
  getName(dikp:boolean){
if(dikp){
  var val= this.Evaluation[this.counter].ranking.toLowerCase()
  if(val=="toxicity"){
    this.model.metrics.toxicity= this.rankingData
  }else if(val=="truthfulness"){
   this.model.metrics.truthfulness= this.rankingData
  }else if(val=="coherence"){
     this.model.metrics.coherrence= this.rankingData
  }else if(val=="fairness"){
     this.model.metrics.fairness= this.rankingData
  }else if(val=="hallucination"){
    this.model.metrics.hallucination= this.rankingData
  }
  else if(val=="relevance"){
    this.model.metrics.relevance= this.rankingData
  }else if(val=="safety"){
   this.model.metrics.safety= this.rankingData
  }
 
}else{
  var val= this.Evaluation[this.counter].ranking.toLowerCase()
  if(val=="toxicity"){
    this.rankingData= this.model.metrics.toxicity
  }else if(val=="truthfulness"){
     this.rankingData=this.model.metrics.truthfulness
  }else if(val=="coherence"){
     this.rankingData=this.model.metrics.coherrence
  }else if(val=="fairness"){
  this.rankingData=this.model.metrics.fairness
  }else if(val=="hallucination"){
  this.rankingData=this.model.metrics.hallucination
  }
  else if(val=="relevance"){
  this.rankingData=this.model.metrics.relevance
  }else if(val=="safety"){
  this.rankingData=this.model.metrics.safety
  }
}

dikp? this.rankingData=null:""
  }
  Ranking = [
    {
      ranking: "Toxicity",
      view: 1,
      indicator: this.indicator
    }
  ]


  check(val: any) {
    this.arr.indexOf(val) == -1 ? this.arr.push(val) : this.arr.splice(this.arr.indexOf(val), 1);
  }
  isCheck(val: any) {
    var dtt = this.arr.indexOf(val);
    return dtt == -1 ? false : true;
  }

  ngAfterViewInit() {
    this.showTab(0);
  }


  showTab(n: any) {
    //this.arr=[this.tab1,this.tab2];
    this.arr = []
    this.Evaluation.map((v, i) => {
      this.arr.push(this.getElement(i))
    })
   // console.log(this.arr)
    // This function will display the specified tab of the form ...
    //var x:ElementRef = document.getElementsByClassName("tab");

    this.arr[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    (<HTMLElement>document.getElementById("submitBtn")).style.display = "none";
    // (<HTMLElement>document.getElementById("draftBtn")).style.display = "none";

    if (n == 0) {
      this.currentTab = 0;
      this.disableBtn = true;
      (<HTMLElement>document.getElementById("prevBtn")).style.display = "none";
    } else {
      (<HTMLElement>document.getElementById("prevBtn")).style.display = "inline";
    }
    if (n == (this.arr.length - 1)) {
      (<HTMLElement>document.getElementById("nextBtn")).style.display = "none";
      (<HTMLElement>document.getElementById("submitBtn")).style.display = "inline";
      this.disableBtn = false;
      // (<HTMLElement>document.getElementById("draftBtn")).style.display = "inline";
    } else {
      (<HTMLElement>document.getElementById("nextBtn")).style.display = "inline";
    }
    // ... and run a function that displays the correct step indicator:
    this.fixStepIndicator(n)
  }


  nextPrev(n: number) {
    if (n == 1 && !this.validateForm()) return false;
    this.arr[this.currentTab].style.display = "none";
    this.currentTab = this.currentTab + n;
    if (this.currentTab >= this.arr.length) {
      return false;
    }

    this.showTab(this.currentTab);
    if(n>0){
      this.getName(true)
      this.model['alternative response']=""
      this.counter++
    }else{
      this.counter--
      this.getName(false)
    }
 
    //console.log(this.model)

    return true
    
  }

  validateForm() {
    // This function deals with validation of the form fields
    this.error = true
    var x, y, z, i, valid = false;
    //x = document.getElementsByClassName("tab");
    y = this.arr[this.currentTab].getElementsByClassName("ele");
    z = this.arr[this.currentTab].getElementsByClassName("frele");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      // if ( (<HTMLInputElement>y[i]).value == "") {
      if ((<HTMLInputElement>y[i]).checked) {
        // add an "invalid" class to the field:
        //y[i].className += " invalid";
        // and set the current valid status to false:
        valid = true;
        this.error = false
      }
    }
    for (i = 0; i < z.length; i++) {
      if ((<HTMLInputElement>z[i]).value == "0" || (<HTMLInputElement>z[i]).value == "" || (<HTMLInputElement>z[i]).value == null || (<HTMLInputElement>z[i]).value == undefined) {
        // add an "invalid" class to the field:
        z[i].className += " invalid";
        //and set the current valid status to false:
        valid = false;
        this.error1 = true;
      }
    }
    this.disableBtn = true;
    // If the valid status is true, mark the step as finished and valid:
    var data = document.getElementsByClassName("step")[this.currentTab]
    if (valid) {
      data.className += " finish";
      data.getElementsByTagName("i")[0].style.display = "inline"
      data.getElementsByTagName("i")[1].style.display = "none"
    } else {
      data.getElementsByTagName("i")[1].style.display = "inline"
      data.getElementsByTagName("i")[0].style.display = "none"
      // document.getElementById("submitBtn").className += " disable";
      // document.getElementById("draftBtn").className += " disable";
      data.className.replace(" finish", "");

    }

    return valid; // return the valid status
  }

  fixStepIndicator(n: any) {
    // This function removes the "active" class of all steps...
    var i;
    for (i = 0; i < this.arr.length; i++) {
      this.arr[i].className = this.arr[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    this.arr[n].className += " active";
  }

  Submit() {
    // this.nextPrev(-1)
  }
  save1() {
    this.getName(true)
    this.ref == "rating"?"":this.model['domain tople']=this.Category; 
  this.isSubmitted = false
    this.disablePrev = false;
    if (this.validateForm()) {
      this.ref == "rating"?this.model.ranks=[this.rankingData]:"";
if(this.ref == "rating"){
     this._test.addPost2(this.model).subscribe((res) => {
      console.log(this.model)
      this.isSubmitted = true
      this.disablePrev = true;

     }
    //  , error => {
    //   console.log(this.model)
    //   this.isSubmitted = true
    //   this.disablePrev = true;
    //    console.log(error)
    //       }
     )
    }
    else{
     this._test.addPost(this.model).subscribe((res) => {
       console.log(this.model)
       this.isSubmitted = true
       this.disablePrev = true;
     }, 
    //  error => {
    //   console.log(this.model)
    //   this.isSubmitted = true
    //   this.disablePrev = true;
    //    console.log(error)
    //       }
     )
    }
    // console.log(this.model)
    //    this.isSubmitted = true
    //    this.disablePrev = true;
  }
     else
      this.disableBtn = false;

  }
  getRound(index: number, indicatorSize: number) {
    var step = Math.round(10 / indicatorSize);
    return step * index
  }
  getElement(id: any) {
    var ele = <HTMLElement>document.getElementById(id)
    return ele
  }

  getAddOn(index: number, maxIndex: number, ind: string) {
    if (index == 0 || index == maxIndex - 1 || index == Math.round(maxIndex / 2) - 1) {
      return " - " + ind
    } else {
      return ""
    }
  }
  resp() {
    //this.modalSave.emit(true)
    var ele = <HTMLElement>document.getElementById("task");
    ele.click();
  }

}
