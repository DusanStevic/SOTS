import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Array<any> = [];
  constructor(private toastr: ToastrService,
              private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
  }

  private getCourses(): void {
    this.courseService.getAllCoursesByUser().subscribe(data => {
      this.courses = data;
      console.log(this.courses);
    }, error => {
      this.toastr.error('There was an error while getting the data for courses');
    });
  }

}
