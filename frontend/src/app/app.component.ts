import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SOTS';
  public role: string;

  constructor(
    private router: Router) {}

  checkRole() {
    const item = localStorage.getItem('role');

    if (!item) {
      this.role = undefined;
      return;
    }

    
    this.role = item;
    console.log(this.role);
  }
}


