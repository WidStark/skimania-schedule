import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { stations } from '../stations';
import { statutFormateurs } from '../statutFormateurs';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  stations = stations;
  statutFormateurs = statutFormateurs;
  busForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.busForm = fb.group({
      busNumber: [],
      accompagnateurs: this.fb.array([this.fb.control('')]),
      accompagnateursStatut: this.fb.array([]),
      //accompagnateurs: fb.group({
      //  statut: [],
      //  nom: [],
      //}),
      stations: this.fb.array([])
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.busForm.value);

    const nbBus = Number(this.busForm.get("busNumber")?.value);
    const accompagnateurs = this.busForm.get("accompagnateurs")?.value;
    const stations = this.busForm.get("stations")?.value;

    //for (let index = 0; index < nbBus; index++) {
      
      
    //}

  }

  get accompagnateurs() {
    return this.busForm.get('accompagnateurs') as FormArray;
  }

  addAccompagnateurs() {
    this.accompagnateurs.push(this.fb.control(''));
  }

  delAccompagnateurs() {
    this.accompagnateurs.controls.pop();
  }

  onCheckboxChange(event: any) {
    const selectedStations = (this.busForm.controls['stations'] as FormArray);
    if (event.target.checked) {
      selectedStations.push(new FormControl(event.target.value));
    } else {
      const index = selectedStations.controls.findIndex(x => x.value === event.target.value);
      selectedStations.removeAt(index);
    }
  }


}
