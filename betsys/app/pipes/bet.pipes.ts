import { Pipe, PipeTransform } from '@angular/core';

/*
 * Takes an object and returns an array
*/
@Pipe({name: 'objectToArrayTransform'})
export class ObjectToArrayTransform implements PipeTransform {
  
  transform(value, args:string[]) : any {
    let keys = [];
    
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    
    return keys;
  }

}

/*
 * Takes an background color in hexadecimal format and returns its corresponding text color (#000 or #FFF) based on the 
 * background contrast
*/
@Pipe({name: 'returnTextColorRelativeToBackground'})
export class ReturnTextColorRelativeToBackground implements PipeTransform {
  
  transform(value, args:string) : any {
    
    var rgbObj = this.hexToRgb(value);
   	var contrastValue = rgbObj.r * 0.299 + rgbObj.g * 0.587 + rgbObj.b * 0.114;
   	var textColor = "#FFFFFF";

	if (contrastValue > 186) {
		textColor = "#000000";
	}
	
	return textColor;
  }

  rgbToHex(r, g, b) {
    	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  hexToRgb(hex) {
    	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        	return r + r + g + g + b + b;
    	});

    	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    	
    	return result ? {
        	r: parseInt(result[1], 16),
        	g: parseInt(result[2], 16),
        	b: parseInt(result[3], 16)
    	} : null;
	}

}
