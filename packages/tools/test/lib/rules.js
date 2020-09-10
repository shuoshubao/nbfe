import test from 'ava';
import Schema from 'async-validator';
import { rules } from '../../lib/rules';

const commonSchemaOptions = {
    suppressWarning: true
};

const validateData = (descriptor = {}, data) => {
    const validator = new Schema(descriptor);
    return new Promise(resolve => {
        validator.validate(data, commonSchemaOptions, errors => {
            resolve(!errors);
        });
    });
};

test('required', async t => {
    const { truthy, falsy } = t;

    const descriptor = {
        fieldName: [rules.required('字段名')]
    };

    const result1 = await validateData(descriptor, { fieldName: '' });
    falsy(result1);

    const result2 = await validateData(descriptor, { fieldName: 'abc' });
    truthy(result2);
});

test('numberRange: eq', async t => {
    const { truthy, falsy } = t;

    const descriptor = {
        fieldName: [rules.numberRange('字段名', { eq: 100 })]
    };

    const result1 = await validateData(descriptor, { fieldName: 100 });
    truthy(result1);

    const result2 = await validateData(descriptor, { fieldName: 99 });
    falsy(result2);
});
