export class HttpException extends Error {
  public response: {
    status: number;
    data: {
      message: string;
    };
  };

  constructor(status: number, message: string) {
    super(message);
    this.response = {
      status,
      data: {
        message,
      },
    };
  }
}
