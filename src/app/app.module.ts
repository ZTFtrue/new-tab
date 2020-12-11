import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { BookmarkFolderComponent } from './bookmark-folder/bookmark-folder.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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
    entryComponents: [
        DialogComponent,
        SettingsDialogComponent,
        BookmarkFolderComponent
    ],
    exports: [
        // MatDialogModule,
        // MatDialogRef,
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
