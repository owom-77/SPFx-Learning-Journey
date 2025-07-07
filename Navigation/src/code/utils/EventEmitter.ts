type Callback = (data?: any) => void;

class EventEmitter {
  private events: { [key: string]: Callback[] } = {};

  public on(event: string, callback: Callback): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  public off(event: string, callback: Callback): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  public emit(event: string, data?: any): void {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => cb(data));
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
