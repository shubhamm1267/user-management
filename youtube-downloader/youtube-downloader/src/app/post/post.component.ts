import { Component,OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  complexCode:string=
  ` class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    insert(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
    }
  
    delete(data) {
      if (!this.head) return;
      if (this.head.data === data) {
        this.head = this.head.next;
        return;
      }
      let current = this.head;
      let prev = null;
      while (current && current.data !== data) {
        prev = current;
        current = current.next;
      }
      if (current) {
        prev.next = current.next;
      }
    }
  
    display() {
      let current = this.head;
      while (current) {
        console.log(current.data);
        current = current.next;
      }
    }
  }
  
  // Usage
  const linkedList = new LinkedList();
  linkedList.insert(1);
  linkedList.insert(2);
  linkedList.insert(3);
  linkedList.insert(4);
  linkedList.display(); // Output: 1, 2, 3, 4
  
  linkedList.delete(3);
  linkedList.display(); // Output: 1, 2, 4`;


  constructor(private titleService: Title,  
    private metaTagService: Meta ) {
     }
  ngOnInit() {
    this.titleService.setTitle("Posts . Download Youtube thumbnail Image - Video - MP3");
    this.metaTagService.updateTag({ 
      name: 'keywords',
      content: 'youtube thumbnail saver,youtube video saver, youtube mp3 saver'
  });
    this.metaTagService.updateTag({ 
      name: 'description',
      content: 'you can download convert youtube video to mp3 and download thumbnails and videoes.'
  });
}

}
