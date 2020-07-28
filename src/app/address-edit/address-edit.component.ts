import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {AddressService} from "../address.service";
import {Address} from "../address/address.component";

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent implements OnInit {
  editForm;

  constructor(
    public dialogRef: MatDialogRef<AddressEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Address,
    private formBuilder: FormBuilder,
    private addressService: AddressService
  ) {
    this.editForm = this.formBuilder.group({
      address: data.address,
      city_name: data.city_name,
      country_name: data.country_name,
      postal_code: data.postal_code
    })

  }

  ngOnInit(): void {
  }

  update() {
    this.addressService.update({
      id: this.data.id,
      address: this.editForm.controls['address'].value,
      city_name: this.editForm.controls['city_name'].value,
      country_name: this.editForm.controls['country_name'].value,
      postal_code: this.editForm.controls['postal_code'].value
    }).subscribe(res => {
      this.dialogRef.close(res["data"])
    })
  }
}
