## Functions

<dl>
<dt><a href="#add">add(arr, item)</a> ⇒ <code>Array</code></dt>
<dd><p>Immutably adds an item to an array (returns a new array).</p>
</dd>
<dt><a href="#remove">remove(arr, item)</a> ⇒ <code>Array</code></dt>
<dd><p>Immutably removes the first occurrence of an item from an array.
If the item is not found, returns the original array.</p>
</dd>
<dt><a href="#toggle">toggle(arr, item)</a> ⇒ <code>Array</code></dt>
<dd><p>Immutably toggles an item in an array (adds if not present, removes if present).</p>
</dd>
<dt><a href="#contains">contains(a, el)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if an array or comma-separated string contains an element.</p>
</dd>
<dt><a href="#pipe">pipe(a, ...fns)</a> ⇒ <code>function</code></dt>
<dd><p>Creates a left-to-right function composition pipeline.
The first function can accept multiple arguments; the remaining functions must be unary.</p>
</dd>
<dt><a href="#compose">compose(...fns)</a> ⇒ <code>function</code></dt>
<dd><p>Creates a right-to-left function composition.
The rightmost function can accept multiple arguments; the remaining functions must be unary.</p>
</dd>
<dt><a href="#keyValue">keyValue(k, v)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates an object with a single key-value pair.</p>
</dd>
<dt><a href="#isLiteral">isLiteral(o)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a value is a plain object literal (not an array, null, or other object type).</p>
</dd>
<dt><a href="#clone">clone(o)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates a shallow clone of an object, preserving its prototype.</p>
</dd>
<dt><a href="#sub">sub(o, p)</a> ⇒ <code>*</code></dt>
<dd><p>Gets a nested value from an object using a path.</p>
</dd>
<dt><a href="#patch">patch(o, k, v)</a> ⇒ <code>Object</code></dt>
<dd><p>Immutably updates a value in an object at a given path.
For nested paths, creates intermediate objects as needed.
If the value at the path is a literal object and v is also a literal object, they are merged.</p>
</dd>
<dt><a href="#reduce">reduce(o, reduceFn, [initial])</a> ⇒ <code>*</code></dt>
<dd><p>Reduces an object to a single value by iterating over its keys.
Similar to Array.reduce, but for objects.</p>
</dd>
<dt><a href="#map">map(o, mapFn)</a> ⇒ <code>Object</code></dt>
<dd><p>Immutably maps over an object&#39;s values.</p>
</dd>
<dt><a href="#filter">filter(o, filterFn)</a> ⇒ <code>Object</code></dt>
<dd><p>Immutably filters an object&#39;s properties based on a predicate.</p>
</dd>
<dt><a href="#traverse">traverse(tree, fn)</a> ⇒ <code>Object</code></dt>
<dd><p>Recursively traverses an object tree and applies a function to leaf values.
Non-literal values (primitives, arrays, etc.) are transformed by the function.</p>
</dd>
<dt><a href="#chainCall">chainCall(o, chain)</a> ⇒ <code>*</code></dt>
<dd><p>Chains multiple method calls on an object.</p>
</dd>
<dt><a href="#_switch">_switch(value, cases)</a> ⇒ <code>*</code></dt>
<dd><p>Pattern matching utility that returns a value based on matching a value to cases.
Supports nested array paths for partial matching and a &#39;default&#39; case.</p>
</dd>
<dt><a href="#capitalize">capitalize(chunk)</a> ⇒ <code>string</code></dt>
<dd><p>Capitalizes the first character of a string.</p>
</dd>
<dt><a href="#toCamelCase">toCamelCase(str, [glue])</a> ⇒ <code>string</code></dt>
<dd><p>Converts a string to camelCase from a delimited format.</p>
</dd>
<dt><a href="#fromCamelCase">fromCamelCase(str, [glue])</a> ⇒ <code>string</code></dt>
<dd><p>Converts a camelCase string to a delimited format.</p>
</dd>
<dt><a href="#singularToPlural">singularToPlural(str)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a singular word to its plural form (basic English rules).</p>
</dd>
<dt><a href="#pluralToSingular">pluralToSingular(str)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a plural word to its singular form (basic English rules).</p>
</dd>
<dt><a href="#toDocumentId">toDocumentId(str, [glue], [suffix], [prefix])</a> ⇒ <code>string</code></dt>
<dd><p>Converts a string to a document ID format (typically used for database foreign keys).</p>
</dd>
</dl>

