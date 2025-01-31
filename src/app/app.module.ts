import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HeaderComponent } from './core/layout/header/header.component';
import { ThemeSwitchComponent } from './shared/components/theme-switch/theme-switch.component';
import { AdminModule } from './features/admin/admin.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LanguageSwitchComponent } from './shared/components/language-switch/language-switch.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './core/layout/footer/footer.component';
import { AuthService } from './features/admin/auth/auth.service';
import { CoursesService } from './features/courses/services/courses.service';
import { ScrollIndicatorComponent } from './shared/components/scroll-indicator/scroll-indicator.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}
export function initializeCourses(coursesService: CoursesService) {
  return (): Promise<void> => {
    return coursesService
      .initializeCoursesCache()
      .toPromise()
      .then(() => {});
  };
}

@NgModule({
  declarations: [AppComponent, LanguageSwitchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    ThemeSwitchComponent,
    AdminModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FooterComponent,
    ScrollIndicatorComponent,
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideHttpClient(),
    provideAnimationsAsync(),
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeCourses,
      deps: [CoursesService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
