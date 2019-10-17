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
'use strict';

/**
 * @param {Array} stack
 * @returns {function}
 */
module.exports = (stack) => {
	/**
	 * @param {Request} request
	 * @param {Response} response
	 * @param {function|void} next
	 * @throws {Error}
	 * @returns {any}
	 */
	return (request, response, next) => {
		let index = -1;
		let length = stack.length;
		return (function resolve(){
			if (stack[++index]) {
				return stack[index](request, response, resolve);
			} else if (index == length) {
				if (next) {
					return next(request, response, resolve);
				}
			} else if (index > length + 1) {
				throw new Error('The next() called multiple times');
			}
			++index;
		})();
	};
};