import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { TestService } from 'src/app/core/services/test.service';
import { TestScoreDialogComponent } from '../test-score-dialog/test-score-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-test-details-completed-student',
  templateUrl: './test-details-completed-student.component.html',
  styleUrls: ['./test-details-completed-student.component.scss']
})
export class TestDetailsCompletedStudentComponent implements OnInit {

  private testCompleted;
  private testScore;
  routeSub: Subscription;
  questionNumber = 0;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private testService: TestService,
              private authService: AuthService,
              public dialog: MatDialog ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe( params => {
      this.getTest(params.id as number);
    });
  }

  private getTest(id: number): void {
    this.testService.getCompletedTestByExecutor(id).subscribe(data => {
      this.testCompleted = data;
    }, error => {
      this.toastr.error(error);
      this.toastr.error('There was an error while getting the data about student\'s completed test details.');
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

  onClickOpenTestScoreDialog(id: number): void {
    this.testService.getCompletedTestByExecutor(id).subscribe(data => {
      this.testScore = data;
      const dialogRef = this.dialog.open(TestScoreDialogComponent, {
        width: '500px',
        data: this.testScore
      });
      },
      error => {
        this.toastr.error(error);
        this.toastr.error('There was an error while getting the data about student\'s test score.');
        this.router.navigate(['not-found-page']);
      }
    );
  }

}
