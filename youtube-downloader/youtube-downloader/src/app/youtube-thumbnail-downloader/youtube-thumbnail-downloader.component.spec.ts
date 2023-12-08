import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeThumbnailDownloaderComponent } from './youtube-thumbnail-downloader.component';

describe('YoutubeThumbnailDownloaderComponent', () => {
  let component: YoutubeThumbnailDownloaderComponent;
  let fixture: ComponentFixture<YoutubeThumbnailDownloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YoutubeThumbnailDownloaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeThumbnailDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
