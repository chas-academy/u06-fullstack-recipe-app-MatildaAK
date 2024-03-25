import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipeAboutComponent } from './components/recipe-about/recipe-about.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { authGuard } from './guards/auth.guard';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: 'recipe', component: RecipeAboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: UserPageComponent, canActivate: [authGuard]},
];
