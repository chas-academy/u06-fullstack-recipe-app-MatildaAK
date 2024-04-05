import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeidformatterPipe } from "../../pipes/recipeidformatter.pipe";
import { CommonModule } from '@angular/common';
import { Filter } from '../../interfaces/filter';

@Component({
    selector: 'app-recipes',
    standalone: true,
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.css',
    imports: [FormsModule, RouterLink, RecipeidformatterPipe, CommonModule]
})
export class RecipesComponent implements OnInit {
  recipes?: Recipe[];

  filter: Filter ={
    query: '',
    mealTypes: '',
    health: '',
    cuisineTypes: '',
    dishType: ''
  }

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.route.url.subscribe(url => {  
      console.log(url);
      console.log(url[0]);   
        if (url[0] !== undefined && url[0].path === 'recipes') {
          this.searchRecipe();
        }
    })
  }

  searchRecipe() {
    this.recipeService.getRecipes(this.filter).subscribe((result) => {
      console.log(result);
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
      console.table(recipes);
      this.recipes = recipes;
    });
  }
}