/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assert = require('assert');
const middleware = require('../../');

/**
 */
let stack = [
	(context, next) => {
		assert.strictEqual(context, 'context');
		assert.strictEqual(next(), 'bar');
		return 'foo';
	},
	(context, next) => {
		assert.strictEqual(context, 'context');
		assert.strictEqual(next(), 'baz');
		return 'bar';
	},
	(context, next) => {
		assert.strictEqual(context, 'context');
		assert.strictEqual(next(), 'done');
		return 'baz';
	},
];

/**
 */
describe('index', () => {
	/**
	 */
	it('typeof(middleware) === "function"', () => {
		assert.ok(typeof middleware === 'function');
	});

	/**
	 */
	it('middleware([]) === "function"', () => {
		assert.ok(typeof middleware([]) === 'function');
	});

	/**
	 */
	it('middleware()', () => {
		let middleware1 = middleware(stack);
		assert.strictEqual(middleware1('context', () => 'done'), 'foo');
		let middleware2 = middleware([]);
		assert.strictEqual(middleware2('context', () => 'done'), 'done');
	});
});