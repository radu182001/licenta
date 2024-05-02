import { Component, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  
  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>) {}

  confirmDelete(): void {
    this.dialogRef.close({deleted: true});
  }

  cancel(): void {
    this.dialogRef.close({deleted: false});
  }

}
