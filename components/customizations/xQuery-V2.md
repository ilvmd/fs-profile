# Xrm Query Library Documentation

This documentation provides clear, practical examples for using the **Xrm Query API** to retrieve, filter, update, and manipulate data in Microsoft Dynamics 365.

---

* Will return **all `Courses` records** with **all available fields**.
* This is useful when you need the complete entity payload without filtering or field selection.

```js
Xrm
    .xQuery('fs_course')
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Returns an array of **`Course` records**. Each object contains all entity fields as stored in Dynamics 365.
```json
[
    {
        "fs_name": "Fahd Moh...",
        "statuscode": 1,
        "statecode": 1,
        // ... etc
    }
]
```


---


* Will return **all `Courses` records** but only with **specific selected fields**.
* Use this to reduce payload size and improve performance.


```js
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Each returned object contains only the selected fields.

```json
[
    {
        "fs_name": "Fahd Moh...",
        "statuscode": 1,
        "statecode": 1
    }
]
```


---


* Will return **`Courses`** records with **specific fields** filtered by a **simple condition object**.
* This form is ideal for equality-based filtering.

```js
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Filter({ statecode: 1 })
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Only records matching the filter condition are returned.

```json
[
    {
        "fs_name": "Fahd Moh...",
        "statuscode": 1,
        "statecode": 1
    }
]
```

---

* Will return **`Courses`** records using a **dynamic condition object** with explicit **`field`** and **`value`**.
* Useful when filters are built dynamically at runtime.


```js
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Filter({ field: 'statuscode', value: 1 })
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Returns only records where the specified field matches the provided value.

```json
[
    {
        "fs_name": "Fahd Moh...",
        "statuscode": 1,
        "statecode": 1
    }
]
```


---


* Will return **`Courses`** records using **advanced comparison operators**.
* Ideal for numeric comparisons such as greater than, less than, etc.


```js
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'fs_degree', 'statuscode', 'statecode'])
    .Filter({ field: 'fs_degree', op: Xrm.xUtility.Operator.Gt, value: 60 })
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Returns records where the comparison condition evaluates to true.

```json
[
    {
        "fs_name": "Fahd Moh...",
        "fs_degree": 85,
        "statuscode": 1,
        "statecode": 1
    }
]
```


---


* Will return only the **top `N` records** from **`Courses`**.
* Useful for previews, dashboards, or limiting result sets.


```js
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Top(1)
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Returns only the specified number of records.

```json
[
    {
        "fs_name": "Fahd Moh...",
        "statuscode": 1,
        "statecode": 1
    }
]
```


---


* Will return **`Courses`** records with **renamed (aliased) fields**.
* This helps produce cleaner, frontend-friendly output keys.


```js
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Alias({ fs_name: "Name", statuscode: "Status" })
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Original field names are replaced with their aliases in the output.

```json
[
    {
        "Name": "Fahd Moh...",
        "Status": 1,
        "statecode": 1
        // etc ...
    }
]
```



* Will return **`Courses`** records including **related entities (relations)**.
* Related data can also be **aliased** for cleaner output structure.


```js
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .WithRelations([
        { relation: "fs_course_teacher_fs_teacherref", select: ['fs_name'] }
    ])
    .Alias({ fs_name: "Name", statuscode: "Status", fs_course_teacher_fs_teacherref: "Teacher" })
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Related entity data is nested and renamed according to the alias configuration.

```json
[
    {
        "Name": "Fahd Moh...",
        "statecode": 1,
        "Status": 1,
        "Teacher": {
            "fs_name": "Fahd Moh..."
        }
    }
]
```


---


* Will return the **current entity record** from the form context.
* Field aliases can be applied to rename the output keys.

```js
Xrm
    .xCurrent()
    .Alias({ fs_name: "Name", statuscode: "Status" })
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Returns the current record with renamed fields.

```json
{
    "Name": "Fahd Moh...",
    "Status": 1,
    "statecode": 1,
    // etc ...
}
```


---


* Will return the **current entity record** with **specific selected fields only**.

```js
Xrm
    .xCurrent()
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Only the selected fields are returned.

```json
{
    "fs_name": "Fahd Moh...",
    "statuscode": 2,
    "statecode": 1
}
```

---


* Will **update the current entity record** on the form.
* Supports simple fields and lookup bindings.
* Updates **the current record** and resolves with the update response.

```js
Xrm
    .xCurrent()
    // way 1
    .Update({
        "statecode": 1,
        "statuscode": 2,
        "fs_Teacher": {
            EntityName: "fs_teachers"
            RecordId: "3275cf76-9fea-ef11-be20-7c1e52fce0cd"
        },
    })
    // way 2
    .Update({
        "statecode": 1,
        "statuscode": 2,
        "fs_Teacher@odata.bind": "/fs_teachers(3275cf76-9fea-ef11-be20-7c1e52fce0cd)"
    })

    .then(console.log)
    .catch(console.log)
    .finally()
```


---


* Will update **the specific record**.
* Supports simple fields and lookup bindings.
* Updates **the specific record** and resolves with the update response.

