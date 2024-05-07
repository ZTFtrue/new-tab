import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BookmarkFolderComponent } from './bookmark-folder/bookmark-folder.component';
import { DialogComponent } from './dialog/dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        DialogComponent,
        BookmarkFolderComponent,
        SettingsDialogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatListModule,
        MatBottomSheetModule,
        MatIconModule,
        MatDividerModule,
        MatCheckboxModule,
        MatRadioModule,
        MatRippleModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule
        // MatDialogRef,
    ],
    exports: [
        // MatDialogModule,
        // MatDialogRef,
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
