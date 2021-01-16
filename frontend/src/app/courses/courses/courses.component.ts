import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  pageSize: string = '5';
  pageNum: number = 1;
  totalNumOfCourses: number = 0;

  constructor(private courseService: CourseService,
              private toastr: ToastrService,
              private router: Router,
              //public dialog: MatDialog
              ) {
  }

  ngOnInit() {
    this.getCourses();
  }

  private getCourses(): void {
    this.courseService.getAllCoursesByUserOnePage(this.pageNum).subscribe(data => {
      this.totalNumOfCourses = data.count;
      console.log(this.totalNumOfCourses)
      this.courses = data.results;
      console.log(this.courses)
    }, error => {
      this.toastr.error('There was an error while getting the data about courses.');
    });
  }

  onClickAddEvent(): void {
    //this.router.navigate([ADD_EVENT_PATH]);
  }

  onClickDetails(eventId: number): void {
    //this.router.navigate([SHOW_EVENT_DETAILED, eventId]);
  }

  onClickEdit(eventId: number): void {
    //this.router.navigate([EDIT_EVENT, eventId]);
  }

  onClickStats(eventId: number): void {
    //this.openDialog(eventId);
  }

  onClickArchive(eventId: number): void {
    // TODO: Implementirati
    console.log('ARCHIVE', eventId);
  }

  onPageSizeSelect(): void {
    this.pageNum = 0;
    this.getCourses();
  }

  onClickNext(): void {
    this.pageNum++;
    this.getCourses();
  }

  onClickPrevious(): void {
    this.pageNum--;
    this.getCourses();
  }

/*   private openDialog(eventId: number) {
    this.dialog.open(EventReportDialog, {
      maxHeight: '500px',
      data: eventId
    });
  } */
}



/* @Component({
  selector: 'event-report-dialog',
  template: `
      <h3 id="title"> Report for event: {{this.data}}</h3>
      <app-event-report [eventId]="this.data" ></app-event-report>
      <button mat-button (click)="onClickExit()">
        <mat-icon>close</mat-icon>
        <span>Cancel</span>
      </button>
    `
})
export class EventReportDialog {

  constructor(private toast: ToastrService,
              public dialogRef: MatDialogRef<EventReportDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onClickExit(): void {
    this.dialogRef.close();
  }

} */
