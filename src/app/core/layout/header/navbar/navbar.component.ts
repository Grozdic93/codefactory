import {Component, EventEmitter, Inject, inject, Input, OnInit, Output, HostListener} from '@angular/core';
import {NavLinkComponent} from "./nav-link/nav-link.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {LinkComponent} from "../../../../shared/components/link/link.component";
import {CoursesService} from "../../../../features/courses/services/courses.service";
import {DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {TranslateObjectPipe} from "../../../../shared/pipes/translate-object.pipe";
import {RequestDialogComponent} from "../../../../shared/components/request-dialog/request-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NavLinkComponent,
    RouterLink,
    LinkComponent,
    NgIf,
    NgForOf,
    TranslateObjectPipe,
    RouterOutlet,
    TranslateModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navVisible = false;
  coursesNamesForNavbar: {
    id: string;
    name: string;
    nameDe: string;
    img: string;
  }[] = [];

  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);
  @Output() resetNavbar = new EventEmitter<void>();
  isSmallScreen = window.innerWidth < 480; // 30em is 480px

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.coursesService.getCourseDetailsForNavbar().subscribe({
      next: courses => {
        this.coursesNamesForNavbar = courses.sort((a, b) => a.thumbnail - b.thumbnail);
      },
      error: error => {
        console.error('Error fetching course names and IDs:', error);
        this.coursesNamesForNavbar = [];
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window.innerWidth < 720;

  }

  onNavigateToCoursesSection(event: Event) {
    event.preventDefault();
    this.router.navigate(['/home']).then(() => {
      const section = this.document.getElementById('courseCategories');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    });
  }

  openDialog() {
    const dialogData = { action: 'register' };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogData;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(RequestDialogComponent, dialogConfig);
  }

  navigate(event: Event, route: string) {
    event.preventDefault();
    this.router.navigate([route]).then(() => {
      this.resetNavbar.emit();
    });
  }
}
