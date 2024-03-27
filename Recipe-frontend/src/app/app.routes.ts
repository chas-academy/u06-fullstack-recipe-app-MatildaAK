import { Routes } from '@angular/router';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { LoginTComponent } from './pages/login-t/login-t.component';

export const routes: Routes = [
    {path:'', component:RecipesComponent},
    {path:'recipe/:id', component:RecipeComponent},
    {path:'profile', component:ProfileComponent, canActivate: [authGuard]},
    {path:'login', component:LoginTComponent}
];