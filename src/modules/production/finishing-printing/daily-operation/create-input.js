import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class CreateInput {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() {
        this.data.type = "input";
        this.service.create(this.data)
            .then(result => {
                this.data = {};
                this.error={};
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create-input',{replace:true, trigger:true});
                // this.list();
            })
            .catch(e => {
                this.error = e;
            })
    }
}