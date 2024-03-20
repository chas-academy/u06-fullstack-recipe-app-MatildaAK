import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipeAboutComponent } from './components/recipe-about/recipe-about.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'recipe', component: RecipeAboutComponent},
    {path: 'profile', component: UserPageComponent, canActivate: [authGuard]},
];
