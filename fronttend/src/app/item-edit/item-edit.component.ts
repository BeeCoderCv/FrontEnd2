import { Component, OnInit } from '@angular/core';
import { ExpenseEntryService } from '../expense-entry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm  } from '@angular/forms';
import { IExpenseEntry } from '../interface/iexpense-entry';


@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  expenseEntry$! : Observable<any>;
  expenseEntries: any;
  selectedId!: any;

  public Item!:string;
  myForms! : FormGroup;
  

  
 

  constructor( public fb : FormBuilder, private restService : ExpenseEntryService, private router : Router, private route : ActivatedRoute ) 
  { }
  
 getRecord(){
                // get ID from rout param then assign to expense entry observable
              this.expenseEntry$ = this.route.paramMap.pipe(
                switchMap(params => {
                                this.selectedId = Number(params.get('id'));
                              
                              // return record to observable 
                              return this.restService.getExpenseEntry(this.selectedId);
                              
                          } )
                        );
              // subscribe to the observable to get entries
            this.expenseEntry$.subscribe(data =>{
              this.expenseEntries = data,
              console.log(this.expenseEntries)
        
        
              //initialize form fields
              this.myForms = new FormGroup({
                        id: new FormControl({value:this.expenseEntries.id, disabled:true }),
                        item: new FormControl(this.expenseEntries.item),
                        category:new FormControl(this.expenseEntries.category),
                        amount: new FormControl(this.expenseEntries.amount),
                        location: new FormControl(this.expenseEntries.location),
                        spendOn: new FormControl(this.expenseEntries.spendOn)
          })

        } )
 }
 getExpenseItems() { 
  this.restService.getExpenseEntries() .subscribe( data => this.expenseEntries = data ); };

  ngOnInit() {
      // call the form method below
    this.getRecord()

    
     

     
     
    }
      
  
    editItem(formdata:any){
      //alert(formdata.id)
    //console.log("This is the submitted data "+ JSON.stringify(formdata))
      this.restService.updateExpenseEntry(this.selectedId, formdata)
        .subscribe(  );
       this.getExpenseItems();
       this.goBack()
    }
     
   goBack(){
    this.getExpenseItems();
    this.router.navigate(['/home']);
   }

}
