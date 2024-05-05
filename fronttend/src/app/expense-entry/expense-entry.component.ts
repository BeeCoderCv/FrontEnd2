import { Component, OnInit } from '@angular/core';
import { IExpenseEntry } from '../interface/iexpense-entry';


@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css']
})

export class ExpenseEntryComponent implements OnInit {
  //add title field to component 
  title: any;
  myBlueClass = "colorBlue";
  myCSSClass = "colorRed";
  applyCSSClass = true;
  myColor ="red";
  myStyle= {
    "font-size":"13px",
     "color": "yellow"
  }
  
  userName:string ="Abiola";
  
    showData($event: any){ 
    console.log("button is clicked!");
    if($event) {
    console.log($event.target); 
    console.log($event.target.value);
    }
    } 

  //expenseEntry:IExpenseEntry = <IExpenseEntry>{};
  //expenseEntry:IExpenseEntry = <IExpenseEntry>{};
  expenseEntry!: IExpenseEntry;
  constructor( ) { }

  ngOnInit(): void {
    this.title = "Expense Entry";
     
    this.expenseEntry = {
      id: 1,
     item: "Pizza",
     amount: 21,
      category: "Food",
      location: "Zomato",
     spendOn: new Date(2020, 6, 1, 10, 10, 10),
     createdOn: new Date(2022, 6, 1, 10, 10, 10),
      };
     
  }
 
}
