import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../../service/apollo.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isSpinning = false;
  data = null;
  infos = [
    {type: 'email', icon: 'mail'},{type: 'websiteUrl', icon: 'link'},
    {type: 'companyHTML', icon: 'team'},{type: 'bioHTML', icon: 'idcard'},
    {type: 'location', icon: 'environment'},{type: 'createdAt', icon: 'user-add'},
  ];
  constructor(private apolloService: ApolloService, private userService: UserService) { }

  ngOnInit() {
    this.userService.isLoginSubject().subscribe((value) => {
      if (value) {
        this.queryUserInfo();
      } else {
        this.data = null;
      }
    })
  }

  async queryUserInfo() {
    this.isSpinning = true;
    let res = await this.apolloService.queryUserInfo();
    this.isSpinning = false;
    if (res) {
      res = Object.assign({}, res);
      res.createdAt = res.createdAt && res.createdAt.replace('T', " ").replace('Z', " ");
      res.email = res.email && `<a href="mailto:${res.email}">${res.email}</a>`
      this.data = res;
    }
  }

  getDataInfo(type: string) {
    return this.data[type];
  }
}
