import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-cva-dropdown',
  templateUrl: './cva-dropdown.component.html',
  styleUrls: ['./cva-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CvaDropdownComponent),
      multi: true,
    },
  ],
})
export class CvaDropdownComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input('itemList') itemList: string[] = [];

  private onDestroySubject: Subject<void> = new Subject();

  public componentDestroyed$: Observable<void> = this.onDestroySubject.asObservable();
  public selectControl: FormControl = this._fb.control('', []);
  public showDrop: boolean = false;

  constructor(private _fb: FormBuilder) { }

  public ngOnInit(): void {
    this.selectControl.valueChanges.pipe(takeUntil(this.componentDestroyed$)).subscribe((value: string) => {
      this.onChange(value);
    });
  }

  public writeValue(VOutside: any): void {
    this.selectControl.patchValue(VOutside);
  }

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public registerOnChange(fn): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  public itemClicked(event: any): void {
    this.selectControl.patchValue(event.target.innerText);
    this.showDrop = false;
  }

  public toggleDropDown(): void {
    this.showDrop = !this.showDrop;
  }

  public ngOnDestroy(): void {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }

}
