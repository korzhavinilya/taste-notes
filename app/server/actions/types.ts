type ServerActionSuccessReturnType = {
  status: 'success';
  message: string;
};

type ServerActionFailureReturnType = {
  status: 'error';
  message: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
};

export type ServerActionReturnType =
  | ServerActionSuccessReturnType
  | ServerActionFailureReturnType
  | null;
