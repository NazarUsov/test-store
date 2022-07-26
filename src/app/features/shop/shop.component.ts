import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    search: new FormControl(null, Validators.compose([]))
  });

  constructor() { }

  ngOnInit(): void {
  }

  clear(): void {
    this.formGroup.reset();
  }

  beforeSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
      return;
    }

    this.submit();
  }

  submit(): void {

  }
}
