import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CourseActions } from './action-types';
import { concatMap, map } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';
import { allCoursesLoaded } from './course.actions';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap(action => this.coursesHttpService.findAllCourses()),
      map(courses => allCoursesLoaded({ courses }))
    )
  );

  saveCourses$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap(action =>
          this.coursesHttpService.saveCourse(
            action.update.id,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesService
  ) {}
}
