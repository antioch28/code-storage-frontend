import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../environments/environment";

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  api_url = environment.api_url;

  transform(value: string) {
    if (value === ''){
      return '../../../../assets/img/avatar.png';
    } else {
      return `${this.api_url}/uploads/${value}`;
    }
    
  }

}
