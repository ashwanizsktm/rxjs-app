import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";

@Injectable({
    providedIn: 'root'
})

export class CourseService{   
    constructor(private http: HttpClient){}

    // loading all the courses
    loadCourses(): Observable<Course[]> {
        return this.http.get<Course[]>('/api/courses').pipe(map(res => res['payload']));
    }
}