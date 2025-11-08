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

<a name="module_obj"></a>

## obj
Object utilities for immutable operations

<a name="module_str"></a>

## str
String manipulation utilities

