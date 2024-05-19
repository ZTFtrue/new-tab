import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-bookmark-folder',
    templateUrl: './bookmark-folder.component.html',
    styleUrls: ['./bookmark-folder.component.css']
})
export class BookmarkFolderComponent {
    isChange = false;
    constructor(
        private bottomSheetRef: MatBottomSheetRef<BookmarkFolderComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        public dialog: MatDialog
    ) { }
    onClickSiteBlock(event, site) {
      
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '70%',
            restoreFocus: false,
            autoFocus: false,
            data: {
                bookmarkId: site.id,
                bookmarkTitle: site.title,
                bookmarkUrl: site.url,
                tip: ''
            }
        });
        this.bottomSheetRef.dismiss()
        dialogRef.afterClosed().subscribe(result => {
            this.isChange = result;
        });
        event.preventDefault();
    }
}
