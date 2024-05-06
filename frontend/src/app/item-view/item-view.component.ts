import { Component, OnInit } from '@angular/core';
import { ExpenseEntryService } from '../expense-entry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  
  title!: string;
  expenseEntry$? : Observable<any>;
  expenseEntry: any;
  selectedId!: number;


  constructor(private restService : ExpenseEntryService, private router : Router, private route : ActivatedRoute ) { }
  
  ngOnInit() {
        this.title = "Expense Entry";
        this.expenseEntry$ = this.route.paramMap.pipe(
              switchMap(params => {this.selectedId = Number(params.get('id'));
              return this.restService.getExpenseEntry(this.selectedId);
          }
        )
      );
        this.expenseEntry$.subscribe( (data) => this.expenseEntry = data );
  }
  
  goToList() {
  this.router.navigate(['/home']);
  }


  goEdit() {
    this.router.navigate(['/edit:id']);
    }
  
      deleteItem(mydata:any) {
  
            //alert(JSON.stringify(mydata))
                //console.log("This is the submitted data "+ JSON.stringify(formdata))
            this.restService.deleteExpenseEntry(mydata).subscribe(  );

            this.router.navigate(['/home']);

      }

  }
