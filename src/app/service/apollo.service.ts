import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpHeaders } from '@angular/common/http';
import gql from 'graphql-tag';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(private apollo: Apollo, private httpLink: HttpLink, private userService: UserService) {}
  apolloCreate(): boolean {
    const accessToken = this.userService.accessToken();
    if (!accessToken) {
      return false;
    }
    this.apollo.create({
      link: this.httpLink.create({
        uri: 'https://api.github.com/graphql', 
        headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`),
      }),
      cache: new InMemoryCache(),
    });
    return true;
  }

  getApollo() {
    return this.apollo;
  }

  checkApolloClient() {
    const accessToken = this.userService.accessToken();
    if (!accessToken) {
      return false;
    }
    if (!this.apollo.getClient()) {
      return this.apolloCreate();
    }
    return true;
  }

  async apolloGraphQLQuery(query: string) {
    if (!this.checkApolloClient()) {
      return;
    }
    let res = null;
    try {
      res = await this.apollo.query({
        query: gql`${query}`,
        fetchPolicy: 'network-only'  
      }).toPromise();
    } catch (error) {
      const networkError = error.networkError;
      console.log(networkError);
      if (networkError.status == 401) {
        this.userService.logout();
      }
    }
    return res && res.data;
  }

  async queryRepositories() {
    const res = await this.apolloGraphQLQuery(`{viewer {
      repositories(last: 100, orderBy: {direction: DESC, field: UPDATED_AT}) {
        nodes {
          nameWithOwner, description,  isFork, updatedAt, pushedAt, url, forkCount,
          owner {
            login, avatarUrl,url
          },
          parent {
            url,
            forkCount,
            owner {
              login, avatarUrl,url
            },
          },
          primaryLanguage {
            color, name,
          }
        }
      }
    }}`);
    return res && res.viewer && res.viewer.repositories && res.viewer.repositories.nodes;
  }

  async queryUser() {
    const res = await this.apolloGraphQLQuery('{ viewer { name,avatarUrl,login,email }}');
    return res && res.viewer;
  }

  async queryRepositoriesInSearch(search: string, cursor: string, type: null | 'previous' | 'next' = null) {
    let combination = 'first: 10';
    if (type == 'previous') {
      combination = `last: 10, before: \"${cursor}\"`;
    } else if (type == 'next') {
      combination = `first: 10, after: \"${cursor}\"`;
    }
    const res = await this.apolloGraphQLQuery(`{
      search(${combination}, query: \"${search}\", type: REPOSITORY) {
        pageInfo {
          hasNextPage,hasPreviousPage,startCursor,endCursor,
        },
        nodes {
          ... on Repository {
            nameWithOwner, description,  isFork, updatedAt, pushedAt, url, forkCount,
            owner {
              login, avatarUrl,url
            },
            parent {
              url,forkCount,
              owner {
                login, avatarUrl,url
              },
            },
            primaryLanguage {
              color, name,
            }
          }
        }
      }
    }`);
    return res && res.search;
  }
}
