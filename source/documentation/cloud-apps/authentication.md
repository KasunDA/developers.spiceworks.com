> **Note:** Currently, if you want to allow seamless authentication to your App
using the Spiceworks Login API described below, you must apply to receive an App
UID and secret. [Apply here
now][access_token_request_link].

# Authentication

Typical web sites and web applications identify and authenticate users
by using email- or username-based logins with passwords, or they delegate
part of this responsibility to an OAuth2 provider like Facebook Login
or Google+ Sign-In.

While your cloud app is free to implement its own forms-based or OAuth2
registration and login system, this doc will cover how to use the
Spiceworks SDK to authenticate users and altogether avoid login forms
and login buttons.

By following the steps in this guide, your cloud app will be able to
authenticate a login session for the Spiceworks user accessing your app.
Further, if your cloud app costs money in the Spiceworks App Center,
following the steps of this guide will ensure the user accessing your
app is authorized to do so.

### Background

Your cloud app built for Spiceworks is a web application that will be
embedded within the Spiceworks Desktop application (a.k.a. the host
application) within an &lt;iframe&gt;. From within this container, your
JavaScript can leverage the Spiceworks SDK to obtain information from
the Spiceworks host application about its environment.

The Spiceworks SDK will communicate between the &lt;iframe&gt; containing your
cloud app and the parent window of the Spiceworks host application.
Because the user has already authenticated to the Spiceworks host application,
these APIs will rely on that trust so that you can establish an
OAuth2-authenticated session to your canvas app while never prompting
the user to login.

### Step 1: Obtain the current user identifier

Identifying the current Spiceworks user in your canvas app requires
JavaScript to extract the user information with the Spiceworks SDK.
Do this using the `environment` service:

```js
var card = new SW.Card();
card.services('environment').request('environment').then(
  function(environment){
    /* details below */
  ));
```

```json
{
  "app_host":
    {
      "auid": "92a450d9a3e596d7bef9ed9853b6a454"
    },
  "user":
    {
      "id": 159,
      "user_auid": "e34e59c92f43b49f9725a29f86632c12",
      "first_name": "Jolly",
      "last_name": "Fellow"
    }
}
```

**_Note:_** *Additional details omitted from the JSON above.*

#### Environment

Using the `environment` object, you can now uniquely identify the hosting
application and/or the Spiceworks user of your cloud app.

Name|Type|Description
----|----|-----------
`app_host.auid`|`string`|Uniquely identifies the Spiceworks app into which your cloud app is installed
`user.user_auid`|`string`|Uniquely identifies the Spiceworks user accessing your cloud app
`user.id`|`integer`|Identifies the Spiceworks user, but scoped only to this Spiceworks host application
`user.first_name`|`string`|The user's first name
`user.last_name`|`string`|The user's last name

Both `app_host.auid` and `user.user_auid` are application-unique identifiers. This means they
are unique to your cloud app alone. If the same real-life user installs your
cloud app into a different installation of Spiceworks, you will see
a different `app_host.auid` but the same `user.user_auid`. Also, if you build more than one
cloud app, the same real-life user from the same install of Spiceworks will be
identified with a different pair of values to each of your two cloud apps.

### Step 2: Obtain an OAuth2 access token

> **Note:** Currently, to use this API you must apply to receive an App UID
(`appUid`) and secret. [Apply here
now][access_token_request_link].

An OAuth2 access token is like a temporary password granted to your cloud app
on behalf of the Spiceworks user without the Spiceworks user having to
give you his or her password directly.

Using the `Login` object while inside of a Spiceworks host application will
automatically grant you an OAuth2 access token without forcing the user to
reauthenticate with Spiceworks:

```js
var login = new SW.Login({appUid: "your-oauth2-application-id"});
login.request('login').then(
  function(access_token){
    /* success! */
  },
  function(errors){
    /* oh no! */
  });
```

#### Login parameters

Parameter|Type|Description
---------|----|-----------
`appUid`|`string`|The OAuth2 application identifier generated for you when you first created your cloud app with Spiceworks

> **Note:** Handle the returned `access_token` with care and never request access
> tokens unnecessarily. OAuth2 requires that you __always use HTTPS/SSL__ when
> transmitting access tokens. Never transmit an access token "in the clear".

### Step 3: Use the OAuth2 token to authenticate the user

At this point, your JavaScript is free to use the Spiceworks SDK to do
cool and amazing things inside the browser. However, at some point you're
going to want the user to access some protected area of your cloud app, or
you're going to want to store some user or environment data in your server.
To restrict access and protect data, you need to use the details
collected earlier to complete a login to your cloud app.

#### Step 3a. Submit the login details to your server

A typical form-based login passes a username and password securely
to the server where it is verified. In this case, the "username" is
the combination of `environment.app_host.auid` and
`environment.user.user_auid`, and the "password" is the
`access_token` provided by the `Login` object.

##### Example with jQuery AJAX

```js
$.post('https://your-server/sign_in', {
    host_auid: environment.app_host.auid,
    user_auid: environment.user.user_auid,
    access_token: access_token
  });
```

##### Example with JavaScript and an HTML FORM

