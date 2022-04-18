import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage,
});

export const access_token = atom({
    key: 'access_token',
    default: '',
    effects_UNSTABLE: [persistAtom]
});

export const state_token = atom({
    key: 'state_token',
    default: '',
    effects_UNSTABLE: [persistAtom]
});