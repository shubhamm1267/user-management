import { Component,ViewChild,OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Meta, Title } from '@angular/platform-browser';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'youtubeThumbnail';
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private titleService: Title,  
    private metaTagService: Meta) {
   
     }
  ngOnInit() {
    this.titleService.setTitle("Y7Mate . Youtube mp3 Grabber");
    this.metaTagService.updateTag({ 
      name: 'keywords',
      content: 'youtube thumbnail grabber,youtube video grabber,youtube mp3 grabber,youtube thumbnail save,convert youtube to mp3,get youtube video thumbnail,y7mate,y7mate downloader,download youtube video,download youtube thumbnail,download youtube mp3,youtube downloader,youtube mp3 downloader,youtube songs downlaoder,youtube video downloader,youtube thumbnail downloader,youtube mp3 download'
  });
    this.metaTagService.updateTag({ 
      name: 'description',
      content: 'y7mate - this platform allows you download youtube thumbnail,youtube mp3 and youtube video'
  });
}

}


