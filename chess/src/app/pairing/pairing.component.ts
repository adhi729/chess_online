import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.css']
})
export class PairingComponent implements OnInit {

  constructor() { }
  arrayBuffer: any;
	file: File;
incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  console.log(this.file)
  }
 upload():void{
 	let fileReader = new FileReader();
        fileReader.onload = (e) => {
        	console.log("here")
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        }
        fileReader.readAsArrayBuffer(this.file);
 }
  ngOnInit() {
  }

}
