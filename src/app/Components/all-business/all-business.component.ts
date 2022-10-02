import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-business',
  templateUrl: './all-business.component.html',
  styleUrls: ['./all-business.component.css']
})
export class AllBusinessComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl("")
  });
  constructor() { }

  ngOnInit(): void {
  }

  OnSubmit(): void {

  }

}
