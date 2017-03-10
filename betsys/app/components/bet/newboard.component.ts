import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common'
import { Router } from '@angular/router';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { htmlTemplate } from './newboard.component.html';
import { BetService } 	from 'app/services/bet.service';

import { ObjectToArrayTransform, ReturnTextColorRelativeToBackground }  from 'app/pipes/bet.pipes';
 
@Component({
    selector : 'relative-path',
    template : htmlTemplate
})

export class NewBoardComponent {
	
    	components = [];
      componentsLen = 0;
      componentsAssoc = {};

      objectToArrayPipe = new ObjectToArrayTransform();
      returnTextColorRelativeToBackground = new ReturnTextColorRelativeToBackground();

    	pageMeta = {
        "colorDefaults": ['#BE0032', '#222222', '#4FF773', '#FFFF00', '#A1CAF1', '#C2B280',
                          '#E68FAC', '#F99379', '#F38400', '#848482', '#008856', '#0067A5', '#604E97',
                          '#B3446C', '#654522', '#EA2819'],
    		"colorSection": {
                          "title": "Create New Custom Board:",

    		                  "subtitle": "Click on the component box to choose the colors for the components you want to use. Once you are done click the save button. If you do not want to choose custom colors, click Auto-Select and save.",
                          
                          "buttons": [{
                                  "key": "auto-select",
                                  "label": "Äuto-Select"
                                }, {
                                  "key": "reset",
                                  "label": "Reset"    
                                }, {
                                  "key": "save",
                                  "label": "Save"
                          }]
                        },
          "dragDropSection": {
                          "title": "Drag and drop components to blank boxes below. You may leave boxes blank.",

                          "subtitle": "",

                           "buttons": [{
                                  "key": "reset",
                                  "label": "Reset"
                                }]
                        },
           "blankBoardSection": {
                          "title": "",
                          
                          "subtitle": "",

                          "buttons": [{
                                  "key": "reset",
                                  "label": "Reset"
                                }, {
                                  "key": "save",
                                  "label": "Save"
                            }]
           }                                   
    	};

    	error: any;

      constructor(
          private router:Router,
          private betService: BetService
      ) {

      	this.getComponentsList();
      }

      getComponentsList() {
        var _this = this;

      	this.betService
        		.getComponents()
        		.then(function(response) {
              _this.components = _this.objectToArrayPipe.transform(response.components);

              _this.componentsLen = _this.components.length;

              _this.addComponentMetadata();

              _this.generateComponentAssoc();

            })
        		.catch(error => this.error = error);
      }

      addComponentMetadata() {

        for(var i = 0; i < this.componentsLen; i++) {
            var curComp = this.components[i];

            this.setComponentDefaults(curComp, i);                
        }

      }


      generateComponentAssoc() {
        for(var i = 0; i < this.componentsLen; i++) {
          var curComp =  this.components[i];
          var curCompKey =  curComp['key'];
          this.componentsAssoc[curCompKey] = curComp;
        }
      } 

     setComponentDefaults(curComp, index) {
          curComp['bgColor'] = '#FFFFFF';
          curComp['textColor'] = '#000000';
          curComp['sectionIndex'] = 0;
          curComp['boardIndex'] =  'c' + index;
          curComp['componentIndex'] = index;
     }

     colorSectionAction(type) {
          switch(type) {
            case "auto-select": this.applyAutoSelectColors(); break;
            //Need to group the resets of selectColor, dragDrop and blankBoard
            case "reset": this.applySelectColorReset(); break; 
            case "save": this.applySelectColorSave(); break;
            default: break;
          }
     }

     applyAutoSelectColors() {
          var autoColorsAryLen = this.pageMeta.colorDefaults.length;
          for(var i = 0; i < this.componentsLen; i++) {
            var curComp = this.components[i];

            //Apply auto-select only for the components in select color section
            if(curComp['sectionIndex'] === 0) {
              var defaultColorIndex = i % autoColorsAryLen;
              curComp['bgColor'] = this.pageMeta.colorDefaults[defaultColorIndex];
              curComp['textColor'] = this.returnTextColorRelativeToBackground.transform(curComp['bgColor']);
            }
          
          }   
     }

     applySelectColorReset() {
        for(var i = 0; i < this.componentsLen; i++) {
            var curComp = this.components[i];

            //Apply reset to default colors
            if(curComp['sectionIndex'] === 0) {
              curComp['bgColor'] = '#FFFFFF';
              curComp['textColor'] = '#000000';
            }
        }    
     }

     applySelectColorSave() {
        for(var i = 0; i < this.componentsLen; i++) {
            var curComp = this.components[i];

            //Make the components draggable if their background color is changed(i.e.., not the default #FFFFFF)
            if(curComp['sectionIndex'] === 0) {
                if(curComp['bgColor'] !== "#FFFFFF") {
                  curComp['sectionIndex'] = 1;    
                }
            }
        }    
     }

     dragDropSectionAction(type) {
        switch(type) {
          case "reset": this.dragDropSectionReset(); break;
          default: break;
        }
     }

     dragDropSectionReset() {
        for(var i = 0; i < this.componentsLen; i++) {
            var curComp = this.components[i];

            //Move the components back to choose color section
            if(curComp['sectionIndex'] === 1) { 
                  curComp['sectionIndex'] = 0;    
            }
        }
     }
}