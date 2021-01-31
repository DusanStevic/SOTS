import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  private course;
  routeSub: Subscription;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private authService: AuthService ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe( params => {
      this.getCourse(params.id as number);
    });
  }

  private getCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe(data => {
      this.course = data;
    }, error => {
      this.toastr.error(error);
      this.toastr.error('There was an error while getting the data about course details.');
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

  onClickGetAllTestsInCourseByCreator(id: number): void {
    this.router.navigate(['tests-teacher', id]);
  }

  onClickGetAllCompletedTestsInCourseByExecutor(id: number): void {
    this.router.navigate(['tests-completed-student', id]);
  }

  onClickGetAllUncompletedTestsInCourseByExecutor(id: number): void {
    this.router.navigate(['tests-uncompleted-student', id]);
  }



}
