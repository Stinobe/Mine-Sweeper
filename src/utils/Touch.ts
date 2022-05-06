class TouchEvent<T> {
  private delay: number;
  private isBusy: boolean = false;
  private cbHold: () => void;
  private cbClick: () => void;
  private timeout?: ReturnType<typeof setTimeout>;
  private timestamp?: number;

  constructor(click: () => void, hold: () => void, delay: number = 500) {
    this.delay = delay;
    this.cbClick = click;
    this.cbHold = hold;
  }

  private startEvent(e: T): void {
    if (this.isBusy || this.timestamp) return;
    this.timestamp = (new Date()).getTime();
    this.isBusy = true;
    this.timeout = setTimeout(() => {
      this.isBusy = false;
      this.cbHold();
      navigator.vibrate(200);
    }, this.delay);
  }
  
  private endEvent(e: T) {
    if (!this.isBusy || !this.timestamp) return;
    if(this.timeout) clearTimeout(this.timeout);
    this.isBusy = false;
    this.cbClick();
    setTimeout(() => {
      this.timestamp = undefined;
    }, this.delay);
  }

  private clickEvent() {
    if (this.timestamp) return false;
    this.cbClick();
  }

  private contextClick() {
    if (this.timestamp) return false;
    this.cbHold();
  }

  public start = this.startEvent.bind(this);
  public end = this.endEvent.bind(this);
  public click = this.clickEvent.bind(this);
  public context = this.contextClick.bind(this);
}

export default TouchEvent;