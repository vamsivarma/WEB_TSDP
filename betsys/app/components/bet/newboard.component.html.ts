export const htmlTemplate = `
<body>
  <common-header>Loading...</common-header>

  <!--Body of page-->
  <div class="container newboard-container">
    <div class="bet-info-pane">
      <div class="new-board-subtitle-common clear-both-common">
        {{pageMeta.title}}
      </div>
      <div class="new-board-subtitle-common clear-both-common">
        {{pageMeta.titleDescription}}
      </div>
      <div class="component-boxes-holder clear-both-common">
        <div class="component-box-holder left-float-common" 
            *ngFor="let component of (components | objectToArrayTransform)">           
          {{component.key}}
        </div>
       </div>        
    </div>
    <div class="betting-box newboard-betting-box"></div>
  </div>
</body>
`;