import { NgModule }      				from '@angular/core';
import { RouterModule, Routes }			from '@angular/router';

import { AppComponent }   				from './components/app.component';
import { BetComponent }   				from './components/bet/bet.component';

const appRoutes : Routes = [
	{ path : '', 		component : BetComponent},
	{ path : 'bet', 	component : BetComponent},
];

@NgModule({
  	imports:  [
		RouterModule.forRoot(appRoutes)
	],
    exports : [
        RouterModule
    ]
})

export class AppRouterModule {}