<a name="add"></a>

## add(arr, item) ⇒ <code>Array</code>
Immutably adds an item to an array (returns a new array).

**Kind**: global function  
**Returns**: <code>Array</code> - A new array with the item added at the end  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The source array |
| item | <code>\*</code> | The item to add |

**Example**  
```js
add([1, 2, 3], 4) // => [1, 2, 3, 4]
```
<a name="remove"></a>

## remove(arr, item) ⇒ <code>Array</code>
Immutably removes the first occurrence of an item from an array.
If the item is not found, returns the original array.

**Kind**: global function  
**Returns**: <code>Array</code> - A new array with the item removed, or the original array if not found  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The source array |
| item | <code>\*</code> | The item to remove |

**Example**  
```js
remove([1, 2, 3, 2], 2) // => [1, 3, 2]
remove([1, 2, 3], 4) // => [1, 2, 3]
```
<a name="toggle"></a>

## toggle(arr, item) ⇒ <code>Array</code>
Immutably toggles an item in an array (adds if not present, removes if present).

**Kind**: global function  
**Returns**: <code>Array</code> - A new array with the item toggled  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The source array |
| item | <code>\*</code> | The item to toggle |

**Example**  
```js
toggle([1, 2, 3], 2) // => [1, 3]
toggle([1, 2, 3], 4) // => [1, 2, 3, 4]
```
<a name="contains"></a>

## contains(a, el) ⇒ <code>boolean</code>
Checks if an array or comma-separated string contains an element.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the element is found, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> \| <code>string</code> | The array or comma-separated string to check |
| el | <code>\*</code> | The element to look for |

**Example**  
```js
contains([1, 2, 3], 2) // => true
contains('a,b,c', 'b') // => true
contains([1, 2, 3], 4) // => false
```
<a name="pipe"></a>

## pipe(a, ...fns) ⇒ <code>function</code>
Creates a left-to-right function composition pipeline.
The first function can accept multiple arguments; the remaining functions must be unary.

**Kind**: global function  
**Returns**: <code>function</code> - A function that passes the result through each function from left to right  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>function</code> | The first function in the pipeline (can accept multiple arguments) |
| ...fns | <code>function</code> | The remaining functions to pipe through (each takes one argument) |

**Example**  
```js
const addOne = x => x + 1;
const double = x => x * 2;
const addOneThenDouble = pipe(addOne, double);
addOneThenDouble(3) // => 8 (3 + 1 = 4, 4 * 2 = 8)
```
<a name="compose"></a>

## compose(...fns) ⇒ <code>function</code>
Creates a right-to-left function composition.
The rightmost function can accept multiple arguments; the remaining functions must be unary.

**Kind**: global function  
**Returns**: <code>function</code> - A function that passes the result through each function from right to left  

| Param | Type | Description |
| --- | --- | --- |
| ...fns | <code>function</code> | Functions to compose (executed right to left) |

**Example**  
```js
const addOne = x => x + 1;
const double = x => x * 2;
const doubleThenAddOne = compose(addOne, double);
doubleThenAddOne(3) // => 7 (3 * 2 = 6, 6 + 1 = 7)
```
<a name="keyValue"></a>

## keyValue(k, v) ⇒ <code>Object</code>
Creates an object with a single key-value pair.

**Kind**: global function  
**Returns**: <code>Object</code> - An object with the single key-value pair  

| Param | Type | Description |
| --- | --- | --- |
| k | <code>string</code> | The key |
| v | <code>\*</code> | The value |

**Example**  
```js
keyValue('name', 'John') // => { name: 'John' }
```
<a name="isLiteral"></a>

## isLiteral(o) ⇒ <code>boolean</code>
Checks if a value is a plain object literal (not an array, null, or other object type).

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the value is a plain object literal  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>\*</code> | The value to check |

