import React from 'react';
import { shallow } from 'enzyme';
import LoginUser from '../LoginUser';
import { findByTestAttr } from '../../../utils/index';

const setUp = (props = {}) => {
    const component = shallow(<LoginUser {...props} />);
    return component;
};

describe('LoginUser Component', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = setUp();
    })

    test('Should render without errors', () => {
        const component = findByTestAttr(wrapper, 'loginComponent');
        expect(component.length).toBe(1);
    });

    test('Calls axios and returns user', async () => {
        const user = await loginUser({ 
            email: 'test@mail.com',
            password: '123abc'
        });
        console.log(user);
    });
});