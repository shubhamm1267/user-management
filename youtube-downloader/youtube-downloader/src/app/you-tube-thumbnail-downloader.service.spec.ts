import { TestBed } from '@angular/core/testing';

import { YouTubeThumbnailDownloaderService } from './you-tube-thumbnail-downloader.service';

describe('YouTubeThumbnailDownloaderService', () => {
  let service: YouTubeThumbnailDownloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YouTubeThumbnailDownloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
