import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-test-completion-dialog',
  templateUrl: './test-completion-dialog.component.html',
  styleUrls: ['./test-completion-dialog.component.scss']
})
export class TestCompletionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TestCompletionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

}
