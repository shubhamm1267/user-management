import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YoutubeThumbnailDownloaderComponent } from './youtube-thumbnail-downloader/youtube-thumbnail-downloader.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HeaderComponent } from './header/header.component';
import { TermsComponent } from './terms/terms.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: '', redirectTo: '/youtube', pathMatch: 'full' },
  { path: 'youtube', component: YoutubeThumbnailDownloaderComponent },
  {path:'privacy',component:PrivacyPolicyComponent},
  {path:'post',component:PostComponent},
  {path:'about',component:HeaderComponent},
  {path:'terms',component:TermsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
