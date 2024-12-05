export class AnalysisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AnalysisError';
  }
}

export const handleAnalysisError = (error: unknown): string => {
  if (error instanceof AnalysisError) {
    return error.message;
  }
  if (error instanceof Error) {
    return `An error occurred while analyzing the data: ${error.message}`;
  }
  return 'An unexpected error occurred while analyzing the data';
};