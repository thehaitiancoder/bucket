import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Bucket } from '../models/bucket';

@Injectable()
export class BucketService {

  base = '/api/bucket'

  constructor(
    private _http: Http
  ) { }

  getAll(): Promise<Bucket>{
    return this._http.get(this.base)
    .map(response => response.json())
    .toPromise()
  }

  getActiveUserList(activeUserId){
    return this._http.get(this.base+'/user/'+activeUserId)
    .map(response => response.json())
    .toPromise()
  }

  loggedUserTaggedBucket(activeUserId){
    return this._http.get(this.base+'/loggedUserTaggedBucket/'+activeUserId)
    .map(response => response.json())
    .toPromise()
  }

  create(bucket: Bucket): Promise<Bucket>{
    return this._http.post(this.base, bucket)
    .map(response => response.json())
    .toPromise()
  }

  update(bucket: Bucket, bucketId){
    return this._http.put(this.base+'/'+bucketId, bucket)
    .map(response => response.json())
    .toPromise()
  }
}
