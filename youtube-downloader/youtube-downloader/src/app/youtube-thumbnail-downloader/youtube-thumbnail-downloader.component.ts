import { Component,ViewChild } from '@angular/core';
import { YouTubeThumbnailDownloaderService } from '../you-tube-thumbnail-downloader.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSidenav } from '@angular/material/sidenav';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-youtube-thumbnail-downloader',
  templateUrl: './youtube-thumbnail-downloader.component.html',
  styleUrls: ['./youtube-thumbnail-downloader.component.css']
})
export class YoutubeThumbnailDownloaderComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  thumbnailUrls: { [quality: string]: string } = {};
  selectedQuality = 'maxresdefault';
  videoUrl: any;
  videoUrlThumbnail: any;
  videoDetails: any = {};
  videoQualities: any[] = [];
  thumbnailDetails: any = {};
  downloadTasks: any[] = [];
  isDownloading = false;
  selectedSection: string = 'video';





  constructor(private youtubeThumbnailDownloaderService: YouTubeThumbnailDownloaderService,
    private spinner: NgxSpinnerService) {
     }

     getVideoDetailsForVideo() {
      this.spinner.show();
      this.spinner.hide();
      const videoUrl: string = this.videoUrl;
      if (!videoUrl || videoUrl.trim() === '') {
        this.showWarnToast(`Please add Url First`);
        return;
      }
    
      const videoId = this.extractVideoId(videoUrl);
      if (videoId) {
        this.spinner.show();
        this.youtubeThumbnailDownloaderService.getAvailableVideoFormats(videoId).pipe(
          concatMap((formats: any[]) => {
            this.videoQualities = formats
              .map((format) => {
                const sizeInBytes = format.sizeInBytes || 0; // Replace 'sizeInBytes' with the actual property name
      
                const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to megabytes
                let sizeLabel = sizeInMB > 1024 ? `${(sizeInMB / 1024).toFixed(2)} GB` : `${sizeInMB.toFixed(2)} MB`;
                if(format.sizeInBytes ==null){
                  sizeLabel = '';
                }
                if(format.quality == null){
                  format.quality = '';
                }
                const label = `${format.quality} - ${format.container} ${sizeLabel}`;
      
                return {
                  code: format.itag.toString(),
                  label: label,
                };
              });
            return this.youtubeThumbnailDownloaderService.getVideoDetails(videoId);
          })
        ).subscribe(
          (response: any) => {
            this.spinner.hide();
            if (response) {
              this.videoDetails = response.items && response.items.length > 0 ? response.items[0].snippet : {};
              this.videoDetails.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              const videoDuration = response.items && response.items.length > 0 ? response.items[0].contentDetails?.duration : '';
              const formattedDuration = this.convertDuration(videoDuration);
              this.videoDetails.videoDuration = formattedDuration;
            }
          },
          (error) => {
            this.spinner.hide();
            console.error('Error fetching video details:', error);
            this.displayError('Error fetching video details');
          }
        );
      }
    }
    
  
    downloadMP3() {
      const videoId = this.extractVideoId(this.videoUrl);
      if (videoId) {
        this.spinner.show();
        const downloadUrl = `${this.youtubeThumbnailDownloaderService.getMP3DownloadUrl(videoId)}`;
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `audio.mp3`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => {
          this.spinner.hide();
          this.showSuccessToast(`Wait Download Started Soon`);
        }, 5000);
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
    const videoId = this.extractVideoId(this.videoUrl);
    if (videoId) {
          this.spinner.show();
          const downloadUrl = `${this.youtubeThumbnailDownloaderService.getDownloadUrl(videoId, quality)}`;
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `video.mp4`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => {
          this.spinner.hide();
          this.showSuccessToast(`Wait Download Started Soon`);
          },5000);
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
}
