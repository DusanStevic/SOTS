import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  private courseId: number;
  private course: any = {};

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private courseService: CourseService ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.courseId = params.id);
    this.getCourse(this.courseId);
  }

  private getCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe(data => {
      this.course = data;
    }, error => {
      this.toastr.error('There was an error while getting the data about course details.');
      this.router.navigate(['not-found-page']);
    });
  }

}
