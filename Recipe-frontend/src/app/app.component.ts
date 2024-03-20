import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RecipeAboutComponent } from './components/recipe-about/recipe-about.component';
import { RecipeAllComponent } from './components/recipe-all/recipe-all.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, RecipeAboutComponent, RecipeAllComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My recipe';
}
