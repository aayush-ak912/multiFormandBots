export interface  BotRow {
  entityName: string;
  botName: string;
  entityId: string;
  botConfigId: string;
  status: 'Active' | 'Inactive';
  action: string;
}

export interface UserTableRow {
  name: string;
  status: 'Active' | 'Inactive';
  email: string;
  phone: string;
  action: string; // e.g., "Edit" or could be a route/button ID
}
