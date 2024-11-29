import { Injectable } from '@angular/core';
import { Categories } from '../Models/categories.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
 

export class CategoriesService {

  cData: Categories = new Categories();
  readonly ApiUrl='https://localhost:44331/api/Categories';

  cList:Categories[];


  constructor(private objHttp:HttpClient) { }

  getCategoriesList()
  {
    this.objHttp.get(this.ApiUrl).toPromise()
    .then(res=>this.cList=res as Categories[]);
  }
  createCategory(c:any,f : any)
  {
    return this.objHttp.post(this.ApiUrl,{ImageUrl : c , ...f.value});
  }
  updateCategory()
  {
    return this.objHttp.put(this.ApiUrl+"/"+this.cData.CategoryId,this.cData);
  }
  deleteCategory(id)
  {
    return this.objHttp.delete(this.ApiUrl + '/'+id);
  }

  //for fk purpose
  getcategoryList1():Observable<Categories[]>{
    
      return this.objHttp.get<Categories[]>(this.ApiUrl);
    
  }
}
