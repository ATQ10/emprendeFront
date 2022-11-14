import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Comment } from 'src/entity/comment';

@Injectable({
  providedIn: 'root'
})
export class CommetnService {
  apiLink = environment.apiLink;
  constructor(
    private httpClient: HttpClient
    ) { }

    getByID(idComment: string = ''): Observable<Comment> {
      return this.httpClient
          .get<Comment>(`${this.apiLink}/api/comentario/getByID/${encodeURIComponent(idComment)}`);
    }

    getAll(idComment: string = ''): Observable<Comment[]> {
      return this.httpClient
        .get<Comment[]>(`${this.apiLink}/api/comentario/getAll/${encodeURIComponent(idComment)}`);
    }

    createComment(Comment: any): Observable<any> {
      return this.httpClient.post<Comment>(`${this.apiLink}/api/comentario/create`, Comment);
    }

    sendEmail(Comment: any, email: string): Observable<any> {
      return this.httpClient.post<Comment>(`${this.apiLink}/api/comentario/sendEmail/${encodeURIComponent(email)}`, Comment);
    }

    updateComment(idComment: string, Comment: Comment): Observable<Comment> {
      return this.httpClient.put<Comment>(`${this.apiLink}/api/comentario/${encodeURIComponent(idComment)}`, Comment);
    }

    deleteComment(idComment: string = ''): Observable<Comment> {
      return this.httpClient.delete<Comment>(`${this.apiLink}/api/comentario/${encodeURIComponent(idComment)}`);
  }
}
