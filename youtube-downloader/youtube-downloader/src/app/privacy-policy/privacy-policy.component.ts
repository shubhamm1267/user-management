import { Component,OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit{

  constructor(private titleService: Title,  
    private metaTagService: Meta ) {
     }
  ngOnInit() {
    this.titleService.setTitle("Y7Mate . Privacy Policy");
    this.metaTagService.updateTag({ 
      name: 'keywords',
      content: 'youtube thumbnail grabber,youtube video grabber,youtube mp3 grabber'
  });
    this.metaTagService.updateTag({ 
      name: 'description',
      content: 'Y7mate.com gives feature to download YouTube videos thumbnail in various format allows you to download thumbnail from YouTube without any delays.you can download video and Thumbnail free of cost.'
  });
}

}
