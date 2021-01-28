import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TestService } from 'src/app/core/services/test.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tests-completed-student',
  templateUrl: './tests-completed-student.component.html',
  styleUrls: ['./tests-completed-student.component.scss']
})
export class TestsCompletedStudentComponent implements OnInit {
  routeSub: Subscription;

  displayedColumns: string[] = ['id', 'course', 'test', 'createdBy', 'details'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private testService: TestService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
    ) {}
  ngOnInit() {
    this.routeSub = this.route.params.subscribe( params => {
      this.getTests(params.id as number);
    });
  }
  getTests(id: number): void {
    this.testService.getAllCompletedTestsInCourseByExecutor(id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.toastr.error(error);
      this.toastr.error('There was an error while getting the data about student\'s completed tests in course.');
      this.router.navigate(['not-found-page']);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickDetails(testId: number): void {
    this.router.navigate(['test-details-completed-student', testId]);
  }

}
