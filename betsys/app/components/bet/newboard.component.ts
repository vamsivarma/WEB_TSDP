import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common'
import { Router } from '@angular/router';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { htmlTemplate } from './newboard.component.html';

 
@Component({
    selector : 'relative-path',
    template : htmlTemplate
})

export class NewBoardComponent {
    constructor(
        private router:Router
    ){}
}