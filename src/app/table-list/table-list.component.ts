import { Component, OnInit } from '@angular/core';
import { BotRow} from '../Interface/interface';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
   bots: BotRow[] = [
    {
      entityName: 'FinanceBot',
      botName: 'BudgetHelper',
      entityId: 'ENT123',
      botConfigId: 'CFG987',
      status: 'Active',
      action: 'Edit'
    },
    {
      entityName: 'HRBot',
      botName: 'RecruiterPro',
      entityId: 'ENT456',
      botConfigId: 'CFG654',
      status: 'Inactive',
      action: 'Edit'
    },
    {
      entityName: 'SupportBot',
      botName: 'HelpDeskAI',
      entityId: 'ENT789',
      botConfigId: 'CFG321',
      status: 'Active',
      action: 'Edit'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
