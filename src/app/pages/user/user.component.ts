import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UserType } from 'src/app/models/user-type.enum';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  form: FormGroup;
  userType: string[] = [];
  isCreate = true;

  private user: User;
  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private userService: UserService,
    private toastService: ToastrService,
  ) {
    this.userType = Object.keys(UserType);
    if (this.router.getCurrentNavigation().extras.state) {
      this.isCreate = false;
      this.user = this.router.getCurrentNavigation().extras.state;
    }
  }

  ngOnInit(): void {
    if (!this.form) {
      this.createForm(this.user);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  get controls() { return this.form.controls; }

  submit(): void {
    this.form.markAllAsTouched();
  }

  delete(): void {
    if(confirm("Are you sure to delete this user?")) {
      this.userService.deleteUser(this.user).pipe(
        takeUntil(this.destroy$),
      ).subscribe({
        next: () => {
          this.toastService.success('User deleted', 'Success');
          this.router.navigate(['user-list']);
        },
        error: (e) => console.log(e),
      });
    }
    
  }

  create(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const newUser: User = {
        userName: this.controls.userName.value,
        firstName: this.controls.firstName.value,
        lastName: this.controls.lastName.value,
        email: this.controls.email.value,
        userType: this.controls.userType.value,
        password: this.controls.password.value,
      };
      this.userService.createUser(newUser).pipe(
        takeUntil(this.destroy$),
      ).subscribe({
        next: () => {
          this.toastService.success('User created', 'Success');
          this.router.navigate(['user-list'])
        },
        error: (e) => {
          this.form.controls.userName.setErrors({unique: true});
          this.toastService.error('User already exists', 'Error');
        }
      });
    }
  }

  update(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const newUser: User = {
        userName: this.controls.userName.value,
        firstName: this.controls.firstName.value,
        lastName: this.controls.lastName.value,
        email: this.controls.email.value,
        userType: this.controls.userType.value,
        password: this.controls.password.value,
      };
      this.userService.updateUser(newUser).pipe(
        takeUntil(this.destroy$),
      ).subscribe({
        next: () => {
          this.toastService.success('User updated', 'Success');
        },
        error: (e) => console.log(e),
      });
      
    }
  }

  back(): void {
    this.location.back();
  }

  private createForm(user?: User): void {
    this.form = this.fb.group({
      userName: [{value: user?.userName || '', disabled: user?.userName ? true : false}, [Validators.required]],
      firstName: [user?.firstName || '', [Validators.required]],
      lastName: [user?.lastName || '', [Validators.required]],
      email: [user?.email || '', [Validators.required, Validators.email]],
      password: [user?.password || '', [Validators.required, Validators.pattern('(?=.*[a-zA-Z])(?=.*?[0-9]).{8,}')]],
      confirmPassword: [user?.password || '', [Validators.required, Validators.pattern('(?=.*[a-zA-Z])(?=.*?[0-9]).{8,}')]],
      userType: [user?.userType || null, [Validators.required]],
    });
  }
}
