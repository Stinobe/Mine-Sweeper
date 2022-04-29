interface Idebounce {
  delay: number;
  timeout?: ReturnType<typeof setTimeout>;
  callback: () => void;
  debouncer: () => void;
}

export const Debounce = function(this: Idebounce, cb: () => void, delay: number = 250): () => void {
  this.delay = delay;
  this.callback = cb;
  this.timeout = this.timeout || undefined;
  this.debouncer = () => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(this.callback, this.delay);
  }
  return this.debouncer.bind(this);
} as any as { new (cb: () => void, delay?: number): () => void};