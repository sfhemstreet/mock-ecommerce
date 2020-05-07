import { STATES_TAXES } from "./StatesTaxes";

export function validateState(state: string) {
  if (state.trim().length === 0) return false;

  const acceptedStates = STATES_TAXES.map(s => s.state);

  return acceptedStates.includes(state);
}