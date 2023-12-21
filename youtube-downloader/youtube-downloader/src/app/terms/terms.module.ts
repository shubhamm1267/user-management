import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms.component';
import { Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
} from 'ngx-ui-loader';
import { ServiceWorkerModule } from '@angular/service-worker';

const routes: Routes = [
  { path: '', component: TermsComponent },
];

@NgModule({
  declarations: [TermsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    ServiceWorkerModule,
    NgxUiLoaderModule,
    MatProgressBarModule,
    MatRippleModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSliderModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,MatInputModule,
    MatFormFieldModule
  ]
})
export class TermsModule { }
