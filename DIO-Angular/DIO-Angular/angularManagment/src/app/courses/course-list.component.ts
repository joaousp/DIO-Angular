import { Component, OnInit } from "@angular/core";
import { Course } from "./course";
import { CourseService } from "./course.service";

@Component({ 
    templateUrl: './course-list.component.html'
})

export class CourseListComponent implements OnInit{
    
    filteredCourses: Course[]=[];
    
    _courses:Course[]=[];

    
    _filterBy!:string;
    
    constructor( private courseServices: CourseService){}
    ngOnInit():void{
       this.retriveAll();
    }

    retriveAll():void{
        this.courseServices.retriveAll().subscribe({
            next: courses=>{
                this._courses=courses;
                this.filteredCourses=this._courses;
            },
            error: err=> console.log('Error',err)
        }); 
    }

    deleteById(courseId:number):void{
        this.courseServices.deleteById(courseId).subscribe({
            next:()=>{
                console.log('Deleted with success');
                this.retriveAll();
            },
            error: err=> console.log('Erro',err),
        })

    }

    set filter(value: string){
        this._filterBy=value;
    
        this.filteredCourses=this._courses.filter(
            (course:Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase())>-1);
    }


    get filter(){
        return this._filterBy;
    }

}