**Example**  
```js
isLiteral({}) // => true
isLiteral([]) // => false
isLiteral(null) // => false
```
<a name="clone"></a>

## clone(o) ⇒ <code>Object</code>
Creates a shallow clone of an object, preserving its prototype.

**Kind**: global function  
**Returns**: <code>Object</code> - A shallow clone of the object  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The object to clone |

**Example**  
```js
const obj = { a: 1, b: 2 };
const cloned = clone(obj);
cloned.a = 3;
console.log(obj.a) // => 1 (original unchanged)
```
<a name="sub"></a>

## sub(o, p) ⇒ <code>\*</code>
Gets a nested value from an object using a path.

**Kind**: global function  
**Returns**: <code>\*</code> - The value at the path, or undefined if not found  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The source object |
| p | <code>string</code> \| <code>Array.&lt;string&gt;</code> | The path (string key or array of keys for nested access) |

**Example**  
```js
sub({ a: { b: { c: 1 } } }, ['a', 'b', 'c']) // => 1
sub({ a: 1 }, 'a') // => 1
sub({ a: 1 }, 'b') // => undefined
```
<a name="patch"></a>

## patch(o, k, v) ⇒ <code>Object</code>
Immutably updates a value in an object at a given path.
For nested paths, creates intermediate objects as needed.
If the value at the path is a literal object and v is also a literal object, they are merged.

**Kind**: global function  
**Returns**: <code>Object</code> - A new object with the value updated at the path  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The source object |
| k | <code>string</code> \| <code>Array.&lt;string&gt;</code> | The path (string key or array of keys for nested updates) |
| v | <code>\*</code> | The value to set |

**Example**  
```js
patch({ a: 1 }, 'b', 2) // => { a: 1, b: 2 }
patch({ a: { b: 1 } }, ['a', 'c'], 2) // => { a: { b: 1, c: 2 } }
patch({ a: { b: 1 } }, 'a', { c: 2 }) // => { a: { b: 1, c: 2 } } (merged)
```
<a name="reduce"></a>

## reduce(o, reduceFn, [initial]) ⇒ <code>\*</code>
Reduces an object to a single value by iterating over its keys.
Similar to Array.reduce, but for objects.

**Kind**: global function  
**Returns**: <code>\*</code> - The final accumulated value  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The object to reduce |
| reduceFn | <code>function</code> | The reducer function (accumulator, key, value, index, originalObject) => newAccumulator |
| [initial] | <code>\*</code> | The initial accumulator value (defaults to first property value) |

**Example**  
```js
reduce({ a: 1, b: 2, c: 3 }, (sum, key, val) => sum + val, 0) // => 6
```
<a name="map"></a>

## map(o, mapFn) ⇒ <code>Object</code>
Immutably maps over an object's values.

**Kind**: global function  
**Returns**: <code>Object</code> - A new object with mapped values  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The source object |
| mapFn | <code>function</code> | The mapping function (key, value, index, originalObject) => newValue |

**Example**  
```js
map({ a: 1, b: 2 }, (k, v) => v * 2) // => { a: 2, b: 4 }
```
<a name="filter"></a>

## filter(o, filterFn) ⇒ <code>Object</code>
Immutably filters an object's properties based on a predicate.

**Kind**: global function  
**Returns**: <code>Object</code> - A new object with only properties that pass the predicate  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The source object |
| filterFn | <code>function</code> | The filter predicate (key, value, index, originalObject) => boolean |

**Example**  
```js
filter({ a: 1, b: 2, c: 3 }, (k, v) => v > 1) // => { b: 2, c: 3 }
```
<a name="traverse"></a>

## traverse(tree, fn) ⇒ <code>Object</code>
Recursively traverses an object tree and applies a function to leaf values.
Non-literal values (primitives, arrays, etc.) are transformed by the function.

**Kind**: global function  
**Returns**: <code>Object</code> - A new object tree with transformed leaf values  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>Object</code> | The object tree to traverse |
| fn | <code>function</code> | The function to apply to leaf values (key, value, index, parent) => newValue |

**Example**  
```js
traverse({ a: { b: 1 }, c: 2 }, (k, v) => v * 2) // => { a: { b: 2 }, c: 4 }
```
<a name="chainCall"></a>

