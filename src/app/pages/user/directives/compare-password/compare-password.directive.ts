import { Directive, Input  } from '@angular/core';  
import { Validator,  NG_VALIDATORS, FormControl } from '@angular/forms';  
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appComparePassword]',
  providers: [  
    {  
      provide: NG_VALIDATORS,  
      useExisting: ComparePasswordDirective,  
      multi: true  
    }  
  ]  
})
export class ComparePasswordDirective implements Validator {

  @Input() appComparePassword: string;

  validate(control: FormControl) {
    if (!control || !control.value)  {
      return null;
    } 

    const password = control.root.get(this.appComparePassword);

    if (password) {
      const subscription: Subscription = password.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    
    return password.value !== control.value ? { confirmPasswordError: true } : null;
  }

}
