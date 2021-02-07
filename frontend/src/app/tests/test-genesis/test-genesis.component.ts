import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, NgModel, FormControl } from '@angular/forms';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-test-genesis',
  templateUrl: './test-genesis.component.html',
  styleUrls: ['./test-genesis.component.scss']
})
export class TestGenesisComponent implements OnInit {
  addNewTestForm: FormGroup;
  private course;
  routeSub: Subscription;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private testService: TestService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe( params => {
      this.getCourse(params.id as number);
    });
    this.createForm();
  }

  private getCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe(data => {
      this.course = data;
    }, error => {
      this.toastr.error(error);
      this.toastr.error('There was an error while getting the data about course details during test genesis.');
      this.router.navigate(['not-found-page']);
    });
  }

  private createForm(): void {
    this.addNewTestForm = this.fb.group({
      title : ['', Validators.required],
    });
  }

  onAddNewTestSubmit(): void {
    const test: Test = {
      title: this.addNewTestForm.controls.title.value,
      courseId: this.course.id
    };

    this.testService.createTest(test).subscribe(data => {
      this.toastr.success('New test has been successfully added.');
      this.router.navigate(['tests-teacher', this.course.id]);
    }, error => {
      this.toastr.error(error.message);
      this.toastr.error('There was an error while test genesis.');
      this.router.navigate(['not-found-page']);
    });
  }

}
