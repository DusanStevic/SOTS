import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/core/services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-details-completed-student',
  templateUrl: './test-details-completed-student.component.html',
  styleUrls: ['./test-details-completed-student.component.scss']
})
export class TestDetailsCompletedStudentComponent implements OnInit {

  private test;
  routeSub: Subscription;
  questionNumber = 0;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private testService: TestService ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe( params => {
      this.getTest(params.id as number);
    });
  }

  private getTest(id: number): void {
    this.testService.getTestById(id).subscribe(data => {
      this.test = data;
    }, error => {
      this.toastr.error(error);
      this.toastr.error('There was an error while getting the data about teacher test details.');
      this.router.navigate(['not-found-page']);
    });
  }


  onClickNext(): void {
    this.questionNumber++;
  }

  onClickPrevious(): void {
    this.questionNumber--;
  }

  onClickSeeWithSameDomain(testId: number): void {
    console.log("STIGAO")
    this.router.navigate(['test-with-same-domain', testId]);
  }

}
