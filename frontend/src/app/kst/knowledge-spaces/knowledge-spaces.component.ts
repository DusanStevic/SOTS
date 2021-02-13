import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { KstService } from 'src/app/core/services/kst.service';

@Component({
  selector: 'app-knowledge-spaces',
  templateUrl: './knowledge-spaces.component.html',
  styleUrls: ['./knowledge-spaces.component.scss']
})
export class KnowledgeSpacesComponent implements OnInit {
  routeSub: Subscription;

  displayedColumns: string[] = ['id', 'domain', 'knowledgeSpace', 'details'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private kstService: KstService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
    ) {}
  ngOnInit() {
    this.routeSub = this.route.params.subscribe( params => {
      this.getKnowledgeSpaces(params.id as number);
    });
  }
  getKnowledgeSpaces(id: number): void {
    this.kstService.getAllKnowledgeSpacesForCourse(id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.toastr.error(error);
      this.toastr.error('There was an error while getting the data about knowledge spaces for course.');
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

  onClickDetails(knowledgeSpacesId: number): void {
    this.router.navigate(['knowledge-space-details', knowledgeSpacesId]);
  }

}
