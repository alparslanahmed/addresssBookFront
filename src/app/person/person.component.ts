import {ApplicationRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PersonEditComponent} from "../person-edit/person-edit.component";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {PersonService} from "../person.service";
import * as _ from 'lodash';

export interface Person {
  id?: number;
  name: string;
  gender: string;
  birthday: string;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  dataSource = [];

  displayedColumns: string[] = ['id', 'name', 'gender', 'birthday', 'actions'];

  personForm;
  genderSelect: any;

  constructor(private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder,
              private personService: PersonService,
              private applicationRef: ApplicationRef) {
    this.personForm = this.formBuilder.group({
      name: '',
      gender: '',
      birthday: '',
    });
  }

  ngOnInit(): void {
    this.personService.index().subscribe(res => {
      this.dataSource = res["data"];
    })
  }

  edit(element: Person) {
    const dialogRef = this.dialog.open(PersonEditComponent, {data: element});

    dialogRef.afterClosed().subscribe(result => {
      element = result;
      const index = _.findIndex(this.dataSource, {id: element.id});
      this.dataSource.splice(index, 1, element);
      this.dataSource = [...this.dataSource];
    });
  }

  remove(element: Person, index) {
    this.personService.delete(element).subscribe(res => {
      this.dataSource.splice(index, 1)
      this.dataSource = [...this.dataSource];
    });
  }

  select(element: Person) {
    this.router.navigate(['person-addresses', element.id])
  }

  submit() {
    const person: Person = {
      name: this.personForm.controls['name'].value,
      gender: this.genderSelect,
      birthday: this.personForm.controls['birthday'].value
    };

    this.personService.create(person).subscribe(res => {
      this.dataSource = [res["data"], ...this.dataSource]
      this.personForm.reset();
    });
  }
}
