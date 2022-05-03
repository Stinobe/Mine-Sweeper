class TouchEvent<T> {
  private delay: number;
  private isBusy: boolean = false;
  private cbHold: () => void;
  private cbClick: () => void;
  private timeout?: ReturnType<typeof setTimeout>;

  constructor(click: () => void, hold: () => void, delay: number = 500) {
    this.delay = delay;
    this.cbClick = click;
    this.cbHold = hold;
  }

  private startEvent(e: T): void {
    if (this.isBusy) return;
    this.timeout = setTimeout(() => {
      this.isBusy = true;
      this.cbHold();
    }, this.delay);
  }
  
  private endEvent(e: T) {
    if (!this.isBusy) return;
    if(this.timeout) clearTimeout(this.timeout);
    this.isBusy = false;
    this.cbClick();
  }

  public start = this.startEvent.bind(this);
  public end = this.endEvent.bind(this);
}

export default TouchEvent;