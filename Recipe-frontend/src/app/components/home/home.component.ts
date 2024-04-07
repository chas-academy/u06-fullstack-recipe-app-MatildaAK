import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { RouterLink } from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { Recipe } from '../../interfaces/recipe';
import { RecipeidformatterPipe } from '../../pipes/recipeidformatter.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Filter } from '../../interfaces/filter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipesComponent, FormsModule, RouterLink, RecipeidformatterPipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  recipes?: Recipe[];

  filter: Filter ={
    query: '',
    mealTypes: '',
    health: '',
    cuisineTypes: '',
    dishType: 'Desserts',
    diet: ''
  }

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.mealType(); 
  }

  mealType() {
    this.recipeService.getRecipes(this.filter).subscribe((result) => {

      let recipes: Recipe[];
      recipes = result.hits.map((item: { recipe: { label: any; image: any; ingredientLines: any; totalTime: any; }; _links: { self: { href: any; }; }; }) => {
        return {
          label: item.recipe.label,
          image: item.recipe.image,
          ingredientLines: item.recipe.ingredientLines,
          totalTime: item.recipe.totalTime,
          selfref: item._links.self.href,
        };
      });
      this.recipes = recipes;
    });
  }
}
