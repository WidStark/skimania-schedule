import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { stations } from '../stations';
import { Day } from '../day';

export interface Sortie {
  nom: string;
  prenom: string;
  fonction: string;
  samedi: string;
  dimanche: string;
  transport: string;
  multi: string;
  remarque: string;
}

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
  data: Sortie[] = null;
  displayedData = this.data;
  displayedColumns: string[] = ['nom', 'prenom', 'fonction', 'samedi', 'dimanche', 'transport', 'multi', 'remarque'];
  displayedDaysColumns: string[] = ['destinations', 'bus', 'coordinators', 'newAttendants', 'attendants'];
  stations = stations;
  samedi: Day[];
  dimanche: Day[];
  myForm: FormGroup;

  constructor(private papa: Papa, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      file: [Validators.required],
      fileSource: [Validators.required],
      busSamedi: [Validators.required],
      busDimanche: [Validators.required],
      stationsSamedi: this.fb.group({
        arechesBeaufort: false,
        chamrousse: false,
        courchevel: false,
        alpeDhuez: false,
        laClusaz: false,
        laPlagne: false,
        les7Laux: false,
        lesArcs: false,
        lesDeuxAlpes: false,
        lesSaisies: false,
        tignes: false,
        valDisere: false,
        valThorens: false,
        valmorel: false
      }),
      stationsDimanche: this.fb.group({
        arechesBeaufort: false,
        chamrousse: false,
        courchevel: false,
        alpeDhuez: false,
        laClusaz: false,
        laPlagne: false,
        les7Laux: false,
        lesArcs: false,
        lesDeuxAlpes: false,
        lesSaisies: false,
        tignes: false,
        valDisere: false,
        valThorens: false,
        valmorel: false
      }),
    });
  }

  ngOnInit(): void {}

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  /*onCheckboxChange(event: any) {
    const selectedStations = (this.myForm.controls['stations'] as FormArray);
    if (event.target.checked) {
      selectedStations.push(new FormControl(event.target.value));
    } else {
      const index = selectedStations.controls.findIndex(x => x.value === event.target.value);
      selectedStations.removeAt(index);
    }
  }*/

  updateDisplayedData(day: number){
    const OUI: string = "Oui", 
      RENFORT: string = "Renfort",
      SAMEDI: number = 3,
      DIMANCHE: number = 4;
    const filters = [OUI, RENFORT];
    
    if(day < 3 ){
      this.displayedData = this.data;
    }else{
      switch(day){
        case SAMEDI:
          this.displayedData = this.data.filter( data => filters.includes(data['samedi']));
          break;
        case DIMANCHE:
          this.displayedData = this.data.filter( data => filters.includes(data['dimanche']));
          break;
      }
    }

    return this.displayedData; //return used for TS, delete maybe after
  }

  getStationFromCheckbox(checkboxes: Object){
    let stations : string[] = [];

    if(checkboxes['arechesBeaufort']){
      stations.push("ARECHES-BEAUFORT");
    }
    if(checkboxes['chamrousse']){
      stations.push("CHAMROUSSE");
    }
    if(checkboxes['courchevel']){
      stations.push("COURCHEVEL");
    }
    if(checkboxes['alpeDhuez']){
      stations.push("L'ALPE D'HUEZ");
    }
    if(checkboxes['laClusaz']){
      stations.push("LA CLUSAZ");
    }
    if(checkboxes['laPlagne']){
      stations.push("LA PLAGNE");
    }
    if(checkboxes['les7Laux']){
      stations.push("LES 7 LAUX");
    }
    if(checkboxes['lesArcs']){
      stations.push("LES ARCS");
    }
    if(checkboxes['lesDeuxAlpes']){
      stations.push("LES DEUX ALPES");
    }
    if(checkboxes['lesSaisies']){
      stations.push("LES SAISIES");
    }
    if(checkboxes['tignes']){
      stations.push("TIGNES");
    }
    if(checkboxes['valDisere']){
      stations.push("VAL D'ISERE");
    }
    if(checkboxes['valThorens']){
      stations.push("VAL THORENS");
    }
    if(checkboxes['valmorel']){
      stations.push("VALMOREL");
    }

    return stations.join(", ");
  }

     
  submit(){
    const samedi = Number(this.myForm.get("busSamedi").value);
    const dimanche = Number(this.myForm.get("busDimanche").value);
    const file = this.myForm.get("fileSource").value;

    this.papa.parse(file,{
            complete: (result) => {

                this.data = [];
                result.data.forEach(row =>
                  this.data.push({
                    nom: row[0],
                    prenom: row[1],
                    fonction: row[2],
                    samedi: row[3],
                    dimanche: row[4],
                    transport: row[5],
                    multi: row[6],
                    remarque: row[7],
                  }));

                let availableOnDay = this.updateDisplayedData(3);
                this.samedi = [{
                  destinations: this.getStationFromCheckbox(this.myForm.get('stationsSamedi').value),
                  bus: samedi,
                  coordinators: availableOnDay.filter( data => "Coordinateur Station" == data['fonction'] ).length,
                  newAttendants: availableOnDay.filter( data => "Nouveau accompagnateur" == data['fonction'] ).length,
                  attendants: availableOnDay.filter( data => "Accompagnateur" == data['fonction'] ).length
                }];

                availableOnDay = this.updateDisplayedData(4);
                this.dimanche = [{
                  destinations: this.getStationFromCheckbox(this.myForm.get('stationsDimanche').value),
                  bus: dimanche,
                  coordinators: availableOnDay.filter( data => "Coordinateur Station" == data['fonction'] ).length,
                  newAttendants: availableOnDay.filter( data => "Nouveau accompagnateur" == data['fonction'] ).length,
                  attendants: availableOnDay.filter( data => "Accompagnateur" == data['fonction'] ).length
                }];

                this.displayedData = this.data;
            }
        });
  }

  process(){
    // pour chaque jour
    // pr chaque nb de bus assigné à tel station
    // assigner un accomp ou binome par niveau de priorité
    
  }
  


}
