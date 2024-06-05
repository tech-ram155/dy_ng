import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = 'https://your-api-url.com/api/blogs';

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getBlogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createBlog(blog: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, blog);
  }

  updateBlog(id: string, blog: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, blog);
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
