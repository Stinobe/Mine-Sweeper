export enum GameEvent {
  "TOGGLE_STATE",
  "OPEN_MINE"
};

class GameEvents {
  private static listeners: { name: GameEvent, cb: ((props?: any) => void)[] }[] = [];

  private static findEventIndex(name: GameEvent): number {
    return this.listeners.findIndex(lstnr => lstnr.name === name);
  }

  private static eventDoesExist(name: GameEvent): boolean {
    return this.findEventIndex(name) > -1;
  }

  private static registerEventName(name: GameEvent): number {
    if (!this.eventDoesExist(name)) this.listeners.push({ name, cb: [] });
    return this.findEventIndex(name);
  }

  private static addListenerToEvent(index: number, cb: (props?: any) => void): void {
    if (!this.listeners[index].cb.includes(cb)) this.listeners[index].cb.push(cb);
  }

  public static subscribe(name: GameEvent, cb: (props?: any) => void): void {
    const index = this.registerEventName(name);
    this.addListenerToEvent(index, cb);
  }

  public static trigger(name: GameEvent, props?: any) {
    if(this.eventDoesExist(name)){
      const index = this.findEventIndex(name);
      this.listeners[index].cb.forEach(cb => {
        cb(props);
      });
    }
  }
}

export default GameEvents;