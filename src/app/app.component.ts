import { Component, HostListener, NgZone, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { BookmarkFolderComponent } from './bookmark-folder/bookmark-folder.component';
import { CommunicationService } from './communication.service';
import { DialogComponent } from './dialog/dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';
const hostObject = environment.hostObject;
interface SearchEngine {
    url: string;
    icon: string;
    name: string;
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('background_image', { static: true }) imageElement: ElementRef;
    @ViewChild('upload_backimage', { static: true }) inputBackgroundImageElement: ElementRef;
    inputContent = null;
    popem = '洛霞与孤鹜齐飞，秋水共长天一色';
    dialogShow = false;
    siteList = [];
    searchEngineIndex = 0;
    serachEngineList: SearchEngine[] = [
        { url: 'http://www.google.com/search?q=', icon: '../assets/logo-google.svg', name: 'Google' },
        { url: 'https://cn.bing.com/search?q=', icon: '../assets/brand-bing.svg', name: 'Bing' },
        { url: 'https://www.baidu.com/s?ie=utf-8&wd=', icon: '../assets/baidu-tieba.svg', name: 'Baidu' }
    ];
    storeHref = environment.storeHref;
    searchInputBookMark: string = null;
    searchSiteList = [];
    backgroundImage = null;
    wallpapersIndex = 1;
    SettingsNameObject = {
        theme: 'theme',
        background: 'background',
        search: 'search'
    }
    constructor(
        public dialog: MatDialog,
        public detector: NgZone,
        private bottomSheet: MatBottomSheet,
        private communication: CommunicationService,
        @Inject(DOCUMENT) private document: Document,
    ) {
    }
    onSearch() {
        if (this.inputContent !== null) {
            window.location.href =
                this.serachEngineList[this.searchEngineIndex].url +
                encodeURIComponent(this.inputContent);
        } else {
            window.location.href = this.serachEngineList[
                this.searchEngineIndex
            ].url;
        }
    }
    onSelectedItem(value: number) {
        this.searchEngineIndex = value;
        localStorage.setItem(this.SettingsNameObject.search, value.toString());
    }
    ngOnInit() {
        this.setData();
        this.getBookMarks();
        this.communication.messageObserve.subscribe((res: boolean) => {
            if (res) {
                this.getBookMarks();
            }
        });
    }
    // 非强类型
    onKey(event: any) {
        if (event.keyCode === 13) {
            this.onSearch();
            return;
        }
    }

    onKeySearchBook(event: any) {
        if (this.searchInputBookMark) {
            this.siteList = [];
            hostObject.bookmarks.search(this.searchInputBookMark, (result: any) => (this.detector.run(() => (this.siteList = result))));
        } else {
            this.getBookMarks();
        }
    }
    getBookMarks() {
        const bookMarkStack = [];
        /** 这里时从获取到的数据中,宽度遍历获取到要显示的数据. 原来的方法在chrome中存在无法获取到数据的Bug.*/
        /** hostObject.bookmarks.search('desktop',(result: any[]) => { */
        hostObject.bookmarks.getTree((result: any[]) => {
            bookMarkStack.push(...result);
            while (bookMarkStack.length > 0) {
                const item = bookMarkStack.pop();
                if (item.title === 'desktop-newtab') {
                    this.searchSiteList = item.children;
                    this.detector.run(() => (this.siteList = this.searchSiteList));
                    break;
                }
                if (item.children && item.children.length > 0) {
                    bookMarkStack.push(...item.children);
                }
            }
        });
    }

    setData() {
        let background = localStorage.getItem(this.SettingsNameObject.background);
        let index = localStorage.getItem(this.SettingsNameObject.search);
        if (background) {
            this.imageElement.nativeElement.setAttribute('src', background);
        } else {
            this.imageElement.nativeElement.setAttribute('src', './assets/1.jpg');
        }
        if (index) {
            this.searchEngineIndex = parseInt(index, 10);
        }
        // this.detector.run(() => {
        //     if (this.speedDialSettings.theme) {
        let themeName = localStorage.getItem(this.SettingsNameObject.theme);
        if (themeName) {
            this.document.body.classList.replace(this.document.body.classList[0], themeName);
            document.body.setAttribute('data-theme', themeName);
        }
        //     }
        // });
    }

    onClickSiteBlock(event: MouseEvent, site: any) {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '70%',
            restoreFocus: false,
            autoFocus: false,
            data: {
                bookmarkId: site.id,
                bookmarkTitle: site.title,
                bookmarkUrl: site.url
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getBookMarks();
            }
        });
        event.preventDefault();
    }
    openSettings(event: MouseEvent) {
        const dialogRef = this.dialog.open(SettingsDialogComponent, {
            width: '70%',
            restoreFocus: false,
            autoFocus: false,
            data: {
            }
        });
        dialogRef.afterClosed().subscribe((selectedTheme: string) => {
            if (selectedTheme) {
                document.body.setAttribute('data-theme', selectedTheme);
                localStorage.setItem(this.SettingsNameObject.theme, selectedTheme);
            }
        });
    }

    @HostListener('document:keyup', ['$event'])
    onDialogKey(event: KeyboardEvent) { }

    onClickBookmarksFolder(event: any, bookmark: any): void {
        const bottomRef = this.bottomSheet.open(BookmarkFolderComponent, {
            autoFocus: false,
            restoreFocus: false,
            data: bookmark
        });
        bottomRef.afterDismissed().subscribe(result => {
            if (result) {
                this.getBookMarks();
            }
        });
    }

    switchWallPaper() {
        this.inputBackgroundImageElement.nativeElement?.click()
    }

    preview_image(event: any): void {
        const imgPath = this.inputBackgroundImageElement.nativeElement.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            // convert image file to base64 string and save to localStorage
            this.imageElement.nativeElement.setAttribute('src', reader.result);
            localStorage.setItem(this.SettingsNameObject.background, reader.result as string);
        }, false);
        if (imgPath) {
            reader.readAsDataURL(imgPath);
        }
    }
}
