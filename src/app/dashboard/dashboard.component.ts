import { Component, ViewChild, ViewContainerRef, AfterViewInit, Injector } from '@angular/core';
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
export class DashboardComponent implements AfterViewInit {
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private injector: Injector) {}

  ngAfterViewInit() {
    this.loadListBlogComponent();
  }

  async loadCreateBlogComponent(blogData?: any) {
    this.container.clear();
    const { CreateBlogComponent } = await import('./create-blog/create-blog.component');
    const componentRef = this.container.createComponent(CreateBlogComponent, { injector: this.injector });
    if (blogData) {
      componentRef.instance.blogData = blogData;
    }
    componentRef.instance.formSubmit.subscribe(() => {
      this.loadListBlogComponent();
    });
  }

  async loadListBlogComponent() {
    this.container.clear();
    const { ListBlogComponent } = await import('./list-blog/list-blog.component');
    const componentRef = this.container.createComponent(ListBlogComponent, { injector: this.injector });
    componentRef.instance.onEdit.subscribe((blogData: any) => {
      this.loadCreateBlogComponent(blogData);
    });
  }
}
