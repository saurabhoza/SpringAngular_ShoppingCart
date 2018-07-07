import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule, MatToolbarModule, MatMenuModule, MatRadioModule, MatProgressBarModule, MatGridListModule, MatSelectModule, MatFormFieldModule, MatAccordion, MatExpansionPanel, MatExpansionModule, MatCheckboxModule,MatSlideToggleModule } from '@angular/material';
import { LanguageBarDetailComponent } from '../framework/language-bar/components/language-bar-detail.component';
import { LanguageBarComponent } from '../framework/language-bar/components/language-bar.component';
import { CommonModule } from '@angular/common';
import { ValidationErrorsComponent } from '../framework/validation-error/components/validation-error.component';
import { AppTransition } from '../framework/app-transition/app-transition';
import { QuantityValidationComponent } from '../framework/quantity-validation/quantity-validation.component';
import { LoggerService } from '../framework/logger-service/logger-service';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCheckboxModule,
    CommonModule,
    MatSlideToggleModule
  ],
  declarations: [
    LanguageBarComponent,
    LanguageBarDetailComponent,
    ValidationErrorsComponent,
    QuantityValidationComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatRadioModule,
    MatGridListModule,
    MatSelectModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCheckboxModule,
    LanguageBarComponent,
    LanguageBarDetailComponent,
    ValidationErrorsComponent,
    CommonModule,
    QuantityValidationComponent,
    MatSlideToggleModule
  ],
  providers: [AppTransition, LoggerService]
})
export class AppCommonModule {}
