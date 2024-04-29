import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webRequestService: WebRequestService) { }

  //Use webRequestService to implement methods similar to the ones in task.service.ts
}
