import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-animation',
  templateUrl: './dialog-animation.component.html',
  styleUrls: ['./dialog-animation.component.css']
})
export class DialogAnimationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
