import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BetService {

  baseURL = "";

  constructor(private http: Http) { }

  getComponents() {

  	var url =   this.baseURL + '/getmetadata';

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getRecords() {
    var url =   this.baseURL + '/getrecords';

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

@Injectable()
export class BetXHRService {

  constructor(private http: Http) { }

  getCookieByName(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
  }

  postRequest(url, params, success, error) {  
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : 
                               new ActiveXObject("Microsoft.XMLHTTP"); 
                           
    xhr.open("POST", url, true); 
    xhr.setRequestHeader("X-CSRFToken", this.getCookieByName('csrftoken'));
  
    xhr.onreadystatechange = function(){ 
      if ( xhr.readyState == 4 ) { 
        if ( xhr.status == 200 ) { 
          success(xhr.responseText); 
        } else { 
          error(xhr, xhr.status); 
        } 
      } 
    };

    xhr.onerror = function () { 
      error(xhr, xhr.status); 
    };

    xhr.send(params); 
  }
}