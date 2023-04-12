import { ChunkByPipe } from './chunk-by.pipe';

describe('ChunkByPipe', () => {
  it('create an instance', () => {
    const pipe = new ChunkByPipe();
    expect(pipe).toBeTruthy();
  });
});
