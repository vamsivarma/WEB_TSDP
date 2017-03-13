export const htmlTemplate = `
<body>
  <common-header>Loading...</common-header>

  <!--Body of page-->
  <div class="container newboard-container">
    
    <!-- Select Color Section -->
    <div class="bet-info-pane color-section-holder section-holder-common" >

          <div class="section-buttons-holder clear-both-common">
              <div class="right-float-common">
                <div class="left-float-common">
                  <div class="section-button left-float-common" 
                      *ngFor="let buttonMeta of pageMeta.colorSection.buttons"
                      (click)="colorSectionAction(buttonMeta.key)">          
                        {{buttonMeta.label}}
                  </div>              
                </div>
              </div>
          </div>
      
          <div class="new-board-subtitle-common clear-both-common">
            {{pageMeta.colorSection.title}}
          </div>
      
          <div class="new-board-subtitle-common clear-both-common" innerHTML = "{{pageMeta.colorSection.subtitle}}">
          </div>
      
          <div class="component-boxes-holder clear-both-common">
            <template let-component ngFor [ngForOf]="components">
              <div class="component-box-holder left-float-common"
                  *ngIf="component.sectionIndex === 0"
                  [style.backgroundColor]="component.bgColor"
                  [style.color]="component.textColor" 
                  (click)="openColorPicker(component, $event)" >           
                {{component.key}}
                <input class="color-input" type="color" value="{{component.bgColor}}" (change)="updateComponentStyles(component)" />
              </div>
            </template>
          </div>  
      
    </div>

    <!-- Drag Drop Section -->
    <div class="bet-info-pane color-section-holder section-holder-common" >

      <div class="section-buttons-holder clear-both-common">
              <div class="right-float-common">
                <div class="left-float-common">
                  <div class="section-button left-float-common" 
                      *ngFor="let buttonMeta of pageMeta.dragDropSection.buttons"
                      (click)="dragDropSectionAction(buttonMeta.key)">         
                        {{buttonMeta.label}}
                  </div>              
                </div>
              </div>
      </div>
      
      <div class="new-board-subtitle-common clear-both-common"  innerHTML = "{{pageMeta.dragDropSection.title}}">
      </div>
      
      <div class="component-boxes-holder clear-both-common">
        <template let-component ngFor [ngForOf]="components">
          <div class="component-box-holder left-float-common"  
              *ngIf="component.sectionIndex === 1"
              [style.backgroundColor]="component.bgColor"
              [style.color]="component.textColor"
              dnd-draggable 
              [dragData]="component" 
              [dragEnabled]="true"
              ng-reflect-draggable="true"
              [dropZones]="['drop-cell', 'cond-cell']" >      <!-- Make this draggable -->     
            {{component.key}}
          </div>
        </template>
       </div>        
    </div>

    <!-- Blank board section -->
    <div class="bet-info-pane blank-board-section-holder  section-holder-common" >
        
        <div class="section-buttons-holder clear-both-common">
              <div class="right-float-common">
                <div class="left-float-common">
                  <div class="section-button left-float-common" 
                      *ngFor="let button of pageMeta.blankBoardSection.buttons">  <!-- Make this clickable -->         
                        {{button.label}}
                  </div>              
                </div>
              </div>
        </div>

        <div class="blank-board-holder">
            <div class="bet-table-left-pane">
                <div class="bet-table-left-panel" style="border-right: 66px solid rgb(34, 88, 35);">
                  <div style="margin-right: 5px; padding-top: 145px; padding-left: 14px; margin-top: -62px; color: rgb(255, 255, 255); font-family: bold; font-size: 24px; font-weight: bold;">
                Off
                  </div>  
                </div>
            </div>
            <div class="bet-new-table-col-common bet-table-col{{col % 2}}" 
                  *ngFor="let col of cols; let idCol=index;">
            </div>

            <!--right pane 1-->
            <div class="bet-table-right-pane">
                <div class="pane-cell"  
                  *ngFor="let item of condCells[2]; let id=index;" 
                  [style.background-color] = "item.bgColor"
                  dnd-droppable>
                    <div class="pane-cell-caption" [style.color]="item.color">
                      <div 
                        style="display: table-cell; vertical-align: middle;"
                        [style.font-size.px] = "betCellCommonStyles.tsize"
                        [style.font-weight] = "betCellCommonStyles.tstyle"
                        [style.font-family] = "betCellCommonStyles.font">
                      {{item.text}}
                      </div>
                    </div>
                </div>  
            </div>

            <!--right pane 2-->
            <div class="bet-table-right-pane">
                <div class="pane-cell"  
                  *ngFor="let item of condCells[3]; let id=index;" 
                  [style.background-color] = "item.bgColor"
                  dnd-droppable>
                    <div class="pane-cell-caption" [style.color]="item.color">
                      <div 
                        style="display: table-cell; vertical-align: middle;"
                        [style.font-size.px] = "betCellCommonStyles.tsize"
                        [style.font-weight] = "betCellCommonStyles.tstyle"
                        [style.font-family] = "betCellCommonStyles.font">
                      {{item.text}}
                      </div>
                    </div>
                </div>
            </div>

            <!--Bottom Pane-->
            <div class="bet-table-bottom-section">
                <div class="bet-table-bottom-pane">
                  <div class="bottom-cell"  
                    *ngFor="let item of condCells[1]; let id=index;" 
                    [style.background-color] = "item.bgColor"
                    dnd-droppable>
                      <div class="pane-cell-caption" [style.color]="item.color">
                        <div 
                          style="display: table-cell; vertical-align: middle;"
                          [style.font-size.px] = "betCellCommonStyles.tsize"
                          [style.font-weight] = "betCellCommonStyles.tstyle"
                          [style.font-family] = "betCellCommonStyles.font">
                        {{item.text}}
                        </div>
                      </div>
                  </div>
                 </div> 
            </div>

            <!--pane for risk-->
            <div class="bet-risk">
              <div
                class="bet-risk-cell-{{id % 2}}"
                *ngFor="let item of condCells[0]; let id=index;" 
                [style.backgroundColor] = "item.bgColor"
                dnd-droppable 
              >
                <div class="risk-cell-caption">
                  <div 
                    style="display: table-cell; vertical-align: middle;"
                    [style.fontSize.px] = "betCellCommonStyles.tsize"
                    [style.fontWeight] = "betCellCommonStyles.tstyle"
                    [style.fontFamily] = "betCellCommonStyles.font"
                    >
                  {{item.text}}
                  </div>
                </div>
              </div>
            </div>  

        </div>      
    </div>
  </div>
</body>
`;