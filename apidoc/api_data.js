define({ "api": [
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
