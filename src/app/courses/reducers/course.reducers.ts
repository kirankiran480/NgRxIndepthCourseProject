import { allCoursesLoaded } from './../course.actions';
import { select } from '@ngrx/store';
import { Course, compareCourses } from '../model/course';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CourseActions } from '../action-types';
import { createReducer, on } from '@ngrx/store';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.addAll(action.courses, { ...state, allCoursesLoaded: true })
  ),
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
