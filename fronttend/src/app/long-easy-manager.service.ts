import { Injectable } from '@angular/core';
//import { ExpenseEntry } from './expense-entry';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
// import { Storage } from '@google-cloud/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from
  '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LongEasyManagerService {

  constructor(private httpClient: HttpClient) { }
  private APiStatus = 'http://35.232.246.77:8000/';
  private SearchQueryendpoint = 'http://35.232.246.77:8000/send_text';
  // private storage = new Storage({
  //   keyFilename: './dataStorage/gpc.json', // Path to your service account key file
  // });
  private destination = './destination/file.json';
  private folderName = 'langEasy';  // Optional: Folder within the bucketconst 
  private ranking = 'ranking.json'; // Filename with .json extension
  private evaluation = 'evaluation.json'; // Filename with .json extension
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private bucketName = 'storage_awarri_llm';
  async updateFileWithJson(jsonData: any, type: any):Promise<string> {
    // Combine folder and filename to create the file pathconst 
    const filePath1 = this.folderName ? `${this.folderName}/${this.ranking}` : this.ranking;
    const filePath2 = this.folderName ? `${this.folderName}/${this.evaluation}` : this.evaluation;
    const bucket = ""//this.storage.bucket(this.bucketName); 
    const filePath = type =="rating"?filePath1 :filePath2 
    const file = ""//bucket.file(filePath); 
    try {     
    //  await file.save(JSON.stringify(jsonData)); // Convert JSON data to string and save directly to the file
      console.log('File updated successfully');
      return "success"
    }
    catch (error) {
      console.error('Error updating file:', error);
      return "error"
    }
  }
  // Example usage:const jsonData = { key: 'value' }; 
  // Replace this with your JSON dataconst bucketName = 'your-bucket-name';const filePath = 'path/to/your/file.json'; 
  // Path to the existing file you want to updateupdateFileWithJson(jsonData, bucketName, filePath);

  fetchData(): Observable<any> {
    return this.httpClient.get<any>(`${this.APiStatus}`, this.httpOptions);
  }


  fetchQueryResponseData(query: string): Observable<any> {

    return this.httpClient.post<any>(`${this.SearchQueryendpoint}` + query, this.httpOptions);
  }


  getResponse(val: string) {
    var obj = {
      "text": val
    }
    return this.httpClient.post(this.SearchQueryendpoint, obj)
      .pipe(map((res: any) => res),
        catchError((error: any) => throwError(error.error || 'Server error')));
  }
  // getResponse(){
  //   this.httpClient.get(this.APiStatus, this.httpOptions)   
  //       .subscribe( (data) => console.log(data) );
  //       }

  // getResponse() : Observable<string> {
  //   return this.httpClient.get<string>(this.APiStatus, 
  //  this.httpOptions)
  //   .pipe(
  //   retry(3),
  //   catchError(this.httpErrorHandler)
  //   );
  //   }

  //   private httpErrorHandler(error: HttpErrorResponse) {
  //     if (error.error instanceof ErrorEvent) {
  //         // Client-side error occurred
  //         console.error('A client-side error occurred:', error.error.message);
  //     } else {
  //         // Server-side error occurred
  //         console.error(`An error occurred on the server: 
  //             HTTP status code: ${error.status}, 
  //             Message: ${error.error.message || error.statusText}`);
  //     }
  //     // Return a user-friendly error message
  //     return throwError('An error occurred. Please try again later.');
  // }
  async uploadFile(dat: any) {
    const data = dat;
    const blob = new Blob([JSON.stringify(data)], { type: 'text/plain' });
    const tmpFile = new File([blob], 'data.json');

    const bucketName = 'storage_awarri_llm';
    const filePath = './dataStorage/data.json';
    const destination = './destination/file.json';
    const folderName = 'langEasy';  // Optional: Folder within the bucketconst 
    const ranking = 'ranking.json'; // Filename with .json extension
    const evaluation = 'evaluation.json'; // Filename with .json extension
    // Combine folder and filename to create the file pathconst 
    const filePath1 = folderName ? `${folderName}/${ranking}` : ranking;
    const filePath2 = folderName ? `${folderName}/${evaluation}` : evaluation;

    // await this.storage.bucket(bucketName).upload(filePath, {
    //   destination: destination,
    // });

    console.log('File uploaded successfully');
  }

}
