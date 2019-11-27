import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {

  }

  public getChainedData(): Observable<any> {
    const response1 = this.httpClient.get(environment.stodArUrl);
    const response2 = this.httpClient.get(environment.arendeTyperUrl);
    const response3 = this.httpClient.get(environment.ansokansTyperUrl);
    return forkJoin([response1, response2, response3]);
  }

  public getChainedDataMassHantering(): Observable<any> {
    const response1 = this.httpClient.get(environment.myndigheterUrl);
    const response2 = this.httpClient.get(environment.stodArUrl);
    const response3 = this.httpClient.get(environment.arendeTyperUrl);
    const response4 = this.httpClient.get(environment.ansokansTyperUrl);
    const response5 = this.httpClient.get(environment.statusUrl);
    return forkJoin([response1, response2, response3, response4, response5]);
  }

  public getChainedDataArenden(sokFilter): Observable<any> {
    const response1 = this.httpClient.post<any>(environment.arendenUrl, sokFilter);
    const response2 = this.httpClient.post<any>(environment.antalArendenUrl, sokFilter);
    return forkJoin([response1, response2]);
  }

  public getChainedDataArendeInformation(arendeId): Observable<any> {
    const response1 = this.httpClient.get(environment.arendenUrl, { params: arendeId });
    const response2 = this.httpClient.get(environment.atgarderUrl, { params: arendeId });
    return forkJoin([response1, response2]);
  }

  public getData(url) {
    return this.httpClient.get(url);
  }

  public getDataMedParametrar(url, parameters) {
    return this.httpClient.get(url, { params: parameters });
  }

  public postData(url, sokFilter): Observable<any> {
    return this.httpClient.post<any>(url, sokFilter);
  }

}
