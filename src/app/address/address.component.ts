import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressEditComponent} from "../address-edit/address-edit.component";
import {PersonService} from "../person.service";
import {AddressService} from "../address.service";
import {FormBuilder} from "@angular/forms";
import * as _ from 'lodash';
import {Person} from "../person/person.component";

export interface Address {
  id?: number;
  address: string;
  postal_code: number;
  city_name: string;
  country_name: string;
  person_id?: number;
}

const ELEMENT_DATA: Address[] = [];

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  person: Person = {name: '', birthday: '', gender: ''};

  addressForm;
  displayedColumns: string[] = ['id', 'address', 'city_name', 'country_name', 'postal_code', 'actions'];

  constructor(private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private personService: PersonService,
              private addressService: AddressService,
              private formBuilder: FormBuilder) {
    this.addressForm = this.formBuilder.group({
      address: '',
      city_name: '',
      country_name: '',
      postal_code: '',
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.personService.get(id).subscribe(res => this.person = res["data"]);

    this.addressService.index(id).subscribe(res => {
      this.dataSource = res["data"];
    })
  }

  edit(element: Address) {
    const dialogRef = this.dialog.open(AddressEditComponent, {data: element});

    dialogRef.afterClosed().subscribe(result => {
      element = result;
      const index = _.findIndex(this.dataSource, {id: element.id});
      this.dataSource.splice(index, 1, element);
      this.dataSource = [...this.dataSource];
    });
  }

  remove(element: Address, index) {
    this.addressService.delete(element).subscribe(res => {
      this.dataSource.splice(index, 1)
      this.dataSource = [...this.dataSource];
    });
  }

  submit() {
    const address: Address = {
      address: this.addressForm.controls['address'].value,
      city_name: this.addressForm.controls['city_name'].value,
      country_name: this.addressForm.controls['country_name'].value,
      postal_code: this.addressForm.controls['postal_code'].value,
      person_id: this.person.id
    };

    this.addressService.create(address).subscribe(res => {
      this.dataSource = [res["data"], ...this.dataSource]
      this.addressForm.reset();
    });
  }
}
