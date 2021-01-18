import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  private courseId: number;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.courseId = params.id);
    console.log(this.courseId);
  }

}
