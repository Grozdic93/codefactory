import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  setDoc,
  deleteDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { ICourseModel } from '../models/course.model';
import { from, Observable, of } from 'rxjs';
import { map, catchError, first, tap } from 'rxjs/operators';
import { AuthService } from '../../admin/auth/auth.service';
import {
  fromFirestoreCourse,
  toFirestoreCourse,
} from '../utils/course-transform.utils';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private authService!: AuthService;
  private readonly CACHE_KEY = 'courses';

  constructor(
    private firestore: Firestore,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    setTimeout(() => {
      this.authService = this.injector.get(AuthService);
    });
  }

  private setCache(data: any): void {
    sessionStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
  }

  private getCache(): ICourseModel[] | null {
    const cachedData = sessionStorage.getItem(this.CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  private invalidateCache(): void {
    sessionStorage.removeItem(this.CACHE_KEY);
  }

  private filterAndSortDates(
    dates: { startDate: string; endDate: string }[]
  ): { startDate: string; endDate: string }[] {
    const today = new Date();
    // const sortedDates = dates
    //   .filter((date) => new Date(date.startDate).getTime() >= today.getTime()) // Filter future courses
    //   .sort(
    //     (a, b) =>
    //       new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    //   ); // Sort by start date

    // const longCoursesDates = dates
    //   .filter((date) => new Date(date.startDate).getTime() >= today.getTime()) // Filter future courses
    //   .sort(
    //     (a, b) =>
    //       new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    //   ) // Sort by start date
    //   .filter((course) => {
    //     const startDate = new Date(course.startDate);
    //     const endDate = new Date(course.endDate);
    //     const durationInDays =
    //       (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24); // Calculate duration in days
    //     return durationInDays > 60; // Filter for courses longer than 2 months
    //   })
    //   .map((course) => ({
    //     startDate: course.startDate,
    //     endDate: course.endDate,
    //   })); // Return only start and end dates

    // console.log(longCoursesDates);

    return dates
      .filter((date) => new Date(date.startDate).getTime() >= today.getTime())
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
  }

  initializeCoursesCache(): Observable<ICourseModel[]> {
    const cachedData = this.getCache();
    if (cachedData) {
      cachedData.forEach((course) => {
        course.dates = this.filterAndSortDates(course.dates);
      });
      return of(cachedData);
    }

    const coursesRef = collection(this.firestore, 'courses');
    const q = query(coursesRef);

    return from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const course = { ...doc.data(), id: doc.id } as ICourseModel;
          course.dates = this.filterAndSortDates(course.dates);
          return course;
        })
      ),
      tap((courses) => this.setCache(courses)),
      catchError((error) => {
        console.error('Error fetching courses:', error);
        return of([]);
      })
    );
  }

  private async isUserAdmin(): Promise<boolean> {
    const user = await this.authService
      .getCurrentUser()
      .pipe(first())
      .toPromise();
    return !!user && user.role === 'admin';
  }

  async addCourse(course: ICourseModel): Promise<void> {
    if (!(await this.isUserAdmin())) {
      throw new Error('Unauthorized! Please login as an admin to add courses.');
    }

    const coursesRef = collection(this.firestore, 'courses');
    const newCourseRef = doc(coursesRef);
    const firestoreCourse = toFirestoreCourse(course);
    await setDoc(newCourseRef, firestoreCourse);
    this.invalidateCache();
  }

  async deleteCourse(courseId: string): Promise<void> {
    if (!(await this.isUserAdmin())) {
      throw new Error(
        'Unauthorized! Please login as an admin to delete courses.'
      );
    }

    const courseDoc = doc(this.firestore, 'courses', courseId);
    await deleteDoc(courseDoc);
    this.invalidateCache();
  }

  async updateCourse(
    courseId: string,
    courseData: Partial<ICourseModel>
  ): Promise<void> {
    if (!(await this.isUserAdmin())) {
      throw new Error(
        'Unauthorized! Please login as an admin to update courses.'
      );
    }

    const courseRef = doc(this.firestore, 'courses', courseId);
    const firestoreCourseData = toFirestoreCourse(courseData as ICourseModel);
    await updateDoc(courseRef, firestoreCourseData);
    this.invalidateCache();
  }

  getCourses(): Observable<ICourseModel[]> {
    const cachedData = this.getCache();
    if (cachedData) {
      cachedData.forEach((course) => {
        course.dates = this.filterAndSortDates(course.dates);
      });
      return of(cachedData);
    }

    const coursesRef = collection(this.firestore, 'courses');
    const q = query(coursesRef);

    return from(getDocs(q)).pipe(
      map((snapshot) => {
        const courses = snapshot.docs.map((doc) => {
          const course = {
            ...fromFirestoreCourse(doc.data() as any),
            id: doc.id,
          };
          course.dates = this.filterAndSortDates(course.dates);
          return course;
        });
        this.setCache(courses);
        return courses;
      }),
      catchError((error) => {
        console.error('Error fetching courses:', error);
        return of([]);
      })
    );
  }

  getLatestCourses(): Observable<ICourseModel[]> {
    const cachedData = this.getCache();
    if (cachedData) {
      const latestCourses = this.getUpcomingCourses(cachedData).slice(0, 4);
      latestCourses.splice(2, 1);

      return of(latestCourses);
    }

    const coursesRef = collection(this.firestore, 'courses');
    const q = query(coursesRef);

    return from(getDocs(q)).pipe(
      map((snapshot) => {
        const courses = snapshot.docs.map((doc) => {
          const course = {
            ...fromFirestoreCourse(doc.data() as any),
            id: doc.id,
          };
          course.dates = this.filterAndSortDates(course.dates);
          return course;
        });

        const latestCourses = this.getUpcomingCourses(courses).slice(0, 3);
        this.setCache(courses);
        return latestCourses;
      }),
      catchError((error) => {
        console.error('Error fetching latest courses:', error);
        return of([]);
      })
    );
  }

  private getUpcomingCourses(courses: ICourseModel[]): ICourseModel[] {
    const today = new Date();

    return courses
      .map((course) => ({
        ...course,
        dates: course.dates.filter(
          (d) => new Date(d.startDate).getTime() >= today.getTime()
        ),
      }))
      .filter((course) => course.dates.length > 0)
      .sort((a, b) => {
        const nextStartDateA = new Date(a.dates[0].startDate).getTime();
        const nextStartDateB = new Date(b.dates[0].startDate).getTime();
        return nextStartDateA - nextStartDateB;
      })
      .sort((a, b) => +a.thumbnail - +b.thumbnail);
  }

  getCourseNamesAndIds(): Observable<
    {
      id: string;
      name: string;
      nameDe: string;
      attendanceTimes: string;
      attendanceTimesDe: string;
      thumbnail: string;
      dates: { startDate: string; endDate: string }[];
      price: string;
      img: string;
    }[]
  > {
    const cachedData = this.getCache();
    if (cachedData) {
      return of(
        cachedData.map((course: ICourseModel) => ({
          id: course.id,
          name: course.name,
          nameDe: course.nameDe,
          attendanceTimes: course.attendanceTimes,
          attendanceTimesDe: course.attendanceTimesDe,
          dates: this.filterAndSortDates(course.dates),
          price: `${course.price}`,
          img: course.img,
          thumbnail: course.thumbnail,
        }))
      );
    }

    const coursesRef = collection(this.firestore, 'courses');
    const q = query(coursesRef);

    return from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            name: data.name,
            nameDe: data.nameDe,
            attendanceTimes: data.attendanceTimes,
            attendanceTimesDe: data.attendanceTimesDe,
            dates: this.filterAndSortDates(data.date),
            price: data.price,
            img: data.img,
            thumbnail: data.thumbnail,
          };
        })
      ),
      catchError((error) => {
        console.error('Error fetching course names and IDs:', error);
        return of([]);
      })
    );
  }

  getCourseById(
    courseId: string
  ): Observable<ICourseModel | { error: string }> {
    const cachedData = this.getCache();
    if (cachedData) {
      const course = cachedData.find(
        (course: ICourseModel) => course.id === courseId
      );
      if (course) {
        course.dates = this.filterAndSortDates(course.dates);
        return of(course);
      }
    }

    const courseDocRef = doc(this.firestore, 'courses', courseId);
    return from(getDoc(courseDocRef)).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          const course = {
            ...fromFirestoreCourse(docSnapshot.data() as any),
            id: docSnapshot.id,
          };
          course.dates = this.filterAndSortDates(course.dates);
          return course;
        } else {
          throw new Error('Course not found');
        }
      }),
      catchError((error) => {
        console.error('Error fetching course by ID:', error);
        return of({ error: 'Course not found' });
      })
    );
  }

  getCoursesByCategory(category: string): Observable<ICourseModel[]> {
    const cachedData = this.getCache();
    if (cachedData) {
      const courses = cachedData.filter(
        (course: ICourseModel) => course.category === category
      );
      courses.forEach((course) => {
        course.dates = this.filterAndSortDates(course.dates);
      });
      if (courses.length > 0) {
        return of(courses);
      }
    }

    const coursesRef = collection(this.firestore, 'courses');
    const q = query(coursesRef, where('category', '==', category));

    return from(getDocs(q)).pipe(
      map((snapshot) => {
        const courses = snapshot.docs.map((doc) => {
          const course = {
            ...fromFirestoreCourse(doc.data() as any),
            id: doc.id,
          };
          course.dates = this.filterAndSortDates(course.dates);
          return course;
        });
        this.setCache(courses);
        return courses;
      }),
      catchError((error) => {
        console.error('Error fetching courses by category:', error);
        return of([]);
      })
    );
  }

  // getCourseDetails(): Observable<{
  //   id: string,
  //   name: string,
  //   nameDe: string,
  //   attendanceTimes: string,
  //   attendanceTimesDe: string,
  //   date: { startDate: string, endDate: string }[],
  //   price: string
  // }[]> {
  //   const cachedData = this.getCache();
  //   if (cachedData) {
  //     return of(cachedData.map(course => ({
  //       id: course.id,
  //       name: course.name,
  //       nameDe: course.nameDe,
  //       attendanceTimes: course.attendanceTimes,
  //       attendanceTimesDe: course.attendanceTimesDe,
  //       date: this.filterAndSortDates(course.dates),
  //       price: course.price.toString()
  //     })));
  //   }
  //
  //   const coursesRef = collection(this.firestore, 'courses');
  //   const q = query(coursesRef);
  //
  //   return from(getDocs(q)).pipe(
  //     map(snapshot => snapshot.docs.map(doc => {
  //       const course = { ...doc.data(), id: doc.id } as ICourseModel;
  //       course.dates = this.filterAndSortDates(course.dates);
  //       return {
  //         id: course.id,
  //         name: course.name,
  //         nameDe: course.nameDe,
  //         attendanceTimes: course.attendanceTimes,
  //         attendanceTimesDe: course.attendanceTimesDe,
  //         date: course.dates,
  //         price: course.price.toString()
  //       };
  //     })),
  //     tap(courses => this.setCache(courses)),
  //     catchError(error => {
  //       console.error('Error fetching course details:', error);
  //       return of([]);
  //     })
  //   );
  // }

  getCourseDetailsForNavbar(): Observable<
    {
      id: string;
      name: string;
      nameDe: string;
      img: string;
      thumbnail: number;
    }[]
  > {
    return this.getCourseNamesAndIds().pipe(
      map((courses) =>
        courses.map((course) => ({
          id: course.id,
          name: course.name,
          nameDe: course.nameDe,
          img: course.img,
          thumbnail: Number(course.thumbnail),
        }))
      )
    );
  }

  getCourseNamesForDialog(): Observable<
    {
      id: string;
      attendanceTimesDe: string;
      attendanceTimes: string;
      name: string;
      nameDe: string;
      price: string;
      img: string;
      dates: { startDate: string; endDate: string }[];
    }[]
  > {
    return this.getCourseNamesAndIds().pipe(
      map((courses) =>
        courses.map((course) => ({
          id: course.id,
          name: course.name,
          nameDe: course.nameDe,
          price: course.price,
          dates: this.filterAndSortDates(course.dates),
          img: course.img,
          attendanceTimesDe: course.attendanceTimesDe,
          attendanceTimes: course.attendanceTimes,
        }))
      )
    );
  }
}
