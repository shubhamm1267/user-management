import { Component,OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private titleService: Title,  
    private metaTagService: Meta ) {
     }
  ngOnInit() {
    this.titleService.setTitle("About . youtube downloader");
    this.metaTagService.updateTag({ 
      name: 'keywords',
      content: 'thumbnail downloader,video downloader,mp3 downloader'
  });
    this.metaTagService.updateTag({ 
      name: 'description',
      content: 'Effortlessly download your favorite YouTube videos,mp3 and thumbnails with ease using our simple downloader. Enjoy offline viewing anytime, anywhere.'
  });
}

}
