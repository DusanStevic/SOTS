import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-test-details-teacher',
  templateUrl: './test-details-teacher.component.html',
  styleUrls: ['./test-details-teacher.component.scss']
})
export class TestDetailsTeacherComponent implements OnInit {

  private test;
  routeSub: Subscription;
  questionNumber = 0;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private testService: TestService,
              private authService: AuthService ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe( params => {
      this.getTest(params.id as number);
    });
  }

  private getTest(id: number): void {
    this.testService.getTestByCreator(id).subscribe(data => {
      this.test = data;
    }, error => {
      this.toastr.error(error);
      this.toastr.error('There was an error while getting the data about teacher test details.');
      this.router.navigate(['not-found-page']);
    });
  }

  isAdminLoggedIn(): boolean {
    return this.authService.isAdminLoggedIn();
  }

  isTeacherLoggedIn(): boolean {
    return this.authService.isTeacherLoggedIn();
  }

  isStudentLoggedIn(): boolean {
    return this.authService.isStudentLoggedIn();
  }

  onClickNext(): void {
    this.questionNumber++;
  }

  onClickPrevious(): void {
    this.questionNumber--;
  }

}
