import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-blog',
  standalone: true,
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css'],
  imports: [CommonModule]
})
export class ListBlogComponent {
  @Input() blogs: any[] = [];
  @Output() onEdit = new EventEmitter<any>();

  editBlog(blog: any) {
    this.onEdit.emit(blog);
  }

  deleteBlog(blog: any) {
    this.blogs = this.blogs.filter(b => b !== blog);
  }
}
