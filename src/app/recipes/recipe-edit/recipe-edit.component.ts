import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id!: number | null;
  editMode = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.has('id') ? Number(paramMap.get('id')) : null;
      this.editMode = this.id !== null;
    });
  }
}
