import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { CourseService } from '../services/course.service';


@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	beginnerCourses$: Observable<Course[]>;
	advancedCourses$: Observable<Course[]>;

	constructor(private courseSrv: CourseService) {
	}

	ngOnInit() {
		this.reloadCourses();
	}

	reloadCourses() {
		const courses$ = this.courseSrv.loadCourses().pipe(map(course => course.sort(sortCoursesBySeqNo)));
		this.beginnerCourses$ = courses$.pipe(map(course => course.filter(course => course.category === 'BEGINNER')));
		this.advancedCourses$ = courses$.pipe(map(course => course.filter(course => course.category === 'ADVANCED')));
	}

	
}
