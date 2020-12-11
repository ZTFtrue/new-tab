import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookmarkFolderComponent } from './bookmark-folder.component';

describe('BookmarkFolderComponent', () => {
  let component: BookmarkFolderComponent;
  let fixture: ComponentFixture<BookmarkFolderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
