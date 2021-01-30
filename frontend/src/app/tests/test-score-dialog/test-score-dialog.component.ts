import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-test-score-dialog',
  templateUrl: './test-score-dialog.component.html',
  styleUrls: ['./test-score-dialog.component.scss']
})
export class TestScoreDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TestScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}



}
