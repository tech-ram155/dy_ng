import { Component, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ListBlogComponent } from './list-blog/list-blog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  private blogs = [
    { id: 1, title: 'Blog 1', content: 'Content 1' },
    { id: 2, title: 'Blog 2', content: 'Content 2' },
  ];

  constructor(private injector: Injector) {}

  async loadCreateBlogComponent(blogData?: any) {
    this.container.clear();
    const { CreateBlogComponent } = await import('./create-blog/create-blog.component');
    const componentRef = this.container.createComponent(CreateBlogComponent, { injector: this.injector });
    if (blogData) {
      componentRef.instance.blogData = blogData;
    }
    componentRef.instance.formSubmit.subscribe((formData: any) => {
      if (blogData) {
        this.updateBlog(blogData.id, formData);
      } else {
        this.addBlog(formData);
      }
      this.loadListBlogComponent();
    });
  }

  async loadListBlogComponent() {
    this.container.clear();
    const { ListBlogComponent } = await import('./list-blog/list-blog.component');
    const componentRef = this.container.createComponent(ListBlogComponent, { injector: this.injector });
    componentRef.instance.blogs = this.blogs;
    componentRef.instance.onEdit.subscribe((blogData: any) => {
      this.loadCreateBlogComponent(blogData);
    });
  }

  ngOnInit() {
    this.loadListBlogComponent();
  }

  private addBlog(blogData: any) {
    const newId = Math.max(...this.blogs.map(b => b.id)) + 1;
    this.blogs.push({ id: newId, ...blogData });
  }

  private updateBlog(id: number, blogData: any) {
    const index = this.blogs.findIndex(b => b.id === id);
    if (index !== -1) {
      this.blogs[index] = { id, ...blogData };
    }
  }
}
