import { returntypeof } from 'react-redux-typescript';

const CACHED_RESPONSE: IFixerServiceResponse = {
  base: 'PLN',
  date: new Date().toISOString(),
  rates: { 'PLN': 1, 'SEK': 2.1919 },
};

// State
export type State = {
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly lastUpdated: number | null;
  readonly base: string;
  readonly rates: any;
  readonly date: string;
};
export const initialState: State = {
  isLoading: false,
  error: null,
  lastUpdated: null,
  base: CACHED_RESPONSE.base,
  rates: CACHED_RESPONSE.rates,
  date: CACHED_RESPONSE.date,
};

// Action Creators
export const LOAD_CURRENCY_RATES = 'currencyRates/LOAD_CURRENCY_RATES';
export const loadCurrencyRates = () => ({
  type: LOAD_CURRENCY_RATES as typeof LOAD_CURRENCY_RATES,
});


export const LOAD_CURRENCY_RATES_SUCCESS = 'currencyRates/LOAD_CURRENCY_RATES_SUCCESS';
export const loadCurrencyRatesSuccess = (payload: IFixerServiceResponse) => ({
  type: LOAD_CURRENCY_RATES_SUCCESS as typeof LOAD_CURRENCY_RATES_SUCCESS,
  payload,
});

export const LOAD_CURRENCY_RATES_ERROR = 'currencyRates/LOAD_CURRENCY_RATES_ERROR';
export const loadCurrencyRatesError = (payload: string) => ({
  type: LOAD_CURRENCY_RATES_ERROR as typeof LOAD_CURRENCY_RATES_ERROR,
  payload,
});

// Action Types
const ActionTypes = {
  loadCurrencyRates: returntypeof(loadCurrencyRates),
  loadCurrencyRatesSuccess: returntypeof(loadCurrencyRatesSuccess),
  loadCurrencyRatesError: returntypeof(loadCurrencyRatesError),
};
type Action = typeof ActionTypes[keyof typeof ActionTypes];

// Reducer
export default function reducer(state: State = initialState, action: Action): State {
  let partialState: Partial<State> | undefined;

  switch (action.type) {
    case LOAD_CURRENCY_RATES:
      partialState = {
        isLoading: true, error: null,
      };
      break;
    case LOAD_CURRENCY_RATES_SUCCESS:
      const { base, rates, date } = action.payload;
      partialState = {
        isLoading: false, lastUpdated: Date.now(), base, rates, date,
      };
      break;
    case LOAD_CURRENCY_RATES_ERROR:
      partialState = {
        isLoading: false, error: action.payload,
      };
      break;

    default: return state;
  }

  return { ...state, ...partialState };
}
