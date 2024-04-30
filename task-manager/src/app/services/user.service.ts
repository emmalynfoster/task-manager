import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webRequestService: WebRequestService) { }

  getUser(name: string) {
    return this.webRequestService.get('users/' + name);
  }

  getUserPref(name: string) {
    return this.webRequestService.get('preference/' + name)
  }

  createUser(name: string, dark_mode: number) {
    return this.webRequestService.post('users', {name, dark_mode});
  }

  setUserPref(name: string, dark_mode: number) {
    return this.webRequestService.put('users/' + name, {dark_mode});
  }
}
