import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common'
import { Router } from '@angular/router';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { htmlTemplate } from './newboard.component.html';
import { BetService } 	from 'app/services/bet.service';

 
@Component({
    selector : 'relative-path',
    template : htmlTemplate
})

export class NewBoardComponent {
	
	components = {};

	pageMeta = {
		"title": "Create New Custom Board:",
		"titleDescription": "Click on the component box to choose the colors for the components you want to use. Once you are done click the save button. If you do not want to choose custom colors, click Auto-Select and save."
	};

	error: any;

    constructor(
        private router:Router,
        private betService: BetService
    ) {

    	this.getComponentsList();
    }

    getComponentsList() {
    	this.betService
      		.getComponents()
      		.then(response => this.components = response.components)
      		.catch(error => this.error = error);
    }
}