## chainCall(o, chain) ⇒ <code>\*</code>
Chains multiple method calls on an object.

**Kind**: global function  
**Returns**: <code>\*</code> - The result of the final method call  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The object to call methods on |
| chain | <code>Array.&lt;Array&gt;</code> | Array of [methodName, ...args] tuples |

**Example**  
```js
chainCall([1, 2, 3], [['map', x => x * 2], ['filter', x => x > 2]]) // => [4, 6]
```
<a name="_switch"></a>

## \_switch(value, cases) ⇒ <code>\*</code>
Pattern matching utility that returns a value based on matching a value to cases.
Supports nested array paths for partial matching and a 'default' case.

**Kind**: global function  
**Returns**: <code>\*</code> - The matched case value, or false if no match  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to match (can be a string, array path, etc.) |
| cases | <code>Object</code> | Object with cases to match against (supports 'default' key) |

**Example**  
```js
_switch('a', { a: 1, b: 2, default: 0 }) // => 1
_switch('c', { a: 1, b: 2, default: 0 }) // => 0
_switch(['a', 'b'], { a: { b: 1 } }) // => 1
```
<a name="capitalize"></a>

## capitalize(chunk) ⇒ <code>string</code>
Capitalizes the first character of a string.

**Kind**: global function  
**Returns**: <code>string</code> - The capitalized string  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>string</code> | The string to capitalize |

**Example**  
```js
capitalize('hello') // => 'Hello'
```
<a name="toCamelCase"></a>

## toCamelCase(str, [glue]) ⇒ <code>string</code>
Converts a string to camelCase from a delimited format.

**Kind**: global function  
**Returns**: <code>string</code> - The camelCase string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>string</code> |  | The string to convert |
| [glue] | <code>string</code> | <code>&quot;&#x27;_&#x27;&quot;</code> | The delimiter to split on |

**Example**  
```js
toCamelCase('hello_world') // => 'helloWorld'
toCamelCase('hello-world', '-') // => 'helloWorld'
```
<a name="fromCamelCase"></a>

## fromCamelCase(str, [glue]) ⇒ <code>string</code>
Converts a camelCase string to a delimited format.

**Kind**: global function  
**Returns**: <code>string</code> - The delimited string in lowercase  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>string</code> |  | The camelCase string to convert |
| [glue] | <code>string</code> | <code>&quot;&#x27;_&#x27;&quot;</code> | The delimiter to use |

**Example**  
```js
fromCamelCase('helloWorld') // => 'hello_world'
fromCamelCase('helloWorld', '-') // => 'hello-world'
```
<a name="singularToPlural"></a>

## singularToPlural(str) ⇒ <code>string</code>
Converts a singular word to its plural form (basic English rules).

**Kind**: global function  
**Returns**: <code>string</code> - The plural form  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The singular word |

**Example**  
```js
singularToPlural('category') // => 'categories'
singularToPlural('user') // => 'users'
```
<a name="pluralToSingular"></a>

## pluralToSingular(str) ⇒ <code>string</code>
Converts a plural word to its singular form (basic English rules).

**Kind**: global function  
**Returns**: <code>string</code> - The singular form  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The plural word |

**Example**  
```js
pluralToSingular('categories') // => 'category'
pluralToSingular('users') // => 'user'
```
<a name="toDocumentId"></a>

## toDocumentId(str, [glue], [suffix], [prefix]) ⇒ <code>string</code>
Converts a string to a document ID format (typically used for database foreign keys).

**Kind**: global function  
**Returns**: <code>string</code> - The document ID string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>string</code> |  | The string to convert |
| [glue] | <code>string</code> | <code>&quot;&#x27;_&#x27;&quot;</code> | The delimiter in the input string |
| [suffix] | <code>string</code> | <code>&quot;&#x27;Id&#x27;&quot;</code> | The suffix to append |
| [prefix] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | The prefix to prepend |

**Example**  
```js
toDocumentId('user_roles') // => 'userRoleId'
toDocumentId('categories', '_', 'ID', 'ref') // => 'refCategoryID'
```
