export function isYooptaBlock(block: any): boolean {
  return !!block && !!block.id && !!block.type && !!block.value && !!block.meta;
}
