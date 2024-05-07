import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DOCUMENT } from '@angular/common';
import { Utils } from '../Utils/Utils';

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
        this.dialogRef.close(this.selectedTheme);
    }
    changeTheme(theme: string) {
        this.detector.run(() => (this.document.body.classList.replace(this.lastTheme, theme)));
        this.lastTheme = theme;
    }
    onChangeTheme(theme: MatSelectChange) {
        this.changeTheme(theme.value);
    }
    export() {
        let background = localStorage.getItem(Utils.SettingsNameObject.background);
        let index = localStorage.getItem(Utils.SettingsNameObject.search);
        let themeName = localStorage.getItem(Utils.SettingsNameObject.theme);
        let data = { 'background': background, 'searchIndex': index, 'theme': themeName };
        var element = document.createElement('a');
        const blob = new Blob([JSON.stringify(data)], { type: 'data:text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob) // Create an object URL from blob
        element.setAttribute('href', url) // Set "a" element link
        element.setAttribute('download', 'settings.json') // Set download filename
        element.click() // Start downloading
    }
    import() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = '.json';
        input.addEventListener('change', function () {
            const files = input.files;
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                let data = JSON.parse(reader.result as string);
                localStorage.setItem(Utils.SettingsNameObject.background, data.background);
                localStorage.setItem(Utils.SettingsNameObject.search, data.searchIndex);
                localStorage.setItem(Utils.SettingsNameObject.theme, data.theme);
                window.location.reload();
            }, false);
            if (files && files.length > 0) {
                reader.readAsText(files[0]);
            }
        });
        input.click();
    }
}
