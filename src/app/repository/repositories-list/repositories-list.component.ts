import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../../service/apollo.service';

@Component({
  selector: 'app-repositories-list',
  templateUrl: './repositories-list.component.html',
  styleUrls: ['./repositories-list.component.css']
})
export class RepositoriesListComponent implements OnInit {
  data = [];
  isSpinning = false;
  constructor(private apolloService: ApolloService) { }

  ngOnInit() {
    this.queryRepositories();
  }

  async queryRepositories() {
    this.isSpinning = true;
    const res = await this.apolloService.queryRepositories();
    console.log(res);
    
    this.isSpinning = false;
    if (res) {
      this.data = res;
    }
  }

}
