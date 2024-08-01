import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {  ClientService } from './client.service';
import { Client } from './client.interface';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService],
    });

    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch clients', () => {
    const dummyClients: Client[] = [
      {
        sharedKey: 'key1',
        businessId: 'id1',
        email: 'test1@example.com',
        phone: '1234567890',
        dateAdded: '2024-07-31',
      },
      {
        sharedKey: 'key2',
        businessId: 'id2',
        email: 'test2@example.com',
        phone: '0987654321',
        dateAdded: '2024-07-31',
      },
    ];

    service.getClients().subscribe((clients) => {
      expect(clients.length).toBe(2);
      expect(clients).toEqual(dummyClients);
    });

    const req = httpMock.expectOne('http://localhost:8080/clients');
    expect(req.request.method).toBe('GET');
    req.flush(dummyClients);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
