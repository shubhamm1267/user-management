import { Component,ViewChild,OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { YouTubeThumbnailDownloaderService } from '../you-tube-thumbnail-downloader.service';
import Swal from 'sweetalert2';
// import { NgxSpinnerService } from 'ngx-spinner';
import { MatSidenav } from '@angular/material/sidenav';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { Title,Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-youtube-thumbnail-downloader',
  templateUrl: './youtube-thumbnail-downloader.component.html',
  styleUrls: ['./youtube-thumbnail-downloader.component.css']
})
export class YoutubeThumbnailDownloaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  thumbnailUrls: { [quality: string]: string } = {};
  videoUrl: any;
  videoDetails: any = {};
  videoQualities: any[] = [];
  selectedSection: string = 'video';
  deferredPrompt: any;
  showInstallButton = false;


  constructor(private youtubeThumbnailDownloaderService: YouTubeThumbnailDownloaderService,
    private ngxService: NgxUiLoaderService, private titleService: Title,@Inject(PLATFORM_ID) private platformId: Object, 
    private metaTagService: Meta ) {
     }
  ngOnInit() {
    this.titleService.setTitle("Y7Mate . Youtube Video,thumbnail Image and mp3 Download");
    this.metaTagService.updateTag({ 
      name: 'keywords',
      content: 'youtube thumbnail grabber,youtube video grabber,youtube mp3 grabber,youtube thumbnail save,convert youtube to mp3,get youtube video thumbnail,y7mate,y7mate downloader,download youtube video,download youtube thumbnail,download youtube mp3,youtube downloader,youtube mp3 downloader,youtube songs downlaoder,youtube video downloader,youtube thumbnail downloader,youtube mp3 download'
  });
    this.metaTagService.updateTag({ 
      name: 'description',
      content: 'Y7Mate - this platform allows you to download youtube video,youtube thumbnail and convert youtube mp3'
  });
  if (isPlatformBrowser(this.platformId)) {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.showInstallButton = true; // Set this to true when the prompt is available
    });
  }
}

     async getVideoDetailsForVideo() {
      const videoUrl: string = this.videoUrl?.trim();
    
      if (!videoUrl) {
        this.showWarnToast('Please add a URL first');
        return;
      }
    
      const videoId = this.extractVideoId(videoUrl);
    
      if (!videoId) {
        return;
      }
    
      try {
        this.ngxService.start();
    
        const formats:any |undefined = await this.youtubeThumbnailDownloaderService.getAvailableVideoFormats(videoId).toPromise();
    
        this.videoQualities = formats.map((format:any) => {
          const sizeInBytes = format.sizeInBytes || 0;
          const sizeInMB = sizeInBytes / (1024 * 1024);
          const sizeLabel = sizeInMB > 1024 ? `${(sizeInMB / 1024).toFixed(2)} GB` : `${sizeInMB.toFixed(2)} MB`;
    
          const label = `${format.quality || ''} - ${format.container || ''} ${format.sizeInBytes ? sizeLabel : ''}`;
    
          return {
            code: format.itag.toString(),
            label: label,
          };
        });
    
        const response = await this.youtubeThumbnailDownloaderService.getVideoDetails(videoId).toPromise();
    
        if (response?.items?.length > 0) {
          const videoDetails = response.items[0].snippet;
          this.videoDetails = {
            ...videoDetails,
            thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            videoDuration: this.convertDuration(response.items[0].contentDetails?.duration || ''),
          };
        }
        const thumbnails = response.items[0].snippet.thumbnails || {};
        this.thumbnailUrls = {
          ['maxres']: thumbnails['maxres']?.url || '',
          ['high']: thumbnails['high']?.url || '',
          ['standard']: thumbnails['standard']?.url || '',
          ['medium']: thumbnails['medium']?.url || '',
          ['default']: thumbnails['default']?.url || '',
        };
  
        if (!this.thumbnailUrls['maxres']) {
          this.videoDetails.thumbnailUrl = this.thumbnailUrls['high'] || this.thumbnailUrls['standard'] || this.thumbnailUrls['medium'] || this.thumbnailUrls['default'] || '';
        }
        this.ngxService.stop();
      } catch (error) {
        this.ngxService.stop();
        console.error('Error fetching video details:', error);
        this.displayError('Error fetching video details');
      }
    }
    
    downloadMP3() {
      this.ngxService.start();
      const videoId = this.extractVideoId(this.videoUrl);
      if (videoId) {
        const downloadUrl = `${this.youtubeThumbnailDownloaderService.getMP3DownloadUrl(videoId)}`;
        this.ngxService.stop();
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `audio.mp3`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => {
        
          this.showSuccessToast(`Wait Download Started Soon`);
        }, 4000);
      } else {
        this.showErrorToast(`Something Wrong`);
      }
    }
  

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') { 
      this.getVideoDetailsForVideo();
    }
  }

  convertDuration(duration: string): string {
    const match:any = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;
  
    let formattedDuration = '';
  
    if (hours > 0) {
      formattedDuration += hours.toString().padStart(2, '0') + 'H ';
    }
  
    if (minutes > 0 || hours > 0) {
      formattedDuration += minutes.toString().padStart(2, '0') + 'M ';
    }
  
    formattedDuration += seconds.toString().padStart(2, '0') + 'S';
    
    return formattedDuration.trim(); // Trim any extra spaces
  }

  downloadVideo(quality: string) {
    this.ngxService.start();
    const videoId = this.extractVideoId(this.videoUrl);
    if (videoId) {
      const downloadUrl = `${this.youtubeThumbnailDownloaderService.getDownloadUrl(videoId, quality)}`;
      this.ngxService.stop();
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `video.mp4`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => {
          this.showSuccessToast(`Wait Download Started Soon`);
          },4000);
    }
    else{
      this.showErrorToast(`Something Wrong`);
    }
  }
  


  showSuccessToast(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  }

  showErrorToast(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  }

  showWarnToast(message: string) {
    Swal.fire({
      icon: 'warning',
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  }




  private displayError(message: string) {
    // Display error message to the user
    this.showErrorToast(message);
  }

  private extractVideoId(videoUrl: string): string {
    let videoId = '';
    videoUrl = videoUrl.trim();
    const pattern = /(?:\?v=|\/embed\/|\.be\/)([\w\d_-]{11})(?:\S+)?/;
    const match:any = videoUrl.match(pattern);
    if (match && match[1]) {
      videoId = match[1];
    }
    return videoId;
  }

  async getThumbnail() {
    const videoUrl: string = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
    const videoId = videoUrl.match(/(?:\?v=|\/embed\/|\.be\/)([\w\d_-]{11})(?:\S+)?/)?.[1];

    if (videoId) {
      try {
        const qualities = ['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'];
        const imageBaseUrl = `https://i3.ytimg.com/vi/${videoId}/`;

        for (const quality of qualities) {
          this.thumbnailUrls[quality] = `${imageBaseUrl}${quality}.jpg`;
        }
      } catch (error) {
      }
    }
  }

  downloadImage(quality: string) {
    const videoUrl: string = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
    const videoId = videoUrl.match(/(?:\?v=|\/embed\/|\.be\/)([\w\d_-]{11})(?:\S+)?/)?.[1];

    if (videoId) {
      this.youtubeThumbnailDownloaderService.downloadImage(videoId, quality)
        .subscribe(
          (blob: Blob) => {
            const imageUrl = URL.createObjectURL(blob);
            this.downloadFile(imageUrl, quality);
          },
          (error) => {
          }
        );

    }
  }

  downloadFile(data: string, quality: string) {
    const randomNumbersArray: number[] = Array.from({ length: 2 }, () => Math.floor(Math.random() * 10));
    const anchor = document.createElement('a');
    anchor.href = data;
    anchor.setAttribute('download', `y7mate.com - thumbnail_${randomNumbersArray}${quality}.jpg`);
    anchor.click();
  }

  onToggleChange(event: any) {
    this.selectedSection = event.value;
  }
  installPwa() {
    if (isPlatformBrowser(this.platformId) && this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice
        .then((choiceResult:any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          this.deferredPrompt = null;
          this.showInstallButton = false;
        });
    }
  }
}
