import { Injectable } from '@angular/core';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { pipe } from 'rxjs';
import { IExpenseEntry } from './interface/iexpense-entry';
import { AppConfigService } from './app.config.service';



@Injectable({
  providedIn: 'root'
})
export class ExpenseEntryService {
  // resource URL 




  //constructor to initialize an object of HttpClient Class
  constructor(private httpClient: HttpClient, private appconfigService: AppConfigService) {

  }

  //fetch data from the json API
  private base = this.appconfigService.API_BASE
  private streamUrl = this.appconfigService.API_BASE + "/api/stream/"
  private expenseRestUrl = this.appconfigService.API_BASE + "/api/expense"//'http://localhost:8000/api/expense';
  private expenseRestUrl2 = this.appconfigService.API_BASE + "/api/postEvaluationToCloud"//'https://backend-llm-tk7ash3eaa-uc.a.run.app/api/postEvaluationToCloud'//this.appconfigService.API_BASE+"/api/postEvaluationToCloud"//'http://localhost:8000/api/postEvaluationToCloud';
  private expenseRestUrl3 = this.appconfigService.API_BASE + "/api/postRankingToCloud"//'http://localhost:8000/api/postRankingToCloud';
  private expense344 = this.appconfigService.API_BASE + "/success"//'http://localhost:8000/api/expense';


  getStream(dat: string): Observable<any> {
var data= {
  "text":dat
}
    return new Observable(observer => {
     this.httpClient.post(this.streamUrl,data, { responseType: 'text', reportProgress: true, observe: 'events'}).subscribe(event => {
       if (event.type === 3 && event) { // Adjust this check to fit the actual event properties
          observer.next(event);
       }else{
        console.log(event)
       }
      }, error => {
        observer.error(error);
      }, () => {
        observer.complete();
      });
    });
  }

  //postRankingToCloud    

  addPost(data: any): Observable<any> {

    return this.httpClient.post<any>(this.expenseRestUrl2,
      data)
    //.pipe(retry(3),catchError(this.httpErrorHandler) );
  }


  //fetch data from the json API
  addPost2(data: any): Observable<any> {
    console.log(this.expenseRestUrl3)
    return this.httpClient.post<any>(this.expenseRestUrl3,
      data)
    //.pipe(retry(3),catchError(this.httpErrorHandler) );
  }

  getCategory(): Observable<any> {
    var url = this.base + "/api/getQuestionCategory"
    return this.httpClient.get<any>(url)
    //.pipe(catchError(this.httpErrorHandler));
  }
  getQuestionByCategory(val: string): Observable<any> {
    var url = this.base + "/api/getQuestionByCategory/" + val
    return this.httpClient.get<any>(url)
    //.pipe(catchError(this.httpErrorHandler));
  }
  get1(): Observable<any> {
    console.log(this.expense344)
    return this.httpClient.get<any>(this.expense344)
    //.pipe(catchError(this.httpErrorHandler));
  }

  //get Method to fetch data from URL

  getExpenseEntries(): Observable<IExpenseEntry> {
    return this.httpClient.get<IExpenseEntry>(this.expenseRestUrl)
    //.pipe(catchError(this.httpErrorHandler));
  }


  getExpenseEntry(id: number): Observable<IExpenseEntry> {
    return this.httpClient.get<IExpenseEntry>(this.expenseRestUrl + "/" + id)
    //.pipe(retry(3),  catchError(this.httpErrorHandler));
  }

  //POST METHOD
  addExpenseEntry(expenseEntry: IExpenseEntry): Observable<IExpenseEntry> {
    return this.httpClient.post<IExpenseEntry>(this.expenseRestUrl,
      expenseEntry)
    //.pipe(retry(3),catchError(this.httpErrorHandler) );
  }

  // PUT / UPDATE METHOD 
  updateExpenseEntry(id: any, expenseEntry: IExpenseEntry): Observable<IExpenseEntry> {
    return this.httpClient.put<IExpenseEntry>(this.expenseRestUrl + "/" + id, expenseEntry)
    //.pipe(retry(3), catchError(this.httpErrorHandler)
    //);
  }

  // DELETE METHOD
  deleteExpenseEntry(expenseEntry: any):
    Observable<IExpenseEntry> {
    //const id = typeof expenseEntry.id == 'number' ? expenseEntry.id : expenseEntry.id
    const id = expenseEntry;
    const url = `${this.expenseRestUrl}/${id}`;
    return this.httpClient.delete<IExpenseEntry>(url)
    // .pipe(
    // retry(3),
    // catchError(this.httpErrorHandler)
    // );
  }
scrollTobuttom(){
  const scrollableElement:any = document.getElementById('scrollableElement');
  scrollableElement.scrollTop = scrollableElement.scrollHeight;
}
}
