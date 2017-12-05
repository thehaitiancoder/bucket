import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BucketService } from '../services/bucket.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users = null;
  userClickedId = null;
  userClickedName = '';
  buckets = null;
  taggedBuckets = null;

  constructor(
    private _route: ActivatedRoute,
    private _bucketService: BucketService,
    private _authService: AuthService,
    private _router: Router
  ) {
    // Get the id of the user being viewed
    this._route.paramMap.subscribe(params => {this.userClickedId = params.get('id')})
  }

  ngOnInit() {
    // Get the user being viewed list
    this._bucketService.getActiveUserList(this.userClickedId)
    .then(buckets => {
      this.buckets = buckets;
      this.userClickedName = buckets[0].user.name;
    })

    // Get the logged in user Tagged bucket
    this._bucketService.loggedUserTaggedBucket(this.userClickedId)
    .then(buckets => {
      this.taggedBuckets = buckets
    })
  }

  logout(){
    this._authService.logout()
    .then(() => {
      this._router.navigate([''])
    })
  }

}
