import { reducer, initialState, State } from './address.reducer';

import * as AddressActions from './../actions/address.actions';
import { Address } from '../models/address';


describe('Address Reducer', () => {

  let address: Address;

  beforeEach(() => {
    address               = new Address();
    address.fullName      = 'Saurabh Oza';
    address.mobileNumber  = 12344444;
    address.pinCode       = 123456;
    address.addressLine1  = 'Spine Road';
    address.addressLine2  = 'Chikhali';
    address.landMark      = 'Near RTO';
    address.townCity      = 'Pune';
    address.state         = 'Maharashtra';
  });

    it('Shipping Address should be saved in store', () => {
        const expectedState = {} as State;
        expectedState.entities = {1: address};
        expectedState.ids = [1];

        initialState.ids = [1];
        initialState.entities = {address};

        const newState = reducer(initialState, new AddressActions.ShippingAddressSaveAction(address));
        expect(newState).toEqual(expectedState);
    });

//   describe('LayoutSidebarVisible action', () => {
//     it('should set sidebar visibility to false', () => {

//      const address = new Address();
//      address.fullName = 'Saurabh';
//      address.addressLine1 = 'Saurabh';

//      const action = new AddressActions.ShippingAddressSaveAction(address);

//      const result = reducer(initialState, action);

//       expect(result).toEqual({... initialState, sidebarVisible: action.payload});
//     });
//   });
});
