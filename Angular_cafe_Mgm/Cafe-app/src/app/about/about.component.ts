import { Component, OnInit } from '@angular/core';

interface AboutInfo {
  title: string;
  description: string;
  image: {
    url: string;
  };
  read_more_link?: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  about: AboutInfo;

  constructor() {
    // Initialize with default values or fetch from a service
    this.about = {
      title: 'About Us',
      description: 'Welcome to [Restaurant Name], where culinary passion meets warm hospitality. Nestled in the heart of [Location], our restaurant offers a unique dining experience that celebrates local flavors and seasonal ingredients. Our menu features a blend of classic and contemporary dishes, thoughtfully crafted by our talented chefs.We take pride in sourcing fresh, sustainable ingredients, and our diverse wine and cocktail list is designed to complement every meal. Join us for a delightful journey of taste and tradition, where every dish tells a story.Come dine with us and discover why [Restaurant Name] is a favorite among locals and visitors alike!',
      image: {
        url: 'assets/about-img.png' // Update with your actual image path
      },
      read_more_link: 'https://example.com/read-more' // Update with actual URL
    };
  }

  ngOnInit(): void {
    // Fetch the about data from a service if needed
  }

}