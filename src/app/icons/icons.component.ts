import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotRow, CustomForm, Flow, Skin } from '../Interface/interface';

@Component({
  selector: 'app-icons',

  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  userName: string = '';
  filteredForms: CustomForm[] = [];
  filteredBots: BotRow[] = [];
  filteredFlows: Flow[] = [];
  forms: CustomForm[] = [

    // Global Forms (available to everyone)
    {
      formName: 'Basic',
      entityName: 'global',
      numberOfInputs: 2,
      inputs: [
        { label: 'Full Name', dataType: 'string' },
        { label: 'Email', dataType: 'email' }
      ]
    },
    {
      formName: 'Authntication',
      entityName: 'global',
      numberOfInputs: 2,
      inputs: [
        { label: 'Age', dataType: 'number' },
        { label: 'Gender', dataType: 'string' }
      ]
    },

    // Entity-specific Forms
    {
      formName: 'BrightPattern',
      entityName: 'Alice Johnson',
      numberOfInputs: 3,
      inputs: [
        { label: 'Employee ID', dataType: 'string' },
        { label: 'Department', dataType: 'string' },
        { label: 'Joining Date', dataType: 'date' }
      ]
    },
    {
      formName: 'Support',
      entityName: 'Alice Johnson',
      numberOfInputs: 2,
      inputs: [
        { label: 'Patient Name', dataType: 'string' },
        { label: 'Diagnosis', dataType: 'string' }
      ]
    },
    {
      formName: 'Sales',
      entityName: 'Entity_C',
      numberOfInputs: 4,
      inputs: [
        { label: 'Course', dataType: 'string' },
        { label: 'Credits', dataType: 'number' },
        { label: 'Instructor', dataType: 'string' },
        { label: 'Semester', dataType: 'string' }
      ]
    }
  ];

  bots: BotRow[] = [
    {
      entityName: 'Alice Johnson',
      botName: 'BudgetHelper',
      entityId: 'ENT123',
      botConfigId: 'CFG987',
      status: 'Active',
      action: 'Edit',
      Skin:'Bot1'
    },
    {
      entityName: 'Alice Johnson',
      botName: 'Sales',
      entityId: 'ENT123',
      botConfigId: 'CFG987',
      status: 'Active',
      action: 'Edit',
      Skin:'Bot2'
    },
    {
      entityName: 'Alice Johnson',
      botName: 'Support',
      entityId: 'ENT123',
      botConfigId: 'CFG987',
      status: 'Active',
      action: 'Edit',
      Skin:'Bot1'
    },
    {
      entityName: 'Bob Smith',
      botName: 'RecruiterPro',
      entityId: 'ENT456',
      botConfigId: 'CFG654',
      status: 'Inactive',
      action: 'Edit',
      Skin:'Bot1'
    },
    {
      entityName: 'Diana Prince',
      botName: 'HelpDeskAI',
      entityId: 'ENT789',
      botConfigId: 'CFG321',
      status: 'Active',
      action: 'Edit',
      Skin:'Bot1'
    }
  ];

  flows: Flow[] = [
    {
      flowName: 'Onboarding Flow',
      entityName: 'Alice Johnson',
      steps: [
        { type: 'bot', name: 'Bot1' },
        { type: 'form', name: 'Form1' },
        { type: 'bot', name: 'Bot2' }
      ]
    },
    {
      flowName: 'Customer Support',
      entityName: 'Alice Johnson',
      steps: [
        { type: 'bot', name: 'SupportBot' },
        { type: 'form', name: 'TicketForm' },
        { type: 'agent', name: 'Contact Center Agent' }
      ]
    },
    {
      flowName: 'Basic Inquiry',
      entityName: 'global',
      steps: [
        { type: 'bot', name: 'InfoBot' },
        { type: 'form', name: 'BasicForm' }
      ]
    }
  ];

  skins: Skin[] = [
  {
    skinName: 'Modern Blue',
    botName: 'Bot1',
    enabled: true
  },
  {
    skinName: 'Dark Mode',
    botName: 'Bot2',
    enabled: false
  },
  {
    skinName: 'Minimalist White',
    botName: 'SupportBot',
    enabled: true
  },
  {
    skinName: 'Classic Green',
    botName: 'Bot1',
    enabled: false
  }
];

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.saveToLocalStorage();
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('botName');
    });
    this.filteredForms = this.forms.filter(form =>
      form.entityName === 'global' || form.entityName === this.userName
    );
    this.filteredBots = this.bots.filter(
      bot => bot.entityName === this.userName
    );
    this.filteredFlows = this.flows.filter(flow =>
      flow.entityName === 'global' || flow.entityName === this.userName
    );

  }

  saveToLocalStorage(): void {
  localStorage.setItem('bots', JSON.stringify(this.bots));
  localStorage.setItem('forms', JSON.stringify(this.forms));
  localStorage.setItem('flows', JSON.stringify(this.flows));
  localStorage.setItem('skins', JSON.stringify(this.skins));
}
}
