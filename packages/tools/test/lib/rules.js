import test from 'ava';
import Schema from 'async-validator';
import { rules } from '../../lib/rules';

const commonSchemaOptions = {
    suppressWarning: true
};

test('required', t => {
    const { is, not } = t;

    const descriptor = {
        fieldName: [rules.required('字段名')]
    };

    const validator = new Schema(descriptor);

    validator.validate({ fieldName: '' }, commonSchemaOptions, errors => {
        not(errors, null);
    });

    validator.validate({ fieldName: 'abc' }, commonSchemaOptions, errors => {
        is(errors, null);
    });
});

test('numberRange', t => {
    const { is, not } = t;

    const descriptor = {
        fieldName: [rules.numberRange('字段名', { eq: 100 })]
    };

    const validator = new Schema(descriptor);

    validator.validate({ fieldName: 100 }, commonSchemaOptions, errors => {
        is(errors, null);
    });

    validator.validate({ fieldName: 99 }, commonSchemaOptions, errors => {
        not(errors, null);
    });
});
