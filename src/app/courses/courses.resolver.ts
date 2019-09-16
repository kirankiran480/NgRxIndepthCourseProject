import { Store, select } from '@ngrx/store';
import { loadAllCourses } from './course.actions';
import { Observable } from 'rxjs';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { AppState } from '../reducers';
import { areCoursesLoaded } from './courses.selectors';

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap(coursesLoaded => {
        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
