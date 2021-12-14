import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { stations } from '../stations';
import { Day } from '../day';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
  data = null;
  displayedData = this.data;
  samedi: Day;


  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    busSamedi: new FormControl('', [Validators.required]),
    busDimanche: new FormControl('', [Validators.required]),
    stations: new FormArray([]),
    //this.fb.array([])
  });

  constructor(private papa: Papa) {
  }

  ngOnInit(): void {
  }

  get f(){
    return this.myForm.controls;
  }
     
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  onCheckboxChange(event: any) {
    const selectedStations = (this.myForm.controls['stations'] as FormArray);
    if (event.target.checked) {
      selectedStations.push(new FormControl(event.target.value));
    } else {
      const index = selectedStations.controls.findIndex(x => x.value === event.target.value);
      selectedStations.removeAt(index);
    }
  }

  updateDisplayedData(day: number){
    const OUI: string = "Oui", RENFORT: string = "Renfort";
    const filters = [OUI, RENFORT];
    
    if(day < 3 ){
      this.displayedData = this.data;
    }else{
      this.displayedData = this.data.filter( data => filters.includes(data[day]) );
    }
  }

     
  submit(){
    const samedi = Number(this.myForm.get("busSamedi")?.value);
    const dimanche = Number(this.myForm.get("busDimanche")?.value);

    this.papa.parse(this.myForm.get('fileSource').value,{
            complete: (result) => {
                console.log('Parsed: ', result);

                this.data = result.data;
                this.displayedData = this.data;

                const OUI: string = "Oui", RENFORT: string = "Renfort";
                const filters = [OUI, RENFORT];
                const temporaryDay = this.data.filter( data => filters.includes(data[3]) );

                //this.samedi = new Day();
                //this.samedi.destinations.push("Les 2 Alpes");
                //samedi.bus = 2;
                //samedi.coordinators = temporaryDay.filter( data => "Coordinateur Station" == data[2] );
                //samedi.attendants = temporaryDay.filter( data => "Accompagnateur" == data[2] );
                //samedi.newAttendants = temporaryDay.filter( data => "Nouveau accompagnateur" == data[2] );
                //this.samedi = samedi;


            }
        });
  }

  


}
