
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

const storageKeyPrefix = "QUIZ";
@Injectable({
  providedIn: 'root',
})
export class SessionStorageService extends StorageService {
  public constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    super(document.defaultView?.sessionStorage!, storageKeyPrefix);
  }
}
