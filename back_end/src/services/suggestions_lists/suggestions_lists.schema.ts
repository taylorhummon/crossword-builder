import { Type, getDataValidator } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import { dataValidator } from '../../validators';

const suggestionsListParamsSchema = Type.Object(
  {
    boardWidth: Type.Integer({ minimum: 1 }),
    boardHeight: Type.Integer({ minimum: 1 }),
    squareValues: Type.Array(Type.Union([
      Type.String({ format: 'uppercase-letter-or-tilde' }),
      Type.Null()
    ])),
    activeSquareIndex: Type.Integer({ minimum: 0 }),
    canSuggestFill: Type.Boolean()
  },
  { $id: 'suggestionsListParams', additionalProperties: false }
);

export type SuggestionsListParams = Static<typeof suggestionsListParamsSchema>;
export const suggestionsListParamsDataValidator = getDataValidator(suggestionsListParamsSchema, dataValidator);
