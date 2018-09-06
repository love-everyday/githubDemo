import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../../service/apollo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  content: string;
  currentContent: string;
  isSpinning = false;
  data: any[] = [];
  paginationLeft = false;
  paginationRight = false;
  startCursor = null;
  endCursor = null;

  constructor(private apolloService: ApolloService, private route: ActivatedRoute) { 
    console.log('Search create');
    
  }

  ngOnInit() {
    this.content = this.route.snapshot.paramMap.get('key');
    this.content && this.search(this.content);
  }

  updateContent(value){
    this.content = value;
    if (!this.content) {
      this.data = [];
    }
  }

  async search(searchValue:string, type: null | 'previous' | 'next' = null, cursor: string = null) {
    if (!searchValue) {
      return;
    }
    this.currentContent = searchValue.replace(/"/g, "");
    this.isSpinning = true;
    const res = await this.apolloService.queryRepositoriesInSearch(this.currentContent, cursor, type);
    this.isSpinning = false;
    if (res) {
      this.data = res.nodes;
      this.paginationLeft = res.pageInfo.hasPreviousPage;
      this.paginationRight = res.pageInfo.hasNextPage;
      this.startCursor =  res.pageInfo.startCursor;
      this.endCursor = res.pageInfo.endCursor;
    }
  }

  clear() {
    this.content = null;
    this.data = [];
  }

  changePage(isLeft: boolean) {
    window.scrollTo(0 , 0);
    if (isLeft) {
      this.search(this.currentContent, 'previous', this.startCursor);
    } else {
      this.search(this.currentContent, 'next', this.endCursor);
    }
  }
}
