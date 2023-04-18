import { linkActionTypes } from '../types';
import { ILink } from '../../services/link.service';

interface ILinksState {
  links: ILink[];
  ids: string[];
  isLoading: boolean;
}

const initialState: ILinksState = {
  links: [],
  ids: [],
  isLoading: true
};

const linksReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case linkActionTypes.SET_LINKS:
      console.log('payload', payload);
      return {
        ...state,
        links: payload.data,
        ids: payload.ids
      };
    case linkActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: payload
      };

    default:
      return state;
  }
};

export default linksReducer;
