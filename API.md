## Modules

<dl>
<dt><a href="#module_arr">arr</a></dt>
<dd><p>Array utilities for immutable operations</p>
</dd>
<dt><a href="#module_fn">fn</a></dt>
<dd><p>Function composition utilities</p>
</dd>
<dt><a href="#module_obj">obj</a></dt>
<dd><p>Object utilities for immutable operations</p>
</dd>
<dt><a href="#module_str">str</a></dt>
<dd><p>String manipulation utilities</p>
</dd>
</dl>

<a name="module_arr"></a>

## arr
Array utilities for immutable operations


* [arr](#module_arr)
    * [.add(arr, item)](#module_arr.add) ⇒ <code>Array</code>
    * [.remove(arr, item)](#module_arr.remove) ⇒ <code>Array</code>
    * [.toggle(arr, item)](#module_arr.toggle) ⇒ <code>Array</code>
    * [.contains(a, el)](#module_arr.contains) ⇒ <code>boolean</code>

<a name="module_arr.add"></a>

### arr.add(arr, item) ⇒ <code>Array</code>
Immutably adds an item to an array (returns a new array).

**Kind**: static method of [<code>arr</code>](#module_arr)  
**Returns**: <code>Array</code> - A new array with the item added at the end  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The source array |
| item | <code>\*</code> | The item to add |

**Example**  
```js
add([1, 2, 3], 4) // => [1, 2, 3, 4]
```
<a name="module_arr.remove"></a>

### arr.remove(arr, item) ⇒ <code>Array</code>
Immutably removes the first occurrence of an item from an array.
If the item is not found, returns the original array.

**Kind**: static method of [<code>arr</code>](#module_arr)  
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
<a name="module_arr.toggle"></a>

### arr.toggle(arr, item) ⇒ <code>Array</code>
Immutably toggles an item in an array (adds if not present, removes if present).

**Kind**: static method of [<code>arr</code>](#module_arr)  
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
<a name="module_arr.contains"></a>

### arr.contains(a, el) ⇒ <code>boolean</code>
Checks if an array or comma-separated string contains an element.

**Kind**: static method of [<code>arr</code>](#module_arr)  
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
<a name="module_fn"></a>

## fn
Function composition utilities


* [fn](#module_fn)
    * [.pipe(a, ...fns)](#module_fn.pipe) ⇒ <code>function</code>
    * [.compose(...fns)](#module_fn.compose) ⇒ <code>function</code>

<a name="module_fn.pipe"></a>

### fn.pipe(a, ...fns) ⇒ <code>function</code>
Creates a left-to-right function composition pipeline.
The first function can accept multiple arguments; the remaining functions must be unary.

**Kind**: static method of [<code>fn</code>](#module_fn)  
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
<a name="module_fn.compose"></a>

### fn.compose(...fns) ⇒ <code>function</code>
Creates a right-to-left function composition.
The rightmost function can accept multiple arguments; the remaining functions must be unary.

**Kind**: static method of [<code>fn</code>](#module_fn)  
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
<a name="module_obj"></a>

## obj
Object utilities for immutable operations


* [obj](#module_obj)
    * [.keyValue(k, v)](#module_obj.keyValue) ⇒ <code>Object</code>
    * [.isLiteral(o)](#module_obj.isLiteral) ⇒ <code>boolean</code>
    * [.clone(o)](#module_obj.clone) ⇒ <code>Object</code>
    * [.sub(o, p)](#module_obj.sub) ⇒ <code>\*</code>
    * [.patch(o, k, v)](#module_obj.patch) ⇒ <code>Object</code>
    * [.reduce(o, reduceFn, [initial])](#module_obj.reduce) ⇒ <code>\*</code>
    * [.map(o, mapFn)](#module_obj.map) ⇒ <code>Object</code>
    * [.filter(o, filterFn)](#module_obj.filter) ⇒ <code>Object</code>
    * [.traverse(tree, fn)](#module_obj.traverse) ⇒ <code>Object</code>
    * [.chainCall(o, chain)](#module_obj.chainCall) ⇒ <code>\*</code>
    * [._switch(value, cases)](#module_obj._switch) ⇒ <code>\*</code>

<a name="module_obj.keyValue"></a>

### obj.keyValue(k, v) ⇒ <code>Object</code>
Creates an object with a single key-value pair.

**Kind**: static method of [<code>obj</code>](#module_obj)  
**Returns**: <code>Object</code> - An object with the single key-value pair  

| Param | Type | Description |
| --- | --- | --- |
| k | <code>string</code> | The key |
| v | <code>\*</code> | The value |

**Example**  
```js
keyValue('name', 'John') // => { name: 'John' }
```
<a name="module_obj.isLiteral"></a>

### obj.isLiteral(o) ⇒ <code>boolean</code>
Checks if a value is a plain object literal (not an array, null, or other object type).

**Kind**: static method of [<code>obj</code>](#module_obj)  
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
<a name="module_obj.clone"></a>

### obj.clone(o) ⇒ <code>Object</code>
Creates a shallow clone of an object, preserving its prototype.

**Kind**: static method of [<code>obj</code>](#module_obj)  
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
<a name="module_obj.sub"></a>

### obj.sub(o, p) ⇒ <code>\*</code>
Gets a nested value from an object using a path.

**Kind**: static method of [<code>obj</code>](#module_obj)  
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
<a name="module_obj.patch"></a>

### obj.patch(o, k, v) ⇒ <code>Object</code>
Immutably updates a value in an object at a given path.
For nested paths, creates intermediate objects as needed.
If the value at the path is a literal object and v is also a literal object, they are merged.

**Kind**: static method of [<code>obj</code>](#module_obj)  
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
<a name="module_obj.reduce"></a>

### obj.reduce(o, reduceFn, [initial]) ⇒ <code>\*</code>
Reduces an object to a single value by iterating over its keys.
Similar to Array.reduce, but for objects.

**Kind**: static method of [<code>obj</code>](#module_obj)  
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
<a name="module_obj.map"></a>

### obj.map(o, mapFn) ⇒ <code>Object</code>
Immutably maps over an object's values.

**Kind**: static method of [<code>obj</code>](#module_obj)  
**Returns**: <code>Object</code> - A new object with mapped values  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The source object |
| mapFn | <code>function</code> | The mapping function (key, value, index, originalObject) => newValue |

**Example**  
```js
map({ a: 1, b: 2 }, (k, v) => v * 2) // => { a: 2, b: 4 }
```
<a name="module_obj.filter"></a>

### obj.filter(o, filterFn) ⇒ <code>Object</code>
Immutably filters an object's properties based on a predicate.

**Kind**: static method of [<code>obj</code>](#module_obj)  
**Returns**: <code>Object</code> - A new object with only properties that pass the predicate  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The source object |
| filterFn | <code>function</code> | The filter predicate (key, value, index, originalObject) => boolean |

**Example**  
```js
filter({ a: 1, b: 2, c: 3 }, (k, v) => v > 1) // => { b: 2, c: 3 }
```
<a name="module_obj.traverse"></a>

### obj.traverse(tree, fn) ⇒ <code>Object</code>
Recursively traverses an object tree and applies a function to leaf values.
Non-literal values (primitives, arrays, etc.) are transformed by the function.

**Kind**: static method of [<code>obj</code>](#module_obj)  
**Returns**: <code>Object</code> - A new object tree with transformed leaf values  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>Object</code> | The object tree to traverse |
| fn | <code>function</code> | The function to apply to leaf values (key, value, index, parent) => newValue |

**Example**  
```js
traverse({ a: { b: 1 }, c: 2 }, (k, v) => v * 2) // => { a: { b: 2 }, c: 4 }
```
<a name="module_obj.chainCall"></a>

### obj.chainCall(o, chain) ⇒ <code>\*</code>
Chains multiple method calls on an object.

**Kind**: static method of [<code>obj</code>](#module_obj)  
**Returns**: <code>\*</code> - The result of the final method call  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | The object to call methods on |
| chain | <code>Array.&lt;Array&gt;</code> | Array of [methodName, ...args] tuples |

**Example**  
```js
chainCall([1, 2, 3], [['map', x => x * 2], ['filter', x => x > 2]]) // => [4, 6]
```
<a name="module_obj._switch"></a>

### obj.\_switch(value, cases) ⇒ <code>\*</code>
Pattern matching utility that returns a value based on matching a value to cases.
Supports nested array paths for partial matching and a 'default' case.

**Kind**: static method of [<code>obj</code>](#module_obj)  
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
<a name="module_str"></a>

## str
String manipulation utilities


* [str](#module_str)
    * [.capitalize(chunk)](#module_str.capitalize) ⇒ <code>string</code>
    * [.toCamelCase(str, [glue])](#module_str.toCamelCase) ⇒ <code>string</code>
    * [.fromCamelCase(str, [glue])](#module_str.fromCamelCase) ⇒ <code>string</code>
    * [.singularToPlural(str)](#module_str.singularToPlural) ⇒ <code>string</code>
    * [.pluralToSingular(str)](#module_str.pluralToSingular) ⇒ <code>string</code>
    * [.toDocumentId(str, [glue], [suffix], [prefix])](#module_str.toDocumentId) ⇒ <code>string</code>

<a name="module_str.capitalize"></a>

### str.capitalize(chunk) ⇒ <code>string</code>
Capitalizes the first character of a string.

**Kind**: static method of [<code>str</code>](#module_str)  
**Returns**: <code>string</code> - The capitalized string  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>string</code> | The string to capitalize |

**Example**  
```js
capitalize('hello') // => 'Hello'
```
<a name="module_str.toCamelCase"></a>

### str.toCamelCase(str, [glue]) ⇒ <code>string</code>
Converts a string to camelCase from a delimited format.

**Kind**: static method of [<code>str</code>](#module_str)  
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
<a name="module_str.fromCamelCase"></a>

### str.fromCamelCase(str, [glue]) ⇒ <code>string</code>
Converts a camelCase string to a delimited format.

**Kind**: static method of [<code>str</code>](#module_str)  
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
<a name="module_str.singularToPlural"></a>

### str.singularToPlural(str) ⇒ <code>string</code>
Converts a singular word to its plural form (basic English rules).

**Kind**: static method of [<code>str</code>](#module_str)  
**Returns**: <code>string</code> - The plural form  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The singular word |

**Example**  
```js
singularToPlural('category') // => 'categories'
singularToPlural('user') // => 'users'
```
<a name="module_str.pluralToSingular"></a>

### str.pluralToSingular(str) ⇒ <code>string</code>
Converts a plural word to its singular form (basic English rules).

**Kind**: static method of [<code>str</code>](#module_str)  
**Returns**: <code>string</code> - The singular form  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The plural word |

**Example**  
```js
pluralToSingular('categories') // => 'category'
pluralToSingular('users') // => 'user'
```
<a name="module_str.toDocumentId"></a>

### str.toDocumentId(str, [glue], [suffix], [prefix]) ⇒ <code>string</code>
Converts a string to a document ID format (typically used for database foreign keys).

**Kind**: static method of [<code>str</code>](#module_str)  
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
