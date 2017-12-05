import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { BucketService } from '../services/bucket.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { Bucket } from '../models/bucket';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users = null;
  bucket = new Bucket();
  buckets = null;
  taggedBuckets = null;
  loggedUser = null;
  loggedUserName = '';
  taggedUser = null;
  updateState = '';
  updatedBucketId = null;
  addedBucket;

  constructor(
    private _authService: AuthService,
    private _bucketService: BucketService,
    private _cookies: CookieService,
    private _router: Router
  ) { }

  ngOnInit() {
    // Get the loggedId userId and Name
    this.loggedUser = this._cookies.get('userId')
    this.loggedUserName = this._cookies.get('name')

    // Get all the users
    this._authService.getAllUsers()
    .then(users => {
      this.users = users
    })

    // Get the logged in user list
    this._bucketService.getActiveUserList(this.loggedUser)
    .then(buckets => {
      this.buckets = buckets
    })

    // Get the logged in user Tagged bucket
    this._bucketService.loggedUserTaggedBucket(this.loggedUser)
    .then(buckets => {
      this.taggedBuckets = buckets
    })

    
  }

  create(){
    if (this.taggedUser != null){
      if (this.taggedUser == 'Select a user:' || this.taggedUser == this.loggedUser) {
        this.bucket.user = this.loggedUser
        this._bucketService.create(this.bucket)
        .then(bucket => {
          this.addedBucket = bucket
        })
      }
      else {
        this.bucket.user = this.loggedUser;
        this.bucket.taggedUser = this.taggedUser;
        this._bucketService.create(this.bucket)
        .then(bucket => {
          this.addedBucket = bucket
        })
      }
    }
    else if (this.taggedUser == null) {
      this.bucket.user = this.loggedUser
      this._bucketService.create(this.bucket)
      .then(bucket => {
        this.addedBucket = bucket
      })
    }

    this.bucket = new Bucket();
    this.taggedUser = null;
    
  }

  updateListing(bucketId){
    let updateConfirmation = confirm('Click ok to confirm that this goal has been completed \n(Change is final)');
    
    if (updateConfirmation == true){
      this.bucket.status = 1;
      this._bucketService.update(this.bucket, bucketId)
      .then((updatedBucket) => {
        this.updatedBucketId = updatedBucket._id
        this.updateState = 'Completed'
      })
    }
    
  }

  logout(){
    this._authService.logout()
    .then(() => {
      this._router.navigate([''])
    })
  }

}
