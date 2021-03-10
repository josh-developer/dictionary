import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {map} from "rxjs/operators";

export interface Dict{
  id?: string;
  rus: string;
  uz: string;
  desc: string;
}
@Injectable({
  providedIn: 'root'
})

export class RusCrudService {

  editedDict = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  addDict(value: Dict){
   return this.http.post("https://rus-uz-default-rtdb.firebaseio.com/dicts.json", value);
  }

  getDicts(){
    return this.http.get("https://rus-uz-default-rtdb.firebaseio.com/dicts.json") 
    .pipe(map(dicts => {
      let editedDicts = [];
      for(let key in dicts){
        editedDicts.push({id: key,...dicts[key]})
      };
     return editedDicts; 
    }));
   }

   
   deleteDict(id: string){
     return this.http.delete("https://rus-uz-default-rtdb.firebaseio.com/dicts/"+id+".json");
   }

   editDict(id: string, value: Dict){
    return this.http.put("https://rus-uz-default-rtdb.firebaseio.com/dicts/"+id+".json", value);
  }
}
