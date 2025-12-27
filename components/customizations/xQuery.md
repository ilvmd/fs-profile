@text
- Will return all <kbd>`Courses`</kbd> records with all fields
@endtext

@code
Xrm
    .xQuery('fs_course')
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
@endcode

@result
[
    {
        "fs_name": "Fahd Moh...",
        "statuscode": 1
        "statecode": 1,
        ... etc
    },
    ...etc
]
@endresult


@split

@text
- Will return all <kbd>`Courses`</kbd> records with specific fields
@endtext

@code
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
@endcode

@result
[
    {
        "fs_name": "Fahd Moh...",
        "statuscode": 1
        "statecode": 1
    },
    ...etc
]
@endresult


@split


@text
- Will return all <kbd>`Courses`</kbd> records with specific fields at condition object
@endtext

@code
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Filter({'statecode': 1})
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()

    [
        {
            "fs_name": "Fahd Moh...",
            "statuscode": 1
            "statecode": 1
        },
        {
            "fs_name": "Majid Moh...",
            "statuscode": 2
            "statecode": 1
        },
        ...etc
    ]
@endcode


@split
@text
- Will return all <kbd>`Courses`</kbd> records with specific fields at conditions object with (<kbd>`field`</kbd> and <kbd>`value`</kbd>)
@endtext

@code
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Filter({field: 'statuscode', value: 1})
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()

    [
        {
            "fs_name": "Fahd Moh...",
            "statuscode": 1
            "statecode": 1
        },
        {
            "fs_name": "Majid Moh...",
            "statuscode": 2
            "statecode": 1
        },
        ...etc
    ]
@endcode


@split
@text
- Will return all <kbd>`Courses`</kbd> records with specific fields at condition object with (<kbd>`Op`</kbd>)
@endtext

@code
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Filter({field: 'fs_degree', op: Xrm.xUtility.Operator.Gt , value: 60})
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()

    [
        {
            "fs_name": "Fahd Moh...",
            "statuscode": 1
            "statecode": 1
        },
        {
            "fs_name": "Majid Moh...",
            "statuscode": 2
            "statecode": 1
        },
        ...etc
    ]
@endcode


@split


@text
- Will return only <kbd>`Top(n)`</kbd> of <kbd>`Courses`</kbd> records with specific fields
@endtext

@code
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Top(1)
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
@endcode

@result
[
    {
        "fs_name": "Fahd Moh...",
        "statuscode": 1
        "statecode": 1
    }
]
@endresult


@split


@text
- Will return all <kbd>`Courses`</kbd> records with specific fields with rename data
@endtext

@code
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Alias({fs_name: "Name", statuscode: "Status"})
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()

    // Old
    [
        {
            "fs_name": "Fahd Moh...",
            "statuscode": 1
            "statecode": 1
        }
    ]

    // New
    [
        {
            "Name": "Fahd Moh...",
            "Status": 1
            "statecode": 1
        }
    ]
@endcode



@Split



@text
- Will return all <kbd>`Courses`</kbd> records with specific fields, its <kbd>`Relations`</kbd> or <kbd>`Relateds`</kbd> then rename data 
@endtext

@code
Xrm
    .xQuery('fs_course')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .WithRelations([
        {relation: "fs_course_teacher_fs_teacherref", select:['fs_courseid', 'new_class', 'fs_degree', 'fs_guid']}
    ])
    .Alias({fs_name: "Name", statuscode: "Status", fs_course_teacher_fs_teacherref: "Teacher"})
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()

    // Old
    [
        {
            "fs_name": "Fahd Moh...",
            "statuscode": 1
            "statecode": 1,
            "fs_course_teacher_fs_teacherref": {...}
        }
    ]

    // New
    [
        {
            "Name": "Fahd Moh...",
            "Status": 1
            "statecode": 1,
            "Teacher": {...}
        }
    ]
@endcode



@Split



@text
- Will return <kbd>`Current Entity Record`</kbd> on the form and rename its fields
@endtext

@code
Xrm
    .xCurrent()
    .Alias({fs_name: "Name", statuscode: "Status"})
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()

    // Old
    {
        "fs_name": "Fahd Moh...",
        "statuscode": 1
        "statecode": 1,
        ...etc
    }

    // New
    {
        "Name": "Fahd Moh...",
        "Status": 1
        "statecode": 1,
        ...etc
    }
@endcode



@text
- Will return <kbd>`Current Entity Record`</kbd> on the form with spesific fields
@endtext

@code
Xrm
    .xCurrent()
    .Select(['fs_name', 'statuscode', 'statecode'])
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()

    //
    {
        "fs_name": "Fahd Moh...",
        "statuscode": "2",
        "statecode": "1",
    }
@endcode



@Split



@text
- Will return <kbd>`Current Entity Record`</kbd> on the form and update it
@endtext

@code
Xrm
    .xCurrent()
    .Update({
        "statecode": 1,
        "statuscode": 2,
        "fs_Teacher@odata.bind": "/fs_teachers(3275cf76-9fea-ef11-be20-7c1e52fce0cd)" // Lookup 
    })
    .then(console.log)
    .catch(console.log)
    .finally()
@endcode



@Split



@text
- Will return spesific fields from <kbd>`fs_teacher`</kbd> lookup field on the form
@endtext

@code
Xrm
    .xFetchLookup('fs_teacher')
    .Select(['statecode'])
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()
@endcode


@Split



@text
- Will return spesific fields from <kbd>`fs_teacher`</kbd> lookup field on the form and bind its
<kbd>`Related Entities`</kbd> data or <kbd>`Relations`</kbd> and renamed them
@endtext

@code
Xrm
    .xFetchLookup('fs_teacher')
    .Select(['fs_name', 'statuscode', 'statecode'])
    .WithRelations([
        {relation: "fs_course_teacher_fs_teacherref", select:['fs_courseid', 'new_class', 'fs_degree', 'fs_guid']}
    ])
    .Alias({fs_course_teacher_fs_teacherref: "Courses"})
    .Get()
    .then(console.log)
    .catch(console.log)
    .finally()

    //
    {
        "fs_name": "Fahd Moh...",
        "statuscode": "2",
        "statecode": "1",
        "Courses": [
            {
                'fs_courseid': "<guid>",
                'fs_class': 12345,
                'fs_degree': 100,
                'fs_guid': "COR-132"
            },
            ...etc
        ]
        ... etc
    }
@endcode
