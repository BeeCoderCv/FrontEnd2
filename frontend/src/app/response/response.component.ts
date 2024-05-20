import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LongEasyManagerService } from '../long-easy-manager.service';
import { ExpenseEntryService } from '../expense-entry.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @Input()reqText:string="";
  @Input()ref:string=""
  @Input() title:string="";
  @Input() Category="0";
  @Input() req: string = "";
  @Input() res: string = "";

  specific:string=''
  previousSearch:any[]=[];
tooltip="Rate response"
toggleUp:boolean=true;
toggleRating:boolean=false;
sub:any;
sub2:any;
status : any;
state : boolean = false;
queryDraft :  string []= ['',''];
selectedContent:any={
  req:null,
  res:null
  };
  data: string[] = [];
constructor(private restService :  LongEasyManagerService ,private _test:ExpenseEntryService) { }

  ngOnInit(): void {

    this.selectedContent.req=this.reqText;
    if(this.ref=='rating')this.selectedContent.res=this.res; else{
      this.getServerResponse();
      this.getStream()
    //  this.getQueryResponse1();
      // this.getQueryResponse();
   
    }
    console.log(this.reqText)

   // this.selectedContent=this.data[0].content;
 
  }

getStream(){
this.sub=  this._test.getStream(this.reqText).subscribe(
    chunk => {
      // this.data.push(chunk);
      this.selectedContent.res=chunk.partialText
      this.state = false;
      this.queryDraft[0]=chunk.partialText
      console.log(chunk.partialText)
      this.getScrollable()
    },
    error => {
      console.error('Error receiving stream:', error);
    },
    () => {
      console.log('Streaming completed');
    }
  );
}
  getServerResponse() {
    this.restService.fetchData()
    .subscribe( data => 
      
      console.log( data)
     );
    
   }


   getQueryResponse() {
   
  this.sub2=  this._test.getStream(this.reqText)
      .subscribe( chunk =>   
         {
          this.selectedContent.res=chunk.partialText
          this.state = false;
          this.queryDraft[1]=chunk.partialText
           // this.queryDraft.push(data.generated_text)
           // console.log(this.queryDraft)
         }
       );
  console.log(this.sub)  
   }
   getQueryResponse1() {
    this.state = true
   // this.restService.getResponse(this.reqText) 
   this.sub2=    this._test.getStream(this.reqText)
    .subscribe( data =>   
       {
        
        this.queryDraft[1]=data.generated_text
         // this.queryDraft.push(data.generated_text)
          const generatedText = data.generated_text;
          //  this.animateText(data.generated_text, 0); // Start animating the text
    
       }
     );
 }
 stopStream() {
  // Unsubscribe from the observable stream
  if (this.sub) {
    this.sub.unsubscribe();
    this.proceedToNext(0)
  }
  if (this.sub2) {
    this.sub2.unsubscribe();
    this.proceedToNext(1)
  }
}
 copyToClipboard(text : string) {
  // Create a textarea element
  const textarea = document.createElement('textarea');
  
  // Set the value of the textarea to the text you want to copy
  textarea.value = text;
  
  // Append the textarea to the document body
  document.body.appendChild(textarea);
  
  // Select the text in the textarea
  textarea.select();
  
  // Copy the selected text to the clipboard
  document.execCommand('copy');
  
  // Remove the textarea from the document body
  document.body.removeChild(textarea);
}


 animateText(text: string, index: number) {
  // if (index < text.length) {
  //   setTimeout(() => {
  //     this.selectedContent.res += text[index];
  //     this.animateText(text, index + 1);
  //   }, 100); // Adjust the delay as needed
  // }
}

toggleRes(){
  this.stopStream()
  //this.proceedToNext()
  }
proceedToNext(n:number){
  n==0?
  setTimeout(()=>{  if(this.specific != null && this.specific != ""){
    this.queryDraft =[];
    this.reqText=this.specific
    this.previousSearch.push(Object.assign({},this.selectedContent));
    this.getStream() // this.getQueryResponse1();
    // this.getQueryResponse();
    this.selectedContent.req=this.reqText;
    this.selectedContent.res=""
    this.specific ="";
    this.getScrollable()
  } })  : ""//this.getQueryResponse1();
}
getScrollable(){
  const scrollableElement:any = document.getElementById('scrollableElement');
  setTimeout(function() {
    scrollableElement.scrollTop = scrollableElement.scrollHeight;
}, 400);
}
togglePanel(){
  this.toggleUp?this.toggleUp=false:this.toggleUp=true;
}
toggleRatings(){
  this.toggleRating?this.toggleRating=false:this.toggleRating=true;
}
truncateMsg(x: string) {
  var ans = x; 
  var suffix= x.length>200?"...":""
  return ans.substring(0, 200)+suffix;
}

getContent(item:any){
 //this.selectedContent.res= "";
 this.selectedContent.res = item
//this.animateText(item, 0);


}
resp(){
  this.modalSave.emit()
  console.log("yrs")
}
}
