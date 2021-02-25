/**
 * External dependencies
 */
import { some } from 'lodash';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function useGetMedia( innerBlockImages ) {
	const [ currentImageMedia, setCurrentImageMedia ] = useState( [] );

	const imageMedia = useSelect(
		( select ) => {
			if (
				! innerBlockImages?.length ||
				some(
					innerBlockImages,
					( imageBlock ) => ! imageBlock.attributes.id
				)
			) {
				return currentImageMedia;
			}

			const imageIds = innerBlockImages
				.map( ( imageBlock ) => imageBlock.attributes.id )
				.filter(
					( id ) =>
						! currentImageMedia.find( ( img ) => id === img.id )
				);
			if ( imageIds.length === 0 ) {
				return currentImageMedia;
			}

			const getMedia = select( coreStore ).getMedia;
			const newImageMedia = imageIds.map( ( img ) => {
				return getMedia( img );
			} );

			if ( newImageMedia.some( ( img ) => ! img ) ) {
				return currentImageMedia;
			}
			return newImageMedia;
		},
		[ innerBlockImages ]
	);

	const newData = imageMedia?.filter(
		( img ) =>
			! currentImageMedia.find(
				( currentImg ) => currentImg.id === img.id
			)
	);

	if ( newData?.length > 0 ) {
		const newCurrentMedia = [ ...currentImageMedia, ...newData ];
		setCurrentImageMedia( newCurrentMedia );
		return newCurrentMedia;
	}

	return currentImageMedia;
}
