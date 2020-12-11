import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DOCUMENT } from '@angular/common';
import { Settins } from '../settins';

@Component({
    selector: 'app-settings-dialog',
    templateUrl: './settings-dialog.component.html',
    styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
    themes = [
        { theme: 'newtab-dark-theme', themeView: 'Dark Theme' },
        { theme: 'newtab-light-theme', themeView: 'Light Theme' },
    ];
    themeTemp;
    selectedTheme: string;
    lastTheme: string;
    constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>, public detector: NgZone,
        @Inject(DOCUMENT) private document: Document, @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.themeTemp = this.document.body.classList[0];
        this.lastTheme = this.themeTemp;
    }
    ngOnInit(): void {
    }
    dismissDialog(): void {
        this.detector.run(() => (this.document.body.classList.replace(this.lastTheme, this.themeTemp)));
        this.dialogRef.close(null);
    }
    confirm(): void {
        // this.dialogRef.close( this.selectedTheme));
        localStorage.setItem('result', JSON.stringify(new Settins(this.selectedTheme)));
        this.dialogRef.close(this.selectedTheme);
    }
    changeTheme(theme: string) {
        this.detector.run(() => (this.document.body.classList.replace(this.lastTheme, theme)));
        this.lastTheme = theme;
    }
    onChangeTheme(theme: MatSelectChange) {
        this.changeTheme(theme.value);
    }
}