```html
<form id="login-form" action="https://your-server/sign_in" method="post">
  <input type="hidden" id="login-host_auid" name="host_auid">
  <input type="hidden" id="login-user_auid" name="user_auid">
  <input type="hidden" id="login-access_token" name="access_token">
</form>
```
```js
document.getElementById('login-host_auid').value = environment.app_host.auid;
document.getElementById('login-user_auid').value = environment.user.user_auid;
document.getElementById('login-access_token').value = access_token;
document.getElementById('login-form').submit();
```

#### Step 3b. Verify the OAuth2 token with Spiceworks

> **Note:** Currently, to use this API you must apply to receive an App UID and
secret (`app_secret`). [Apply here
now][access_token_request_link].

Recall that an OAuth2 access token is like a temporary password granted
to your cloud app. Even if it were the real user's password, you would
need to "ask" Spiceworks whether the password was right before trusting the
user. OAuth2 is no different; your server needs to verify the authenticity
of the access token with Spiceworks.

Once the credentials have been passed to your server,
**your server submits them to Spiceworks** for verification at
https://frontend.spiceworks.com/appcenter/api/app_user_authorization
by passing the following parameters:

Key|Value
---|-----
`host_auid`|The host identifier obtained from `environment.app_host.auid` in step 1
`user_auid`|The user identifier obtained from `environment.user.user_auid` in step 1
`access_token`|The access token obtained from the `Login` object in step 2
`app_secret`|The OAuth2 secret key generated for you when you first created your cloud app with Spiceworks

> **Note:** Your OAuth2 `app_secret` must be protected as confidentially as
> possible! Never embed this value in a public code repository, do not log
> this value in your log files, and never pass this value to any service besides
> Spiceworks. __The only time you will ever use this value in production is to
> authenticate your application's identity to Spiceworks, and only over HTTPS/SSL.__

In response, you will receive an `HTTP 200 OK` result with authorization information:

```json
{
 "authorization":
   {
     "namespace": "your-app-namespace",
     "host_auid": "92a450d9a3e596d7bef9ed9853b6a454",
     "user_auid": "e34e59c92f43b49f9725a29f86632c12"
   }
}
```

If the user is not authorized you will receive an `HTTP 403 Forbidden` result with error information:

```json
{
 "errors": ["User is not authorized for your application"]
}
```


##### Example with cURL

```bash
$ curl -G -X GET -H "Accept: application/json" \
-d "access_token=814bd50cb926cfaebea353dd8b5f704def9e04b77372eed01f0d26f1d602e108" \
-d "app_secret=bfda03b8c726a62309fe624f0ba4228b6a2e0cd8c5c4d518ded4758e43ac21c3" \
-d "host_auid=92a450d9a3e596d7bef9ed9853b6a454" \
-d "user_auid=e34e59c92f43b49f9725a29f86632c12" \
https://frontend.spiceworks.com/appcenter/api/app_user_authorization
```

##### Example with Ruby

```ruby
require 'net/http'
require 'json'

uri = URI('https://frontend.spiceworks.com/appcenter/api/app_user_authorization.json')
uri.query = URI.encode_www_form({
  access_token: '814bd50cb926cfaebea353dd8b5f704def9e04b77372eed01f0d26f1d602e108',
  app_secret: 'bfda03b8c726a62309fe624f0ba4228b6a2e0cd8c5c4d518ded4758e43ac21c3',
  host_auid: '92a450d9a3e596d7bef9ed9853b6a454',
  user_auid: 'e34e59c92f43b49f9725a29f86632c12'
})

JSON.parse Net::HTTP.get(uri)
```

### Best practices

#### Cookie-based sessions

While it's technically possible to use the Spiceworks SDK on every web page of
your canvas app to request an access token and validate it with Spiceworks,
you probably wouldn't do that if every attempt forced the user to supply his
password, right? No! You'd probably authenticate the user's password once, and
then you'd probably use some sort of browser cookie-based mechanism for
maintaining a "login session" with your web site.

OAuth2-based login systems should be no different. True, the user isn't
mentally "taxed" to repeatedly enter his or her password. However, there is
"tax" in the cost of AJAX and server-side requests to issue and verify tokens.

Once you have completed steps 1-3 above, you have established authenticity
of the Spiceworks host application and of the current user logged into Spiceworks.
At this point, please establish a trusted cookie with the browser to maintain
the login session, at least for a reasonable period of time.

#### Authorization

Usually when developers talk about authentication, a conversation about
authorization is not too far away. Within Spiceworks host applications,
the options are effectively limited to combinations of the following
two authorization schemes. How you decide to authorize users inside of
your cloud app probably depends on whether you want users sharing
information or not.

##### 1. Per-user

One option is that each user is authorized to create, update, delete, or
otherwise interact with resources specific to him- or herself.

##### 2. Per-Spiceworks host application

Another option is that every user within the same Spiceworks host application
(as identified by the `environment.app_host.host_auid` value) shares access
rights with the other users of the same Spiceworks host application.

### Further reading

* [Spiceworks App API Basics](/documentation/cloud-apps/api-basics.html)
* [Spiceworks Environment API Reference](/documentation/cloud-apps/reference/environment.html)
* [OAuth 2.0](http://oauth.net/2/)

[access_token_request_link]: http://www.surveygizmo.com/s3/2206835/Spiceworks-App-Center-Access-Token-Request
