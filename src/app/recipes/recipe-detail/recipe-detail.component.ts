import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id')!;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
