import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Update } from '@ngrx/entity';
import { courseUpdated } from '../course.actions';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  course: Course;

  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.description = course.description;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      longDescription: [course.longDescription, Validators.required],
      promo: [course.promo, []]
    });
  }

  ngOnInit() {}

  save() {
    const changes = this.form.value;
    const course: Course = {
      ...this.course,
      ...this.form.value
    };
    /*  this.coursesService
      .saveCourse(this.courseId, changes)
      .subscribe(() => this.dialogRef.close());*/

    const update: Update<Course> = {
      id: course.id,
      changes: course
    };

    this.store.dispatch(courseUpdated({ update }));

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
