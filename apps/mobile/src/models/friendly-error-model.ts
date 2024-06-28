export class FriendlyError {
  constructor(
    error: any,
    displayMessage: string = "Error in performing requested action"
  ) {
    this.error = error;
    this.displayMessage = displayMessage;
  }
  error: any;
  displayMessage: string;
}
