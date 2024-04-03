import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {
  id?: string;

  recipe: Recipe | undefined;



  constructor(private route: ActivatedRoute, private recipeService: RecipeService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = String(params.get('id'));
      if (this.id) {
        this.recipeService.getRecipe(this.id).subscribe((recipe: Recipe | undefined) => {
          if(recipe){
            this.recipe = recipe;
          } else {
            console.error('Recipe not found');
          }
          
        });
      }
    });
  }


  
}