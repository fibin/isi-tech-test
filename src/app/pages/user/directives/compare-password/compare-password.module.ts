import { NgModule } from '@angular/core';  
  
// Directive  
import { ComparePasswordDirective } from './compare-password.directive';  
  
  
@NgModule({  
  declarations: [  
    ComparePasswordDirective,
  ],  
  exports: [  
    ComparePasswordDirective,  
  ],
})  
export class ComparePasswordModule { }  