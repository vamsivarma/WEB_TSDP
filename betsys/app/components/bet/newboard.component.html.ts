export const htmlTemplate = `
<body>
  <common-header>Loading...</common-header>

  <!--Body of page-->
  <div class="container newboard-container">
    
    <!-- Select Color Section -->
    <div class="bet-info-pane color-section-holder section-holder-common">

          <div class="section-buttons-holder clear-both-common">
              <div class="right-float-common">
                <div class="left-float-common">
                  <div class="section-button left-float-common" 
                      *ngFor="let button of pageMeta.colorSection.buttons">  <!-- Make this clickable -->         
                        {{button.label}}
                  </div>              
                </div>
              </div>
          </div>
      
          <div class="new-board-subtitle-common clear-both-common">
            {{pageMeta.colorSection.title}}
          </div>
      
          <div class="new-board-subtitle-common clear-both-common">
            {{pageMeta.colorSection.subtitle}}
          </div>
      
          <div class="component-boxes-holder clear-both-common">
            <template let-component ngFor [ngForOf]="components">
              <div class="component-box-holder left-float-common"
                  *ngIf="component.sectionIndex === 0"
                  [style.backgroundColor]="component.bgColor"
                  [style.color]="component.textColor">  <!-- Make this clickable -->         
                {{component.key}}
              </div>
            </template>
          </div>  
      
    </div>

    <!-- Drag Drop Section -->
    <div class="bet-info-pane color-section-holder section-holder-common">

      <div class="section-buttons-holder clear-both-common">
              <div class="right-float-common">
                <div class="left-float-common">
                  <div class="section-button left-float-common" 
                      *ngFor="let button of pageMeta.dragDropSection.buttons">  <!-- Make this clickable -->         
                        {{button.label}}
                  </div>              
                </div>
              </div>
      </div>
      
      <div class="new-board-subtitle-common clear-both-common">
        {{pageMeta.dragDropSection.title}}
      </div>
      
      <div class="component-boxes-holder clear-both-common">
        <template let-component ngFor [ngForOf]="components">
          <div class="component-box-holder left-float-common"  
              *ngIf="component.sectionIndex === 1"
              [style.backgroundColor]="component.bgColor"
              [style.color]="component.textColor">      <!-- Make this draggable -->     
            {{component.key}}
          </div>
        </template>
       </div>        
    </div>

    <!-- Blank board section -->
    <div class="betting-box blank-board-section-holder  section-holder-common">
        
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
        </div>

    </div>

  </div>
</body>
`;