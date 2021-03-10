import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dict, RusCrudService } from '../services/rus-crud.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy{

  editId: string;
  isEditMode = false;
  editedDict: Dict;
  form: FormGroup;
  editSub: Subscription;
  
  constructor(
      private rusCrudService: RusCrudService, 
      private router: Router,
      private route: ActivatedRoute) { 
    this.editSub = this.rusCrudService.editedDict.subscribe(data => {
      
      if(data) this.editedDict = data[0];
     
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // this.editId = params['id'] ? params['id'] : null;
      this.isEditMode = !!params['id'];
      this.editId = params['id'] ? params['id'] : null;
   
  })


    if(this.isEditMode && this.editedDict){
      this.form = new FormGroup({
        rus: new FormControl(this.editedDict.rus, [Validators.required, Validators.minLength(2)]),
        uz: new FormControl(this.editedDict.uz, [Validators.required, Validators.minLength(2)]),
        desc: new FormControl(this.editedDict.desc)
      })
    }else{
      this.form = new FormGroup({
        rus: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        uz: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        desc: new FormControl(null)
      })
    }
    
  }

  submit() {
    if (!this.form.valid) {
      return;
    } else {
      if(this.isEditMode && this.editedDict){
        this.rusCrudService.editDict(this.editedDict.id, this.form.value).subscribe(()=>{
          this.router.navigate(["/jadval"])
     
        });
        
      }else{
        this.rusCrudService.addDict(this.form.value).subscribe(res => {
          this.router.navigate(["/jadval"])
        });  
      }
      
      this.form.reset();

    }
  }

  ngOnDestroy(){
    this.editSub.unsubscribe()
  }
}

