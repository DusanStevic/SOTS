import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TestService } from 'src/app/core/services/test.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AnswerEntity } from 'src/app/core/models/answer-model/answer.model';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-test-for-take',
  templateUrl: './test-for-take.component.html',
  styleUrls: ['./test-for-take.component.scss']
})
export class TestForTakeComponent implements OnInit {

    private test;
    routeSub: Subscription;
    questionNumber = 0;
    //#region answer: AnswerEntity;
    private answer;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private testService: TestService,
              private authService: AuthService ) { }

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

  onClickSave(): void{
  }


  onChange(event, item) {

    item.checked = !item.checked;


    //console.log(item);
    this.save(item)

}

  save(item){
    //this.answer = new AnswerEntity(item.id, item.answer_text, item.question, item.correct_answer);
    //this.testService.add(this.answer).subscribe( (data: any) => { this.answer = data;
      //console.log(data)
    //} );
    //console.log(this.answer);

    this.testService.getAnswerById(item.id).subscribe(data => {
      console.log(data)
      this.answer = data;
      console.log(this.answer)
      console.log(typeof(this.answer))
      this.testService.add(this.answer).subscribe( (data: any) => { this.answer = data;
        console.log(this.answer)
        console.log("Milica")
        console.log(data)
      } );
    }, error => {
      this.toastr.error(error);
      this.toastr.error('There was an error while getting the data about teacher test details.');
      this.router.navigate(['not-found-page']);
  });
    
  }



}
