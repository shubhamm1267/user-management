import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from './user.interface';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent implements OnInit {
  userForm: FormGroup;
  isEdit: boolean = false;
  userId: string | any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.isEdit = true;
        this.loadUserData();
      }
    });
  }

  loadUserData(): void {
    const user = this.userService.getUserById(this.userId);
    if (user) {
      this.userForm.patchValue(user);
    }
  }

  onSubmit(): void {
    const user: User = this.userForm.value;
    if (this.userForm.valid) {
      if (!this.isValidEmail() && !this.isValidPhone()) {
        return;
      }
      if (this.isEdit) {
        this.userService.updateUser(user);
      } else {
        this.userService.addUser(user);
      }
      this.router.navigate(['/user/list']);
    }
  }

  isValidEmail(): boolean {
    return this.userForm.get('email')?.valid || false;
  }

  isValidPhone(): boolean {
    return this.userForm.get('phone')?.valid || false;
  }
}
