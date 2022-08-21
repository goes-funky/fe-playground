import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { AngularMaterialModule } from '../app/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    AngularMaterialModule
  ],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
})
export class NavigationModule {}
