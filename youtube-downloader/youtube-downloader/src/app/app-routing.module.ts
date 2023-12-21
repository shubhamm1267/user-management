import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YoutubeThumbnailDownloaderComponent } from './youtube-thumbnail-downloader/youtube-thumbnail-downloader.component';

const routes: Routes = [
  {path:'', component:YoutubeThumbnailDownloaderComponent},
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then((m) => m.TermsModule),
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./header/header.module').then((m) => m.HeaderModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
