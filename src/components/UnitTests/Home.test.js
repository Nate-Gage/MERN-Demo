import React from 'react';
import { shallow, EnzymeAdapter } from 'enzyme';
import Home from '../Home';
import { findByTestAttr, checkProps } from '../../../utils/index';
import Adapter from 'enzyme-adapter-react-16';

//hi

const setUp = (props = {}) => {
    const component = shallow(<Home {...props} />);
    return component;
};

describe('Home Component', () => {

    describe('Check PropTypes', () => {

        let wrapper;
        beforeEach(() => {
            const testProps = {
                header: 'test header'
            };

            wrapper = setUp(testProps);
        })

        test('Should render <h1> without errors', () => {
            const h1 = findByTestAttr(wrapper, 'header');
            expect(h1.length).toBe(1);
        })
    });

    describe('Have props', () => {

        test('Should not throw warning', () => {
            const expectedProps = {
                header: 'Test header'
            };

            const propsErr = checkProps(Home, expectedProps);
            expect(propsErr).toBe(undefined);
        });
    });

    describe('Have no props', () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        })

        test('Should not render', () => {
            const component = findByTestAttr(wrapper, 'header');
            expect(component.length).toBe(0);
        })
    });

});
