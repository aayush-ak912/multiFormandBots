export interface BotRow {
  entityName: string;
  botName: string;
  entityId: string;
  botConfigId: string;
  status: 'Active' | 'Inactive';
  action: string;
  Skin: String;
}

export interface UserTableRow {
  name: string;
  status: 'Active' | 'Inactive';
  email: string;
  phone: string;
  action: string; // e.g., "Edit" or could be a route/button ID
}

export interface FormInput {
  label: string;
  dataType: string;
}

export interface CustomForm {
  formName: string;
  entityName: string;
  numberOfInputs: number;
  inputs: FormInput[];
}

export interface FlowStep {
  type: 'bot' | 'form' | 'agent';
  name: string; // e.g., Bot1, Form2, ContactAgent
}

export interface Flow {
  flowName: string;
  entityName: string;
  steps: FlowStep[];
}

export interface Skin {
  skinName: string;
  botName: string;
  enabled: boolean;
}

