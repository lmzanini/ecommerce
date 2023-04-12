import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'chunkBy' })
export class ChunkByPipe implements PipeTransform {
  transform(arr: any[], size: number): any[] {
    return arr.reduce((chunks, el, i) => {
      const index = Math.floor(i / size);
      if (!chunks[index]) {
        chunks[index] = [];
      }
      chunks[index].push(el);
      return chunks;
    }, []);
  }
}
