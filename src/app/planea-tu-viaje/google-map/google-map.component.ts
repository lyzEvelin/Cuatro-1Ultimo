//import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DatosAbiertosService } from '../../services/datos-abiertos.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
//import { DatosAbiertosService } from '../../services/estaciones.service';
declare var lat: any;
declare var $: any;
const jsonDA: any[] = [];
const arrayRutas: any[] = [];

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  lat = 4.6597100;
  lng = -74.0917500;
  zoom = 11;
   Troncal: any[] = [];
  Estacion: any[]  = [];
  Troncal2: String[];
   // tslint:disable-next-line:max-line-length
   jsonDA2: any[] = [];
   arrayRutas2: any[] = [];
   latLon: any[] = [];
   rutaImages: any[] = [];

  
  constructor(private _DatosAbiertosService: DatosAbiertosService) {
    //this .consultar();
    $.getJSON('http://datosabiertos.bogota.gov.co/api/3/action/datastore_search?resource_id=d0775af7-1706-4404-8bea-387194287d73&limit=1000',  
     
      (records) => {
        this.guardarDatos(records);
      var  mydata = JSON.parse(records);
      $.each(mydata, function (index, value){
        console.log(value, records.Name);
      })
    });
   // this.jsonDA2 = jsonDA;
  //console.log(this.jsonDA2);

  }

  ngOnInit() {
    
    this.Troncal = this._DatosAbiertosService.getTroncales();
    this.latLon = this._DatosAbiertosService.getLatLon();
    console.log(this.latLon);
  }
    
    //for(var i=0; i<150; i++)
    //{
      //console.log(records.result.records[i]);
    //};

    //for(var i=0; i<149; i++)
    //{
     // console.log(records.result.records[i].Name);
     /* lat: number = 4.598;
      lng: number = -74.0761;
      zoom: number = 10;*/
    //};
  /*  this.latLon.push({Estacion: records.Name, Lat: records.Latitud.replace(',', '.').replace('*', ''), Lon: records.Longitud.replace(',', '.').replace('*', ''),Troncal: records.Corredor,Id:records.Id});
    });*/
    
    
guardarDatos(data) {

  this.latLon.forEach(element => {

   if (element.Estacion === $('#estacionCambio').val()) {

      this.resetMap(parseFloat(element.Lat), parseFloat(element.Lon), 15);
   }
 });

}
/*
comprobar(vagon: string, Estacion: string) {
  if (vagon.indexOf(Estacion)) {
    return true;
  }
  return false;
}*/
resetMap(lati: number , long: number, zoom2: number) {

  console.log(lati + ' lat ' + long + ' long ' + zoom2 + ' zoom');
  this.lat = lati;
  this.lng = long;
  this.zoom = zoom2;
}

/*
buscarImagen(id_ruta) {
    id_ruta = id_ruta.toString();
    console.log(this.rutaImages);
    console.log(id_ruta);
    const rutaimagen = $.grep(this.rutaImages, function(value) {
      return value.idRuta === id_ruta;
    });
    const rutaimagenURL = rutaimagen.map(a => a.URL);
    const ruta = '"../../../../' + rutaimagenURL + '"';
    console.log(rutaimagen);
    console.log(rutaimagenURL);
    console.log('ruta: ' + ruta);
    $('#img').attr('src', ruta.replace('"', '').replace('"', ''));

}

getBuscarImagen() {
  this._DatosAbiertosService.buscarImagen().subscribe(data => {
    for (let i = 0; i <= data.length - 1; i++) {
      this.rutaImages.push((data[i])) ; }
      });
}

cleanImage() {
  $('#img').empty();
}
hola() {
  alert('hola');
}
  }
*/
/*
 guardarDatos(data){
  this.datos=data;
  for(var i=0; i<2; i++)
    {
      console.log(this.datos.result.records[i].Name);
      this.texto+=(this.datos.result.records[i].Name);
      this.lat +=(this.datos.result.records[i].Latitud);
      this.lng +=(this.datos.result.records[i].Longitud);
      
      //this.zoom = 10;
    };
 }

 verDatos(){
   console.log(this.datos);
   console.log(this.texto)
 }
*/
 
/*
  getCoordinates(data: Troncal[]): void {
    data.forEach(trunk => {
      trunk.stage.forEach((stage: Estacion) => {
        const aux = {
          trunk: trunk.name,
          symbol: trunk.symbol,
          stage: stage.name,
          coordinate: stage.coordenates
        };
        this.coordenates.push(aux);
      });
    });

  }*/

  
  

}
