import { Component, OnInit, Input } from '@angular/core';
import { BotRow, CustomForm } from '../Interface/interface';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  @Input() entityName: string = '';
  @Input() section!: string;
  @Input() filtered:any;
  @Input() filteredBots: BotRow[] = [];
  isPopupVisible:boolean=false;
  selectedFlow:string='';
  bots: BotRow[] = []

  constructor() { }
  ngOnInit() {
    this.bots= JSON.parse(localStorage.getItem('bots'));
  }
  togglePopup(s:string){
    this.isPopupVisible=true;
    this.selectedFlow=s;
  }
  
}
