import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webRequestService: WebRequestService) { }


  getUserByName(name: string) {
    return this.webRequestService.get('users/'+name)
  }

  getPreferenceByName(name: string) {
    return this.webRequestService.get('preference/'+name)
  }
  
  createNewUser(name: string, dark_mode: number){
    return this.webRequestService.post('users', {name, dark_mode});
  }
  //Use webRequestService to implement methods similar to the ones in task.service.ts
}

