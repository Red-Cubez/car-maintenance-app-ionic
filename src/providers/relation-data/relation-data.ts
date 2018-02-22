import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the RelationDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RelationDataProvider {
newRelationData;
  constructor(public storage: Storage) {
    console.log('Hello RelationDataProvider Provider');
  }
  getdata(){
    return this.storage.get('relationData');
  }

  save(items){
    this.newRelationData = JSON.stringify(items);
    this.storage.set('relationData', this.newRelationData);
    console.log('this is Relation data' , items);
  }

}
