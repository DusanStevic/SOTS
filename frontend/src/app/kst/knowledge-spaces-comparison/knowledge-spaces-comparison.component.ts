import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/core/services/course.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, NgModel, FormControl, FormArray } from '@angular/forms';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/core/services/test.service';
import { KstService } from 'src/app/core/services/kst.service';

@Component({
  selector: 'app-knowledge-spaces-comparison',
  templateUrl: './knowledge-spaces-comparison.component.html',
  styleUrls: ['./knowledge-spaces-comparison.component.scss']
})
export class KnowledgeSpacesComparisonComponent implements OnInit {
  private chosenKnowledgeSpace: any;
  routeSub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.routeSub = this.route.params.subscribe( params => {
        this.chosenKnowledgeSpace = params.id as number;
    });
  }
}
