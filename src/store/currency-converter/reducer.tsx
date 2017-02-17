class ActionCreator<T, P> {
  readonly type: T;
  readonly payload: P;

  constructor(type: T) { this.type = type; }
  create = (payload: P) => ({ type: this.type, payload });
}

// State
export type State = {
  readonly baseCurrency: string;
  readonly targetCurrency: string;
  readonly baseValue: string;
  readonly targetValue: string;
};
export const initialState: State = {
  baseCurrency: 'PLN',
  targetCurrency: 'SEK',
  baseValue: '0',
  targetValue: '0',
};

// Action Creators
export const ActionCreators = {
  UpdateBaseCurrency: new ActionCreator<'UpdateBaseCurrency', string>('UpdateBaseCurrency'),
  UpdateBaseValue: new ActionCreator<'UpdateBaseValue', string>('UpdateBaseValue'),
};

// Action Types
type Action = typeof ActionCreators[keyof typeof ActionCreators];

// Reducer
export default function reducer(state: State = initialState, action: Action): State {
  let partialState: Partial<State> | undefined;

  if (action.type === ActionCreators.UpdateBaseCurrency.type) {
    partialState = { baseCurrency: action.payload };
  }
  if (action.type === ActionCreators.UpdateBaseValue.type) {
    partialState = { baseValue: action.payload };
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
