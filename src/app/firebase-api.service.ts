import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Book } from './book';
import { retry,catchError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {
apiURL='';
  constructor(private http: HttpClient) {}
  
  httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/jason'
    })
  }

  

getBooks():Observable<Book>{
  return this.http.get<Book>(this.apiURL +'/getBooks').pipe(retry(1),catchError(this.handleError))
}

handleError(error: { error: { message: string; }; status: any; message: any; }){
  let errorMessage='';
  if(error.error instanceof ErrorEvent){
    errorMessage = error.error.message;
  }
  else{
    errorMessage=`Error Code: ${error.status}\nMessage:${error.message}`;
  }
window.alert(errorMessage);
return throwError(errorMessage);

}
addBook(title:string,author:string):Observable<Book>{
  return this.http.post<Book>(this.apiURL+'/addBook?title=' +author,null).pipe(retry(1),catchError(this.handleError))
}

delBook(id:string):Observable<Book>{
  return this.http.delete<Book>(this.apiURL+'/deleteBook?id=' +id).pipe(retry(1),catchError(this.handleError))
}

}
