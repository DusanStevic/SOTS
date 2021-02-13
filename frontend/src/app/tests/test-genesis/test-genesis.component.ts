import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/core/services/course.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, NgModel, FormControl, FormArray } from '@angular/forms';
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
      course_id: [],
      sections: new FormArray([
        this.initSection(),
      ]),
    });
  }

  initSection() {
    return new FormGroup({
      sectionTitle: new FormControl('', Validators.required),
      sectionDescription: new FormControl('', Validators.required),
      questions: new FormArray([
        this.initQuestion()
        ])
    });
  }
  initQuestion() {
    return new FormGroup({
      questionTitle: new FormControl('', Validators.required),
      questionType: new FormControl('', Validators.required),
      options: new FormArray([
        this.initOptions()
      ])
    });
  }

  initOptions() {
    return new FormGroup({
      optionTitle: new FormControl(''),
      correct_answer : new FormControl(false, Validators.required),
    });
  }

  addSection() {
    const control = this.addNewTestForm.get('sections') as FormArray;
    control.push(this.initSection());
  }

  addQuestion(j) {
    console.log(j);
    const control = this.addNewTestForm.get('sections')['controls'][j].get('questions') as FormArray;
   // console.log(control);
    control.push(this.initQuestion());

  }

  add(i, j) {
    // console.log(k);
    const control = this.addNewTestForm.get('sections')['controls'][i].get('questions').controls[j].get('options') as FormArray;

  // const control = <FormArray>this.survey.get(['sections',0,'questions',k,'options']); // also try this new syntax
    // console.log(control);
    control.push(this.initOptions());
  }

  getSections(form) {
    // console.log(form.get('sections').controls);
    return form.controls.sections.controls;
  }
  getQuestions(form) {
   // console.log(form.controls.questions.controls);
    return form.controls.questions.controls;
  }
  getOptions(form) {
    // console.log(form.get('options').controls);
    return form.controls.options.controls;

  }

  removeQuestion(j) {
     const control = this.addNewTestForm.get('sections')['controls'][j].get('questions') as FormArray;
     control.removeAt(j);
  }

  removeSection(i){
   const control = this.addNewTestForm.get('sections') as FormArray;
   control.removeAt(i);

  }

  removeOption(i, j, k) {
    console.log(i, j, k);
    const control = this.addNewTestForm.get(['sections', i, 'questions', j, 'options']) as FormArray; // also try this new syntax
    control.removeAt(k);
  }

  remove(i, j) {
    const control =  this.addNewTestForm.get(['sections', i, 'questions', j, 'options']) as FormArray;
    control.removeAt(0);
    control.controls = [];
  }

  onAddNewTestSubmit(): void {
    console.log(this.addNewTestForm.value);
    // Manually Set Value for FormBuilder Control (course_id field, because course is already chosen for which you make test)
    this.addNewTestForm.controls['course_id'].setValue(this.course.id);
    console.log(this.addNewTestForm.value);
    this.testService.createTest(this.addNewTestForm.value).subscribe(data => {
      this.toastr.success('New test has been successfully added.');
      this.router.navigate(['tests-teacher', this.course.id]);
    }, error => {
      this.toastr.error(error.message);
      this.toastr.error('There was an error while test genesis.');
      this.router.navigate(['not-found-page']);
    });
  }

}
