import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RestService} from '../rest-service';
import {Session} from './session';

@inject(HttpClient, EventAggregator)
export class SecureService extends RestService {
    constructor(http, aggregator) {
        super(http, aggregator);
        this.session = new Session();
        this.header = {
            "Authorization": `JWT ${this.session.token}`
        };
    }
}