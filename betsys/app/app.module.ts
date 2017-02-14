import { NgModule }      						from '@angular/core';
import { BrowserModule } 						from '@angular/platform-browser';
import { HttpModule, Http}            			from '@angular/http';
import { FormsModule }							from '@angular/forms';
import { DndModule } 							from 'ng2-dnd';
import { Ng2Bs3ModalModule } 					from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent }   						from './components/app.component';
import { AppRouterModule }						from './app-router.module';
import { BetComponent } 					  	from './components/bet/bet.component';

@NgModule({
  	imports:      [
					BrowserModule,
					FormsModule,
					AppRouterModule,
        			HttpModule,
					DndModule.forRoot(),
					Ng2Bs3ModalModule,
		],
  	declarations: [
	  				AppComponent,
        			BetComponent
  		],
  	bootstrap:    [ AppComponent ]
})

export class AppModule {}
