import { Component, OnInit } from '@angular/core';
import { ExpenseEntryService } from '../expense-entry.service';
import { IExpenseEntry } from '../interface/iexpense-entry';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css'],

})
export class OthersComponent implements OnInit {
  title!: string;
  expenseEntries!: any;
  expenseEntry! : any;
  public colorRed! : string ;
public colorBlue! : string ;
public colorElement!: string;
expenseEntry$? : any;
getExpenseEntries(): any {
  let mockExpenseEntries: any
      return mockExpenseEntries;
}


public selectedID ! : any;
 constructor( public entryService: ExpenseEntryService, private router: Router, private route : ActivatedRoute){
    
}

getExpenseItems() { 
  this.entryService.getExpenseEntries() .subscribe( data => this.expenseEntries = data ); };


  delete(dataObject:any) {
   
     if (dataObject) {
      this.entryService.deleteExpenseEntry(dataObject).subscribe(res => {
        console.log(res), this.getExpenseItems() 
      })
     
    }
   
  };
  

  goToList() {
    this.router.navigate(['/others']);
    }
  
    
  ngOnInit() {
    this.title ="Web API Resource with Angular Service Support"
    this.colorBlue ="blue";
    this.colorRed ="red";
   
    this.getExpenseItems() 
    
  }
  
}
