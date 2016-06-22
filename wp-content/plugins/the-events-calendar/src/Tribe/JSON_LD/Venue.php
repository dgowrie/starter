<?php

// Don't load directly
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/**
 * A JSON-LD class extended of the Abstract that lies on the Common Package
 * Used for generating a Venue/Place JSON-LD markup
 */
class Tribe__Events__JSON_LD__Venue extends Tribe__JSON_LD__Abstract {

	/**
	 * Which type of element this actually is
	 *
	 * @see https://developers.google.com/structured-data/rich-snippets/
	 * @var string
	 */
	public $type = 'Place';

	/**
	 * On PHP 5.2 the child class doesn't get spawned on the Parent one, so we don't have
	 * access to that information on the other side unless we pass it around as a param
	 * so we throw __CLASS__ to the parent::instance() method to be able to spawn new instance
	 * of this class and save on the parent::$instances variable.
	 *
	 * @param  $name DONT USE THIS PARAM, it's here for Abstract compatibility
	 * @return Tribe__Events__JSON_LD__Venue
	 */
	public static function instance( $name = null ) {
		return parent::instance( __CLASS__ );
	}

	/**
	 * Fetches the JSON-LD data for this type of object
	 *
	 * @param  int|WP_Post|null $post The post/venue
	 * @param  array  $args
	 * @return array
	 */
	public function get_data( $post = null, $args = array( 'context' => false ) ) {
		$data = parent::get_data( $post, $args );

		// Fetch first key
		$post_id = key( $data );

		// Fetch first Value
		$data = reset( $data );

		$data->address = array();

		$data->address['streetAddress'] = tribe_get_address( $post_id );
		$data->address['addressLocality'] = tribe_get_city( $post_id );
		$data->address['addressRegion'] = tribe_get_region( $post_id );
		$data->address['postalCode'] = tribe_get_zip( $post_id );
		$data->address['addressCountry'] = tribe_get_country( $post_id );

		// Filter empty entries and convert to object
		$data->address = (object) array_filter( $data->address );

		$geo = tribe_get_coordinates( $post_id );
		if ( ! empty( $geo['lat'] ) && ! empty( $geo['lng'] ) ) {
			$data->geo = (object) array(
				'@type' => 'GeoCoordinates',
				'latitude' => $geo['lat'],
				'longitude' => $geo['lng'],
			);
		}

		$data->telephone = tribe_get_phone( $post_id );
		$data->sameAs = tribe_get_venue_website_url( $post_id );

		return array( $post_id => $data );
	}

}
