import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { CommunityService } from './models/communityService';
import { CreateCommunityServiceRequest } from './models/community-service-request';

@Injectable({
  providedIn: 'root',
})
export class CommunityServices {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  create(request: CreateCommunityServiceRequest): Observable<CommunityService> {
    return this.http.post<CommunityService>(`${this.apiUrl}/community-services`, request);
  }
}
