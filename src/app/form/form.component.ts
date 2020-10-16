import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public form: FormGroup
  public itemList: string[] = ['Africa', 'America', 'Ukraine', 'Russia', 'England', 'Poland', 'Switzerland', 'Sweden']

  public get disabledButton(): boolean {
    return this.form.get('select').value === 'Select item'
  }

  private get _formValue(): any {
    return this.form.value;
  }

  constructor(private _fb: FormBuilder) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public submit(): void {
    console.log(this._formValue);
  }

  private _initForm(): void {
    this.form = this._fb.group({
      select: ['Select item', [Validators.required]],
    });
  }

}
