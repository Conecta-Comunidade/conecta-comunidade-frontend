interface ErrorDTOResponse {
  status: number;
  message: string;
  fieldErrors: {
    field: number;
    message: string;
  }[];
}
