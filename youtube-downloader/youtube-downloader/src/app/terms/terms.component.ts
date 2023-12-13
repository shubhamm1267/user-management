import { Component,OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(private titleService: Title,  
    private metaTagService: Meta ) {
     }
  ngOnInit() {
    this.titleService.setTitle("Y7Mate . Terms And Conditions");
    this.metaTagService.updateTag({ 
      name: 'keywords',
      content: 'youtube thumbnail grabber,youtube video grabber,youtube mp3 grabber'
  });
    this.metaTagService.updateTag({ 
      name: 'description',
      content: 'Youtube Video Downloader allows users to download YouTube videos for personal use only.The service is provided and we do not guarantee uninterrupted, timely, secure, or error-free service.'
  });
}
}
