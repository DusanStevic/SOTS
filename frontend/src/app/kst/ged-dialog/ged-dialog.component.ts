import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ged-dialog',
  templateUrl: './ged-dialog.component.html',
  styleUrls: ['./ged-dialog.component.scss']
})
export class GedDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<GedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

}
