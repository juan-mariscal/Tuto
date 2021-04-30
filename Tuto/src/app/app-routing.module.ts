import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'new-account/:email/:password/:type',
    loadChildren: () => import('./new-account/new-account.module').then( m => m.NewAccountPageModule)
  },
  {
    path: 'tutor-profile',
    loadChildren: () => import('./tutor-profile/tutor-profile.module').then( m => m.TutorProfilePageModule)
  },
  {
    path: 'edit-tutor-profile',
    loadChildren: () => import('./edit-tutor-profile/edit-tutor-profile.module').then( m => m.EditTutorProfilePageModule)
  },
  {
    path: 'view-reviews',
    loadChildren: () => import('./view-reviews/view-reviews.module').then( m => m.ViewReviewsPageModule)
  },
  {
    path: 'student-profile',
    loadChildren: () => import('./student-profile/student-profile.module').then( m => m.StudentProfilePageModule)
  },
  {
    path: 'edit-student-profile',
    loadChildren: () => import('./edit-student-profile/edit-student-profile.module').then( m => m.EditStudentProfilePageModule)
  },
  {
    path: 'write-review',
    loadChildren: () => import('./write-review/write-review.module').then( m => m.WriteReviewPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
