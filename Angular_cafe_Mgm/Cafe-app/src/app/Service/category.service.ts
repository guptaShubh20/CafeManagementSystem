import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  cData:Category = new Category()
  readonly ApiUrl='https://localhost:44331/api/Categories';

  cList:Category[];

  constructor(private objHttp : HttpClient) { }

  getCategoryList(){
    this.objHttp.get(this.ApiUrl).toPromise().then(res=>{this.cList=res as Category[];console.log(this.cList);});
    }
  
    createCategory(c:any,f : any)
    {
      return this.objHttp.post(this.ApiUrl,{ImageUrl : c , ...f.value});
    }
    updateCategory(img : any)
    {
      return this.objHttp.put(this.ApiUrl+"/"+this.cData.CategoryId,{...this.cData,ImageUrl : img});
    }
    deleteCategory(id)
    {
      return this.objHttp.delete(this.ApiUrl + '/'+id);
    }
  
    //for fk purpose
    getcategoryList1():Observable<Category[]>{
      
        return this.objHttp.get<Category[]>(this.ApiUrl);
      
    }

}
