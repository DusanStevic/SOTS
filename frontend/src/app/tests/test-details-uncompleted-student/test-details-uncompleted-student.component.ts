import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { TestService } from 'src/app/core/services/test.service';
import { MatDialog } from '@angular/material';
import { TestCompletionDialogComponent } from '../test-completion-dialog/test-completion-dialog.component';

@Component({
  selector: 'app-test-details-uncompleted-student',
  templateUrl: './test-details-uncompleted-student.component.html',
  styleUrls: ['./test-details-uncompleted-student.component.scss']
})
export class TestDetailsUncompletedStudentComponent implements OnInit {

  private testUncompleted;
  // Converting uncompleted test into the completed test with test completion.
  private testCompleted;
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
    this.testService.getUncompletedTestByExecutor(id).subscribe(data => {
      this.testUncompleted = data;
    }, error => {
      this.toastr.error(error);
      this.toastr.error('There was an error while getting the data about student\'s uncompleted test details.');
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

  onClickOpenTestCompletionDialog(): void {
    console.log(this.testUncompleted)
    this.testService.createCompletedTest(this.testUncompleted).subscribe(data => {
      this.testCompleted = data;
      this.questionNumber = 0;
      this.toastr.success('Test completion.');
      this.router.navigate(['test-details-completed-student', this.testCompleted.id]);
      const dialogRef = this.dialog.open(TestCompletionDialogComponent, {
        width: '500px'
      });
      },
      error => {
        this.toastr.error(error);
        this.toastr.error('There was an error while getting the data about student\'s test completion.');
        this.router.navigate(['not-found-page']);
      }
    );
  }

}
