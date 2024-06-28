export class FriendlyError {
  constructor(
    error: any,
    displayMessage: string = "Error in performing requestd action"
  ) {
    this.error = error;
    this.displayMessage = displayMessage;
  }
  error: any;
  displayMessage: string;
}
