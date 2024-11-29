import { Component } from '@angular/core';
import { CategoryService } from '../Service/category.service';

@Component({
  selector: 'app-homo',
  templateUrl: './homo.component.html',
  styleUrl: './homo.component.css'
})
export class HomoComponent {
  title = 'CafeMgtApp';

  slides = [
    {
      title: 'Fast Food ',
      description: 'Doloremque, itaque aperiam facilis rerum, commodi',
      link: '#'
    },
    {
      title: 'Fast Food ',
      description: 'Doloremque, itaque aperiam facilis rerum, commodi',
      link: '#'
    },
    {
      title: 'Fast Food ',
      description: 'Doloremque, itaque aperiam facilis rerum, commodi',
      link: '#'
    }
  ];


  reviews= [
    {
      
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      name: 'John Doe',
      star_nbr: 5
    },
    {
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      name: 'Jane Smith',
      star_nbr: 4
    }
  ];

  constructor( public csrv:CategoryService)
  {  
  }

   ngOnInit(): void {

    this.csrv.getCategoryList();

  }


}
