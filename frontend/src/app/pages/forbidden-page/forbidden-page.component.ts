import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.scss']
})
// https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
/* In summary, a 401 Unauthorized response should be used for missing or bad authentication,
and a 403 Forbidden response should be used afterwards, when the user is authenticated
but isn’t authorized to perform the requested operation on the given resource. */
export class ForbiddenPageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  backToHomePage(): void {
    this.router.navigate(['courses']);
  }

}
