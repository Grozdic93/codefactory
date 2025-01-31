import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  users$!: Observable<User[]>;
  newAdminEmail: string = '';
  newAdminPassword: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
    this.reloadAdminStatus();
  }

  reloadAdminStatus() {
    this.authService.checkAdminStatus().subscribe();
  }

  loadUsers() {
    this.users$ = this.authService.getAllUsers();
  }

  promoteToAdmin(user: User) {
    this.authService.setUserAsAdmin(user.email).subscribe(
      () => {
        console.log('User promoted to admin successfully!');
        this.loadUsers(); // Reload users to reflect changes
      },
      (error) => {
        console.error('Error promoting user to admin:', error);
      }
    );
  }

  deleteUser(user: User) {
    this.authService.deleteUser(user.uid).subscribe(
      () => {
        console.log('User deleted successfully!');
        this.loadUsers(); // Reload users to reflect changes
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  createUser() {
    this.authService
      .registerWithEmailAndPassword(this.newAdminEmail, this.newAdminPassword)
      .pipe(
        tap(() => console.log('User created successfully!')),
        catchError((error) => {
          console.error('Error creating new user:', error);
          return [];
        }),
        finalize(() => {
          this.authService.checkAdminStatus().subscribe(() => {
            this.loadUsers(); // Reload users to reflect changes
            this.newAdminEmail = '';
            this.newAdminPassword = '';
          });
        })
      )
      .subscribe();
  }
}
