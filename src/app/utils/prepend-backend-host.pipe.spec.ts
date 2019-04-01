import { PrependBackendHostPipe } from './prepend-backend-host.pipe';

describe('PrependBackendHostPipe', () => {
  it('create an instance', () => {
    const pipe = new PrependBackendHostPipe();
    expect(pipe).toBeTruthy();
  });
});
