type SearchResults = 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 100

export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  results: SearchResults
}
