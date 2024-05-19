import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BookmarkFolderComponent } from './bookmark-folder/bookmark-folder.component';
import { DialogComponent } from './dialog/dialog.component';
import {CdkMenuModule,CdkContextMenuTrigger, CdkMenu, CdkMenuItem} from '@angular/cdk/menu';
@NgModule({
    declarations: [
        AppComponent,
        BookmarkFolderComponent,
        DialogComponent,

     

    ],
    imports: [
        BrowserModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatListModule,
        MatBottomSheetModule,
        MatRippleModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        MatSelectModule,
        BrowserAnimationsModule,
        CdkMenuModule,
        CdkContextMenuTrigger,
        CdkMenu,
        CdkMenuItem,
    ],
    exports: [
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
