import { Component, EventEmitter, Input } from '@angular/core';
import { Course } from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { filter, tap } from 'rxjs/operators';

@Component({
	selector: 'courses-card-list',
	templateUrl: './courses-card-list.component.html',
	styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent {
	constructor(private dialog: MatDialog) { }

	@Input() courses: Course[] = [];
	private coursesChanged: EventEmitter<any> = new EventEmitter();


	editCourse(course: Course) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = "400px";
		dialogConfig.data = course;
		const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
		dialogRef.afterClosed().pipe(filter(value => value != value),
			tap(() => this.coursesChanged.emit(null))
		).subscribe()
	}
}
