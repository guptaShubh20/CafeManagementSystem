import { Component } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { AuthService } from '../../Service/auth.service';
import { CategoriesService } from '../../Service/categories.service';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../Service/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  profileImageUrl: string | ArrayBuffer | null = null;

  obj: any = {
   
    // pData: {},
    categoryList :[] 
  };
  // categoryList: Category[] = []; // Array to hold categories
 

  constructor(public objs:ProductService,private auth:AuthService,public cat:CategoryService,private toastr:ToastrService){}

  

  ngOnInit(): void {
    this.resetForm();
    this.fetchCategories();
    this.objs.getProductList();
 }

 resetForm(form?: NgForm) {
  this.objs.pData.ProductId = 0;
}


  fetchCategories() {
    this.cat.getcategoryList1().subscribe((categories) => {
      this.obj.categoryList = categories;
    });
  }

  // resetForm(form?:NgForm){
    
  //   if(form != null){
  //     form.form.reset();
  //   }else{
  //     this.objs.pData={ProductId:0,Name:'',Description:'',Price:'',ImageUrl:'',CategoryId:''}
  //   }
  // }


  fillData(p : any)
  {   this.objs.pData.ProductId = p.ProductId;
      this.objs.pData.Name = p.Name;
      this.objs.pData.Price = p.Price;
      this.objs.pData.Description = p.Description;
      this.objs.pData.CategoryId = p.CategoryId;
  }


  insertRecord(form: NgForm) {
     this.objs.pData = form.value; // Set cData from the form values
     this.objs.createProduct(this.profileImageUrl).subscribe(res => {
      //  this.resetForm(form);
      
       this.toastr.success('Success','New Product Creation Success')
       this.objs.getProductList(); // Refresh the list
     },
     err => {
       this.toastr.error('Error','Error: '+err)
     });
   }




   updateCategories(form:NgForm){
    this.objs.updateProduct(this.profileImageUrl).subscribe(res => {
      this.resetForm(form);
     
      this.toastr.success('Success','Product Updation Success')
      this.objs.getProductList();
    },
    err => {
      this.toastr.error('Error','Error !!! '+err)
    }
  )
  }
  

  onSubmit(form: NgForm,fileInput : any)
  {

    
    if(this.objs.pData.ProductId==0){
      this.insertRecord(form);
    }else{
      this.updateCategories(form);
    }

    form.reset();
    this.objs.pData.ProductId = 0;
    fileInput.value = '';
    this.profileImageUrl = '';

  }





  onDelete(ProductId)
  {
   if(confirm("Are you sure? you wanna delete this Product?"))
   {
     this.objs.deleteProduct(ProductId).subscribe(
       res=>{this.objs.getProductList()
         
         this.toastr.success('Success','Record Deleted!!!')
       },
      err=>{
        this.toastr.error('Error','Error: '+err)
      }
    )
   }
  }

  logout()
  {
    this.auth.signOut();
  }

  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.profileImageUrl = reader.result; // This is the Base64 string
      console.log(  this.profileImageUrl);
    };

    if (file) {
      reader.readAsDataURL(file); // Converts to Base64
    }
  }

}
