import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Activity } from 'src/entity/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
 
  apiLink = environment.apiLink;
  constructor(
    private httpClient: HttpClient
    ) { }

    getByID(idActivity: string = ''): Observable<Activity> {
      return this.httpClient
          .get<Activity>(`${this.apiLink}/api/actividad/getByID/${encodeURIComponent(idActivity)}`);
    }

    getAll(): Observable<Activity[]> {
      return this.httpClient
          .get<Activity[]>(`${this.apiLink}/api/actividad/getAll`);
    }

    createActivity(activity: any): Observable<any> {
      return this.httpClient.post<Activity>(`${this.apiLink}/api/actividad/create`, activity);
    }

    updateActivity(idActivity: string, activity: Activity): Observable<Activity> {
      return this.httpClient.put<Activity>(`${this.apiLink}/api/actividad/${encodeURIComponent(idActivity)}`, activity);
    }

    deleteActivity(idActivity: string = ''): Observable<Activity> {
      return this.httpClient.delete<Activity>(`${this.apiLink}/api/actividad/${encodeURIComponent(idActivity)}`);
  }
}
