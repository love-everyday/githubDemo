import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnInit {
  @Input()dataSource: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
