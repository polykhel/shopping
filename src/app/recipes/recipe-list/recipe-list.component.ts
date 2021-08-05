import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'Simply a test',
      'https://www.maxpixel.net/static/photo/1x/Borsch-A-Simple-Recipe-Cook-At-Home-Food-4260907.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
