/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { View } from '../../view';
import { HStack } from '..';

describe( 'props', () => {
	test( 'should render correctly', () => {
		const { container } = render(
			<HStack>
				<View />
				<View />
			</HStack>
		);
		expect( container.firstChild ).toMatchSnapshot();
	} );

	test( 'should render alignment', () => {
		const { container } = render(
			<HStack alignment="center">
				<View />
				<View />
			</HStack>
		);
		expect( container.firstChild ).toMatchSnapshot();
	} );

	test( 'should render spacing', () => {
		const { container } = render(
			<HStack spacing={ 5 }>
				<View />
				<View />
			</HStack>
		);
		expect( container.firstChild ).toMatchSnapshot();
	} );
} );
