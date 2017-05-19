import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

var moment = require('moment');

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    back() {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('create', { replace: true, trigger: true });
        // this.router.navigateToRoute('list');
    }

    save() {
        this.service.create(this.data)
            .then(result => {
                this.back();
            })
            .catch(e => {
                this.error = e;
            })
    }
}