import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
        public snackBar: MatSnackBar,
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
                tip: '在文件夹打开的书签，你需要重新打开文件夹才能看到改变'
            }
        });
        this.bottomSheetRef.dismiss()
        dialogRef.afterClosed().subscribe(result => {
            this.isChange = result;
        });
        event.preventDefault();
    }
}
