import { Injectable } from '@angular/core';

import { uuid } from './uuid.create';

@Injectable()
export class UuidService {
  getId() { return uuid; }
}
