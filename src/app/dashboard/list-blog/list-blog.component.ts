import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-blog',
  standalone: true,
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css'],
  imports: [CommonModule]
})
export class ListBlogComponent {
  blogs = [
    { id: 1, title: 'Blog 1', content: 'Content 1' },
    { id: 2, title: 'Blog 2', content: 'Content 2' },
  ];

  @Output() onEdit = new EventEmitter<any>();

  editBlog(blog: any) {
    this.onEdit.emit(blog);
  }

  deleteBlog(blog: any) {
    this.blogs = this.blogs.filter(b => b !== blog);
  }
}
