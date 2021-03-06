/**
 * WordPress dependencies
 */
import deprecated from '@wordpress/deprecated';
import { __ } from '@wordpress/i18n';
import {
	RichText,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from '@wordpress/block-editor';

export default function SubheadEdit( {
	attributes,
	setAttributes,
	className,
} ) {
	const { align, content, placeholder } = attributes;

	deprecated( 'The Subheading block', {
		alternative: 'the Paragraph block',
		plugin: 'Gutenberg',
	} );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
			</BlockControls>
			<div { ...useBlockProps() }>
				<RichText
					tagName="p"
					value={ content }
					onChange={ ( nextContent ) => {
						setAttributes( {
							content: nextContent,
						} );
					} }
					style={ { textAlign: align } }
					className={ className }
					aria-label={ __( 'Subheading text' ) }
					placeholder={ placeholder || __( 'Write subheading…' ) }
				/>
			</div>
		</>
	);
}
