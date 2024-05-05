import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs';
import { IExpenseEntry } from '../interface/iexpense-entry';


@Component({
  selector: 'app-expense-entry-list',
  templateUrl: './expense-entry-list.component.html',
  styleUrls: ['./expense-entry-list.component.css']
})
export class ExpenseEntryListComponent implements OnInit {
title!: string;
expenseEntries!: IExpenseEntry[];

public colorRed! : string ;
public colorBlue! : string ;
public colorElement!: string;

      
ngOnInit() {
 this.title = "Expense Entry List";
 this.expenseEntries = this.getExpenseEntries();
 this.colorBlue ="blue";
 this.colorRed ="red";
}
  getExpenseEntries() : IExpenseEntry[] {
   
   
    let mockExpenseEntries : IExpenseEntry[] = [
                      { 
                        id: 1,
                      item: "Pizza",
                    amount: Math.floor((Math.random() * 1000) + 1),
                    category: "Food",
                    location: "Mcdonald",
                    spendOn: new Date(2020, 4, Math.floor((Math.random() * 
                    30) + 1), 10, 10, 10),
                      createdOn: new Date(2020, 4, Math.floor((Math.random() 
                    * 30) + 1), 10, 10, 10)
                    },
                        { 
                          id: 1,
                        item: "Pizza",
                      amount: Math.floor((Math.random() * 1000) + 1),
                      category: "Food",
                      location: "KFC",
                      spendOn: new Date(2020, 4, Math.floor((Math.random() * 
                      30) + 1), 10, 10, 10),
                        createdOn: new Date(2020, 4, Math.floor((Math.random() 
                      * 30) + 1), 10, 10, 10) },
                        { id: 1,
                      
                        item: "Pizza",
                        amount: Math.floor((Math.random() * 1000) + 1),
                      category: "Food",
                      location: "Mcdonald",
                      spendOn: new Date(2020, 4, Math.floor((Math.random() * 
                      30) + 1), 10, 10, 10),
                        createdOn: new Date(2020, 4, Math.floor((Math.random() 
                      * 30) + 1), 10, 10, 10) 
                      },
                        { 
                          id: 1,
                        item: "Pizza",
                        amount: Math.floor((Math.random() * 1000) + 1),
                      category: "Food",
                      location: "KFC",
                      spendOn: new Date(2020, 4, Math.floor((Math.random() * 
                      30) + 1), 10, 10, 10),
                        createdOn: new Date(2020, 4, Math.floor((Math.random() 
                      * 30) + 1), 10, 10, 10)
                      },
                        { 
                          id: 1,
                        item: "Pizza",
                      amount: Math.floor((Math.random() * 1000) + 1),
                      category: "Food",
                      location: "KFC",
                      spendOn: new Date(2020, 4, Math.floor((Math.random() * 
                      30) + 1), 10, 10, 10),
                        createdOn: new Date(2020, 4, Math.floor((Math.random() 
                      * 30) + 1), 10, 10, 10) 
                      },
    ];
    return mockExpenseEntries;
   }

  constructor() { }

 
}
