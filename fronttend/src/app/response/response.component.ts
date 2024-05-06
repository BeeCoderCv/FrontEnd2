import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LongEasyManagerService } from '../long-easy-manager.service';

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
  @Input() Category="0"

  specific:string=''
  previousSearch:any[]=[];
tooltip="Rate response"
toggleUp:boolean=true;
toggleRating:boolean=false;

status : any;
state : boolean = false;
queryDraft :  string []= [];
selectedContent:any={
  req:null,
  res:null
  };
constructor(private restService :  LongEasyManagerService ) { }

  ngOnInit(): void {

    this.selectedContent.req=this.reqText;
    console.log(this.reqText)

   // this.selectedContent=this.data[0].content;
    this.getServerResponse();
     this.getQueryResponse1();
     this.getQueryResponse();
  }


  getServerResponse() {
    this.restService.fetchData()
    .subscribe( data => 
      
      console.log( data)
     );
    
   }


   getQueryResponse() {
   
      this.restService.getResponse(this.reqText)
      .subscribe( data =>   
         {

            this.queryDraft.push(data.generated_text)
           // console.log(this.queryDraft)
         }
       );
    
   }
   getQueryResponse1() {
    this.state = true
    this.restService.getResponse(this.reqText) 
    .subscribe( data =>   
       {
        this.selectedContent.res= data.generated_text;

          this.queryDraft.push(data.generated_text)
          const generatedText = data.generated_text;
          //  this.animateText(data.generated_text, 0); // Start animating the text
          this.state = false;
       }
     );
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
  if (index < text.length) {
    setTimeout(() => {
      this.selectedContent.res += text[index];
      this.animateText(text, index + 1);
    }, 100); // Adjust the delay as needed
  }
}

toggleRes(){

      if(this.specific != null && this.specific != ""){
        this.queryDraft =[];
        this.reqText=this.specific
        this.previousSearch.push(Object.assign({},this.selectedContent));
      
        this.getQueryResponse1();
        this.getQueryResponse();
        this.selectedContent.req=this.reqText;
      
        this.specific ="";
        window.scrollTo(0, document.body.scrollHeight);
      }  

  
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
