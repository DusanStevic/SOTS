import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-imsqti-dialog',
  templateUrl: './imsqti-dialog.component.html',
  styleUrls: ['./imsqti-dialog.component.scss']
})
export class ImsqtiDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ImsqtiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

}
