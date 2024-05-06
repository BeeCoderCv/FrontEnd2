import { Component, OnInit } from '@angular/core';
import { ExpenseEntryService } from '../expense-entry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm  } from '@angular/forms';
import { IExpenseEntry } from '../interface/iexpense-entry';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  expenseEntry$? : Observable<any>;
  expenseEntry: any;
  selectedId!: number;
  
  // form data
  requiredForm!: FormGroup;
  formdata!:string;
  userName!: string;
  data!: string;
  password!: string;
  public Item!:string;
  public readonly myFormGroup! : FormGroup;
  constructor( public fb : FormBuilder, private restService : ExpenseEntryService, private router : Router, private route : ActivatedRoute ) 
  { }
  
//Create required field validator for name
  myForm() {      
        this.requiredForm = this.fb.group({
                               
                                item: ["" , Validators.required ],
                                category: [, Validators.required ],
                                amount: [, Validators.required ],
                                location: [ , Validators.required ],
                                spendOn: [, Validators.required ],
                               // createdOn: [ this.expenseEntry.createdOn, Validators.required ],
     
                              });
  }

  ngOnInit(): void {
  // call the form method below
    this.myForm();
  
    }
      

    getExpenseItems() { 
      this.restService.getExpenseEntries() .subscribe( data => this.expenseEntry = data ); };

    
      AddItem(formdata:any){
        
    
          //alert("This is the submitted data "+ JSON.stringify(formdata))
          this.restService.addExpenseEntry(formdata)
            .subscribe(  );
          this.getExpenseItems()
          this.router.navigate(['/home']);
 
    
    }
    goBack(){
      this.getExpenseItems();
      this.router.navigate(['/home']);
     }

}
