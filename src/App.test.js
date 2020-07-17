import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { findByTestAttr } from '../utils/index';

const setup = (props={}) => {
    const wrapper = shallow(<App {...props} />);
    return wrapper;
};

describe('App Component', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    })

    test('Should render without errors', () => {
        const component = findByTestAttr(wrapper, 'appComponent');
        expect(component.length).toBe(1);
    });
});

