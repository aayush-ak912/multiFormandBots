import { Component, OnInit } from '@angular/core';
import { UserTableRow} from '../Interface/interface';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usersTable: UserTableRow[] = [
  {
    name: 'Alice Johnson',
    status: 'Active',
    email: 'alice@example.com',
    phone: '+1-555-1234',
    action: 'Edit'
  },
  {
    name: 'Bob Smith',
    status: 'Inactive',
    email: 'bob.smith@example.com',
    phone: '+1-555-5678',
    action: 'Edit'
  },
  {
    name: 'Charlie Brown',
    status: 'Active',
    email: 'charlie.b@example.com',
    phone: '+1-555-8765',
    action: 'Edit'
  },
  {
    name: 'Diana Prince',
    status: 'Active',
    email: 'diana.p@example.com',
    phone: '+1-555-4321',
    action: 'Edit'
  },
  {
    name: 'Ethan Hunt',
    status: 'Inactive',
    email: 'ethan.hunt@example.com',
    phone: '+1-555-9090',
    action: 'Edit'
  }
];


  constructor() { }

  ngOnInit() {
  }

}
