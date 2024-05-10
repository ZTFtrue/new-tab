import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { CommunicationService } from '../communication.service';
let hostObject = environment.hostObject;
@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private communication: CommunicationService,
    ) { }

    dismissDialog(): void {
        this.dialogRef.close(false);
    }
    deleteBookmark(): void {
        this.dialogRef.close(true);
        hostObject.bookmarks.remove(this.data.bookmarkId);
        this.communication.success(true);
    }
    updateBookmark(): void {
        this.dialogRef.close(true);
        let bookmark: any;
        if (this.data.bookmarkUrl) {
            bookmark = {
                title: this.data.bookmarkTitle,
                url: this.data.bookmarkUrl
            };
        } else {
            bookmark = { title: this.data.bookmarkTitle };
        }
        hostObject.bookmarks.update(this.data.bookmarkId, bookmark, value => {
            this.communication.success(true);
        });
    }
}
