import { Component, OnInit, Input} from '@angular/core';
import { stations } from '../stations';

@Component({
  selector: 'app-day-form',
  templateUrl: './day-form.component.html',
  styleUrls: ['./day-form.component.css']
})
export class DayFormComponent implements OnInit {
  @Input() dayName: string;
  stations = stations;

  constructor() { }

  ngOnInit(): void {}

  onCheckboxChange(event: any) {
    //const selectedStations = (this.myForm.controls['stations'] as FormArray);
    //if (event.target.checked) {
    //  selectedStations.push(new FormControl(event.target.value));
    //} else {
    //  const index = selectedStations.controls.findIndex(x => x.value === event.target.value);
    //  selectedStations.removeAt(index);
    //}
  }

}
