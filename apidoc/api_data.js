define({ "api": [
  {
    "type": "get",
    "url": "course/{courseTitle}/stats?absence={numberOfAbsences}",
    "title": "Absence statistics",
    "group": "Attendance",
    "description": "<h2>Get list of students who have missed at least the given number of days</h2> <ul> <li>admin only</li> <li>will return list of students and the number of absences they have (only if there number of absences is greater than the number provided)</li> <li>searching for 0 absences will return full list of students and their number of absences</li> </ul>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Cookie",
            "description": "<p>session cookie</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URL parameter": [
          {
            "group": "URL parameter",
            "type": "String",
            "optional": false,
            "field": "courseTitle",
            "description": "<p>The title of the course</p>"
          }
        ],
        "Query parameter": [
          {
            "group": "Query parameter",
            "type": "int",
            "optional": true,
            "field": "numberOfAbsences",
            "defaultValue": "0",
            "description": "<p>Students will be returned if they have at least this many absences</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "URL and Query Parameter Example",
          "content": "http://127.0.0.1:8000/api/course/SWE4103/stats?absences=2",
          "type": "json"
        },
        {
          "title": "Header Example",
          "content": "{\n  Content-Type: application/json\n  Cookie: sessionID=344d94eb4a904b37fcc82305ab67d14f\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "students",
            "description": "<p>Contains &quot;name&quot; and &quot;absenceCount&quot; for each student with at least as many absences as numberOfAbsences</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The username of one student</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "absenceCount",
            "description": "<p>The total number of absences a student has on record</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>Successfully found and returned information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Get absences=0",
          "content": "http://127.0.0.1:8000/api/course/SWE4103/stats?absences=0\n\n{\n  \"students\": [\n    {\"name\": \"Wirt, Jr.\", \"absenceCount\": 0},\n    {\"name\": \"George Washington\", \"absenceCount\": 4},\n    {\"name\": \"J. Funderburker\", \"absenceCount\": 3}\n  ],\n}",
          "type": "json"
        },
        {
          "title": "Get absences=3",
          "content": "http://127.0.0.1:8000/api/course/SWE4103/stats?absences=3\n\n{\n  \"students\": [\n    {\"name\": \"George Washington\", \"absenceCount\": 4}\n    {\"name\": \"J. Funderburker\", \"absenceCount\": 3}\n  ],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Invalid session</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Session does not belong to admin, or courseTitle was not provided, or matching course could not be found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controllers/attendance.controller.js",
    "groupTitle": "Attendance",
    "name": "GetCourseCoursetitleStatsAbsenceNumberofabsences"
  },
  {
    "type": "post",
    "url": "course",
    "title": "Create course",
    "group": "Course",
    "description": "<h2>Admin only method that creates a course and corresponding course grid.</h2>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Cookie",
            "description": "<p>session cookie</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the course (must be unique)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "term",
            "description": "<p>Defines what term the course falls in</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer[]",
            "optional": false,
            "field": "gridsize",
            "description": "<p>X by Y grid for the seating arrangement</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "time",
            "description": "<p>Time and days in which the course falls</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "courseGrid",
            "description": "<p>Array containing the course grid as specified by the professor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailTemplate",
            "description": "<p>Template of the emails that this course will send to students</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer[]",
            "optional": false,
            "field": "numDays",
            "description": "<p>Number of days a student can miss for this class</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Parameter Example",
          "content": "{\n  \"title\": \"Class101\",\n  \"term\": \"Fall 2017\",\n  \"gridsize\": [3,2],\n  \"time\": \"TTh 10:30-11:20am\",\n  \"courseGrid\": [[\"\",\"\",\"\"],\n                 [\"\",\"\",\"\"]],\n  \"emailTemplate\": \"You have missed too much class.\",\n  \"numDays\": [5]\n}",
          "type": "js"
        },
        {
          "title": "Header Example",
          "content": "{\n  Content-Type: application/json\n  Cookie: sessionID=344d94eb4a904b37fcc82305ab67d14f\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>Course created successfully</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>required arguments are missing, or course title contains invalid characters, or gridsize is &lt;= 1, or title is already taken</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>session is not valid or the user is not an admin</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controllers/course.controller.js",
    "groupTitle": "Course",
    "name": "PostCourse"
  },
  {
    "type": "get",
    "url": "logout",
    "title": "Logout",
    "group": "User",
    "description": "<h2>Logout from current session</h2> <ul> <li>logging out will remove the session record from the database</li> <li>takes no parameters</li> </ul>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Cookie",
            "description": "<p>session cookie</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Header Example",
          "content": "{\n  Content-Type: application/json\n  Cookie: sessionID=344d94eb4a904b37fcc82305ab67d14f\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>Session removed successfully</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>The provided session was not successfully removed from the database</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controllers/login.controller.js",
    "groupTitle": "User",
    "name": "GetLogout"
  },
  {
    "type": "post",
    "url": "login",
    "title": "Login",
    "group": "User",
    "description": "<h2>Login with username &amp; password, or session</h2> <ul> <li>username and password are not checked (and not needed) if a valid session is provided.</li> <li>username and isAdmin are NOT returned if the session is valid.</li> </ul>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Cookie",
            "description": "<p>session cookie</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username provided by the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password provided by the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Parameter Example",
          "content": "{\n  \"username\": \"admin\",\n  \"password\": \"password\"\n}",
          "type": "json"
        },
        {
          "title": "Header Example",
          "content": "{\n  Content-Type: application/json\n  Cookie: sessionID=344d94eb4a904b37fcc82305ab67d14f\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username (only returned if valid session was not provided)</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>Users isAdmin property (only returned if valid session was not provided)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful login with credentials",
          "content": "HTTP 200 OK\n{\n  \"username\": \"admin\",\n  \"isAdmin\": True\n}",
          "type": "json"
        },
        {
          "title": "Successful login with sessionID",
          "content": "HTTP 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Username or password was not provided</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Login unsuccessful</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controllers/login.controller.js",
    "groupTitle": "User",
    "name": "PostLogin"
  },
  {
    "type": "post",
    "url": "signup",
    "title": "Signup",
    "group": "User",
    "description": "<h2>Create account for new user</h2>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Cookie",
            "description": "<p>session cookie</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username provided by the user (must be unique)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password provided by the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email provided by the user, without @unb.ca (must be unique)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "defaultValue": "False",
            "description": "<p>Whether user is an admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Parameter Example",
          "content": "{\n  \"usename\": \"administrator\",\n  \"password\": \"entropy\",\n  \"email\": \"admin.01\",\n  \"isAdmin\": True\n}",
          "type": "json"
        },
        {
          "title": "Header Example",
          "content": "{\n  Content-Type: application/json\n  Cookie: sessionID=344d94eb4a904b37fcc82305ab67d14f\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>User created successfully</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>required arguments are missing, or password is length is not &gt;=6 &amp; &lt;=20 characters, or user could not be created (username or email may be taken)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>user not created, but no error thrown by the database</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controllers/login.controller.js",
    "groupTitle": "User",
    "name": "PostSignup"
  }
] });