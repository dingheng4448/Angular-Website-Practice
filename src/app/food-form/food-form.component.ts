import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent {

  foodForm: FormGroup;
  foodTags = [
    'Chicken', 'Western', 'Fast Food', 'Asian', 'Chinese', 'Local', 'Seafood', 
    'Italian', 'Japanese', 'Korean', 'Burgers', 'Nasi Lemak', 'Noodles', 'Pasta', 'Pizza',
    'Ramen', 'Soup'
  ];
  
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    // Initialize FormArray for foodForm
    this.foodForm = this.formBuilder.group({
      formArray: new FormArray([])
    });

    // For each foodTag element, push FormControl into formArray
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.foodTags.forEach(() => this.foodFormArray.push(new FormControl(false)));
  }

  get foodFormArray() {
    return this.foodForm.controls.formArray as FormArray;
  }

  onSubmit() {
    // Create new array of selected tags after filtering away null values
    const selectedTags = this.foodForm.value.formArray
      .map((isSelected: boolean, index: number) => isSelected ? this.foodTags[index] : null)
      .filter((foodTag: string) => foodTag !== null);

    const foodQuery = "{ \"foodTags\": " + JSON.stringify(selectedTags) + " }";
    console.log(foodQuery);

    this.apiService.postFoodQuery(foodQuery).subscribe((data) => {
      console.log(data);
    });
  }

}