```js
Xrm
    .xQuery('fs_course')
    .FindById("<GUID>")
    .Update({
        "statecode": 1,
        "statuscode": 2,
        "fs_Teacher@odata.bind": "/fs_teachers(3275cf76-9fea-ef11-be20-7c1e52fce0cd)"
    })
    .then(console.log)
    .catch(console.log)
    .finally()
```


---

* Will create **a new record**.
* Supports object of simple fields and lookup bindings.
* create **a new record** and resolves with the create response.

```js
Xrm
    .xQuery('fs_course')
    .Create({
        "statecode": "Portal",
        "fs_Teacher@odata.bind": "/fs_teachers(3275cf76-9fea-ef11-be20-7c1e52fce0cd)"
    })
    .then(console.log)
    .catch(console.log)
    .finally()
```

---

* Will create **a multi records**.
* Supports array of objects of simple fields and lookup bindings.
* create **a multi records** and resolves with the create response.

```js
Xrm
    .xQuery('fs_course')
    .Create([
        {
            "statecode": "Portal",
            "fs_Teacher@odata.bind": "/fs_teachers(3275cf76-9fea-ef11-be20-7c1e52fce0cd)"
        },
        {
            "fs_name": "CRM",
            "fs_Teacher@odata.bind": "/fs_teachers(3275cf76-9fea-ef11-be20-7c1e52fce0cd)"
        }
    ])
    .then(console.log)
    .catch(console.log)
    .finally()
```


---


* Will associate **the current record**.

```js
Xrm
    .xCurrent()
    .Associate({
        childEntity: "fs_exam",
        childEntityId: "3275cf76-9fea-ef11-be20-7c1e52fce0cd",
        childRelationEntity: "fs_course_fs_exam_courseref"
    })
    .then(console.log)
    .catch(console.log)
    .finally()
```


---


* Will associate **the specific record**.

```js
Xrm
    .xQuery('fs_course')
    .FindById("<GUID>")
    .Associate({
        childEntity: "fs_exam",
        childEntityId: "3275cf76-9fea-ef11-be20-7c1e52fce0cd",
        childRelationEntity: "fs_course_fs_exam_courseref"
    })
    .then(console.log)
    .catch(console.log)
    .finally()
```


---


* Will deassociate **the current record**.

```js
Xrm
    .xCurrent()
    .Deassociate({
        childEntityId: "3275cf76-9fea-ef11-be20-7c1e52fce0cd",
        childRelationEntity: "fs_course_fs_exam_courseref"
    })
    .then(console.log)
    .catch(console.log)
    .finally()
```


---


* Will deassociate **the specific record**.

```js
Xrm
    .xQuery('fs_course')
    .FindById("<GUID>")
    .Deassociate({
        childEntityId: "3275cf76-9fea-ef11-be20-7c1e52fce0cd",
        childRelationEntity: "fs_course_fs_exam_courseref"
    })
    .then(console.log)
    .catch(console.log)
    .finally()
```


---


* Will **Delete the current entity record** on the form.

```js
Xrm
    .xCurrent()
    .Delete()
    .then(console.log)
    .catch(console.log)
    .finally()
```


---


* Will **Delete the specific record** on the form.

```js
Xrm
    .xQuery('fs_course')
    .FindById("<GUID>")
    .Delete()
    .then(console.log)
    .catch(console.log)
    .finally()
```


---


* Will return **specific fields from a lookup field** on the current form.

```js
Xrm
    .xFetchLookup('fs_teacher')
    .Select(['statecode'])
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Returns data from the referenced lookup entity.

```json
{
    "statecode": 1
}
```


---


* Will return lookup data **with related entities included**.
* Related entities can be renamed for a cleaner output structure.


```js
Xrm
    .xFetchLookup('fs_teacher')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .WithRelations([
        { relation: "fs_course_teacher_fs_teacherref", select: ['fs_courseid', 'new_class', 'fs_degree', 'fs_guid'] }
    ])
    .Alias({ fs_course_teacher_fs_teacherref: "Courses" })
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
```

* Returns lookup entity data with its related records grouped under the alias.

```json
{
    "fs_name": "Fahd Moh...",
    "statuscode": 2,
    "statecode": 1,
    "Courses": [
        {
            "fs_courseid": "<guid>",
            "fs_class": 12345,
            "fs_degree": 100,
            "fs_guid": "COR-132"
        }
    ]
}
```

---


* Will return entity list by **FetchXML**.
* Related entities can be renamed for a cleaner output structure.


```js
var sFetchXML = `
<fetch>
	<entity name="entityname">
		<attribute name="statecode"/>
		<attribute name="entitynameid"/>
		<attribute name="createdon"/>
		<filter type="and">
			<condition attribute="statecode" operator="eq" value="0"/>
		</filter>
	</entity>
</fetch>`;

Xrm
    .xExecuteFetchXML(sFetchXML)
    .then(console.log)
    .catch(console.log)
```

* Returns lookup entity data with its related records grouped under the alias.

```json
{
    "fs_name": "Fahd Moh...",
    "statuscode": 2,
    "statecode": 1,
    "Courses": [
        {
            "fs_courseid": "<guid>",
            "fs_class": 12345,
            "fs_degree": 100,
            "fs_guid": "COR-132"
        }
    ]
}
```
