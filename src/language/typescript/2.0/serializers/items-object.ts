import { ItemsObject } from '../../../../schema/2.0/items-object';
import {
	getSerializedArrayType,
	getSerializedIntegerType,
	getSerializedStringType,
	SERIALIZED_BOOLEAN_TYPE,
	SERIALIZED_NUMBER_TYPE,
	SerializedType,
} from '../../common/data/serialized-type';
import { Ref } from '../../../../utils/ref';
import { pipe } from 'fp-ts/lib/pipeable';
import { either } from 'fp-ts';
import { Either, right } from 'fp-ts/lib/Either';
import { none } from 'fp-ts/lib/Option';

export const serializeItemsObject = (from: Ref, itemsObject: ItemsObject): Either<Error, SerializedType> => {
	switch (itemsObject.type) {
		case 'array': {
			return pipe(serializeItemsObject(from, itemsObject.items), either.map(getSerializedArrayType(none)));
		}
		case 'string': {
			return getSerializedStringType(from, itemsObject.format);
		}
		case 'number': {
			return right(SERIALIZED_NUMBER_TYPE);
		}
		case 'integer': {
			return getSerializedIntegerType(from, itemsObject.format);
		}
		case 'boolean': {
			return right(SERIALIZED_BOOLEAN_TYPE);
		}
	}
};
