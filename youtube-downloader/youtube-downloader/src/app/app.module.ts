import {  NgModule, isDevMode  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HttpClient } from '@angular/common/http';
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
import { AppRoutingModule } from './app-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YoutubeThumbnailDownloaderComponent } from './youtube-thumbnail-downloader/youtube-thumbnail-downloader.component';
import { YouTubeThumbnailDownloaderService } from './you-tube-thumbnail-downloader.service';
import { HeaderComponent } from './header/header.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TermsComponent } from './terms/terms.component';
import { PostComponent } from './post/post.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
} from 'ngx-ui-loader';
import { ServiceWorkerModule } from '@angular/service-worker';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "blur": 5,
  "fgsColor": "rgba(234,236,245,0.98)",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "cube-grid",
  "text": "Loading...",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
}

@NgModule({
  declarations: [
    AppComponent,
    YoutubeThumbnailDownloaderComponent,
    HeaderComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    PostComponent
    ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRippleModule,
    HttpClientModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatListModule,
    MatSliderModule,
    FlexLayoutModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    ],
  providers: [YouTubeThumbnailDownloaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
