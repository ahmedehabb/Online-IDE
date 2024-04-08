// compile.service.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CompileService } from './compile.service';

describe('CompileService', () => {
  let service: CompileService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompileService],
    });
    service = TestBed.inject(CompileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a post request and return expected data', () => {
    const mockResponse = { output: 'Mocked output for code' };
    const testCode = 'function test() { console.log("test"); }';

    service.compileCode(testCode).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Expect a request with the correct URL and method
    const req = httpTestingController.expectOne('/api/compile');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ code: testCode });

    // Respond with mock data
    req.flush(mockResponse);
  });
});
