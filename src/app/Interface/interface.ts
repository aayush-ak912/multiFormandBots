export class Interface {
}

export interface UserTableRow {
  name: string;
  status: 'Active' | 'Inactive';
  email: string;
  phone: string;
  action: string; // e.g., "Edit" or could be a route/button ID
}
