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

    title = 'NewTab';
    inputContent = null;
    popem = '洛霞与孤鹜齐飞，秋水共长天一色';
    placeholder = '';
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
    placeholderSearchInputBookMark = 'Search bookmarks';
    searchSiteList = [];
    eventBool = false;
    time = null;
    speedDialSettings = { 'theme': null, 'background': null, 'search': 1 };
    configBookMark;
    labelPosition = 'after';
    disabled = false;
    wallpapersIndex = 1;
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
        this.speedDialSettings.search = value;
        this.searchEngineIndex = value;
        const bookmark = { title: JSON.stringify(this.speedDialSettings) };
        hostObject.bookmarks.update(this.configBookMark.id, bookmark, (_value: any) => { });
    }
    ngOnInit() {
        // document.body.setAttribute('data-theme', 'newtab-light-theme');
        this.getBookMarks();
        this.communication.messageObserve.subscribe((res: boolean) => {
            if (res) {
                this.getBookMarks();
            }
        });
        this.getConfig();
    }
    // 非强类型
    onKey(event: any) {
        if (event.keyCode === 13) {
            this.onSearch();
            return;
        }
    }

    onKeySearchBook(event: any) {
        if (!this.searchInputBookMark) {
            this.siteList = this.searchSiteList;
        } else {
            this.eventBool = true;
            this.siteList = [];
            hostObject.bookmarks.search(this.searchInputBookMark, (result: any) => (this.detector.run(() => (this.siteList = result))));
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

    getConfig() {
        // 使用书签存储设置
        hostObject.bookmarks.search('https://github.com/ZTFtrue/New-Tab', (result: any) => {
            if (result.length > 0) {
                this.configBookMark = result[0];
                this.speedDialSettings = JSON.parse(this.configBookMark.title);
                const si = this.speedDialSettings.search;
                const wallpapersIndex = this.speedDialSettings.background;
                this.detector.run(() => {
                    if (wallpapersIndex) {
                        this.wallpapersIndex = parseInt(JSON.parse(wallpapersIndex), 10);
                        this.imageElement.nativeElement.setAttribute('src', './assets/' + this.wallpapersIndex + '.jpg');
                    } else {
                        this.imageElement.nativeElement.setAttribute('src', './assets/1.jpg');
                    }
                    if (si) {
                        this.searchEngineIndex = si;
                    }
                    if (this.speedDialSettings.theme) {
                        this.document.body.classList.replace(this.document.body.classList[0], this.speedDialSettings.theme);
                        document.body.setAttribute('data-theme', this.speedDialSettings.theme);
                    }
                });

            } else {
                this.imageElement.nativeElement.setAttribute('src', './assets/1.jpg');
            }
        });
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
        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.getBookMarks();
        //     }
        // });
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
                this.speedDialSettings.theme = selectedTheme;
                document.body.setAttribute('data-theme', selectedTheme);
                const bookmark = { title: JSON.stringify(this.speedDialSettings) };
                hostObject.bookmarks.update(this.configBookMark.id, bookmark, (value: any) => { });
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
        this.wallpapersIndex = this.wallpapersIndex + 1;
        if (this.wallpapersIndex >= 4) {// Because of only have 3 pictures.
            this.wallpapersIndex = 1;
        }
        // this.detector.run(() => (imageElement.setAttribute('src', './assets/' + this.wallpapersIndex + '.jpg')));
        this.imageElement.nativeElement.setAttribute('src', './assets/' + this.wallpapersIndex + '.jpg');
        if (this.configBookMark) {
            this.speedDialSettings.background = this.wallpapersIndex;
            const bookmark = { title: JSON.stringify(this.speedDialSettings) };
            hostObject.bookmarks.update(this.configBookMark.id, bookmark, (_value: any) => { });
        }
    }
}
