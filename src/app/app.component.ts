import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.setClass();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setClass();
      }
    });
  }

  setClass() {
    if (this.router.url === '/login') {
      this.renderer.removeClass(document.body, 'no-header-footer');
    } else {
      this.renderer.addClass(document.body, 'no-header-footer');
    }
  }
}
