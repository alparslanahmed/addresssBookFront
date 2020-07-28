import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Person} from "../person/person.component";
import {FormBuilder} from "@angular/forms";
import {PersonService} from "../person.service";

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  editForm;
  gender: any;

  constructor(
    public dialogRef: MatDialogRef<PersonEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
    private formBuilder: FormBuilder,
    private personService: PersonService
  ) {
    this.editForm = this.formBuilder.group({
      name: data.name,
      birthday: data.birthday
    })

    this.gender = data.gender;
  }

  ngOnInit(): void {

  }

  update() {
    this.personService.update({
      id: this.data.id,
      name: this.editForm.controls['name'].value,
      gender: this.gender,
      birthday: this.editForm.controls['birthday'].value
    }).subscribe(res => {
      this.dialogRef.close(res["data"])
    })
  }
}
