import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Dict, RusCrudService } from '../services/rus-crud.service';


@Component({
  selector: 'app-jadval',
  styleUrls: ['jadval.component.scss'],
  templateUrl: 'jadval.component.html',
})
export class JadvalComponent implements  OnInit,AfterViewInit {
  displayedColumns: string[] = [ 'rus', 'uz', 'desc', "actions"];
  dataSource: MatTableDataSource<Dict>;
  dicts: Dict[];
  @ViewChild(MatPaginator, {static: false}) set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, {static: false} ) set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  };
  isLoading = false;
  constructor(private rusCrudService: RusCrudService, private router: Router) {
   
  }
  ngOnInit(){
    this.getDicts(
      ()=>{
       this.dataSource = new MatTableDataSource(this.dicts);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }
  
  getDicts(call?){
    this.isLoading = true;
  
    this.rusCrudService.getDicts().subscribe(res => {
      this.dicts = res;
      call()
      this.isLoading = false;
    })
  }

  deleteDict(id: string){
    this.rusCrudService.deleteDict(id).subscribe(res=>{
      this.getDicts(()=>{
         this.dataSource = new MatTableDataSource(this.dicts);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      });
    });
  }

  onEdit(id){
    let editItem = this.dicts.filter(r => r.id == id);    
    this.rusCrudService.editedDict.next(editItem);
    
    this.router.navigate(["/edit", id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource(this.dicts);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
}



