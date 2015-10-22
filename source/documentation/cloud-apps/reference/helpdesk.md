# Helpdesk Service

## Tickets

### Requests

#### List tickets

List all tickets visible by the current authenticated user:

```js
card.services('helpdesk').request('tickets'[, options])
```

##### Options

Name | Type | Description
-----|------|--------------
`id` | `array` | Returns tickets whose id is contained within the array of ids.
`assignee`|`integer` or `string`| Return tickets that are assigned to this user.  Can be either a user `id` or the string `none` for unassigned tickets.
`author`|`integer`| Return tickets authored by this user. Must be the user `id`.
`closed_at`|`object`| Return tickets closed within the given range. See [(datetime range)] (/documentation/cloud-apps/api-basics.html#date-time-filtering) documentation for more information.
`created_at`|`object`| Return tickets created within the given range. See [(datetime range)] (/documentation/cloud-apps/api-basics.html#date-time-filtering) documentation for more information.
`due_at`|`object`| Return tickets whose due date is within the given range. See [(datetime range)] (/documentation/cloud-apps/api-basics.html#date-time-filtering) documentation for more information.
`page`|`integer`| The page offset.  Must be between `1` and `page_count`.  Default: `1`
`per_page`|`integer`| Number of entries per page. Must be between `1` and `100`.  Default: `30`
`priority`|`string`| Return tickets with this priority. Can be either `low`, `med`, or `high`.
`site`|`string`| Return tickets by `site.name`.
`sort`|`string`| How to sort the results.  Can be either `updated`, when the ticket was last updated, or `created`, when the ticket was created.  Default: `created`
`status`|`string`| Return tickets with this status. Can be either `open` or `closed`.
`status_updated_at`|`object`| Return tickets whose status was last changed within the given range. See [(datetime range)] (/documentation/cloud-apps/api-basics.html#date-time-filtering) documentation for more information.
`viewed_at`|`object`| Return tickets that were last viewed within the given range. See [(datetime range)] (/documentation/cloud-apps/api-basics.html#date-time-filtering) documentation for more information.
`search`|`object`| Search fields: `summary`, `description`.  See [Searching](/documentation/cloud-apps/api-basics.html#searching) documentation for more information.

##### Response
```js
{
  "meta": {
    "total_entries": 9,
    "page_count": 1,
    "per_page": 30,
    "current_page": 1
  },
  "tickets": [...] // see below for ticket json example
}
```


#### Get a single ticket

```js
card.services('helpdesk').request('ticket', id)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id`|`integer`| The `id` of the ticket

##### Response

Example ticket (note all arrays have been reduced to a single example item):

```js
{
  "id": 53,
  "show_url": "/tickets/list/single_ticket/53",
  "summary": "Keyboard issue",
  "status": "closed",
  "priority": 1,
  "description": "My keyboard is growing mold on it, ned new one.",
  "due_at": null,
  "created_at": "2015-02-08T22:48:46-08:00",
  "updated_at": "2015-02-18T22:48:46-08:00",
  "closed_at": "2015-02-17T22:48:46-08:00",
  "viewed_at": null,
  "reopened": false,
  "muted": null,
  "category": "",
  "master_ticket_id": null,
  "time_spent_duration": "0m",
  "shared": false,
  "billing_rate": null,
  "creator": {
    "id": 11,
    "first_name": "Chris",
    "last_name": "Habanero",
    "role": "end_user",
    "department": null,
    "avatar_path": null,
    "show_url": "/people/11"
  },
  "assignee": {
    "id": 2,
    "first_name": "Mark",
    "last_name": "Jalapeno",
    "role": "admin",
    "department": "IT",
    "avatar_path": null,
    "show_url": "/people/2"
  },
  "site": {
    "name": "Central Server",
    "collector": null
  },
  "users": [
    {
      "id": 2,
      "first_name": "Mark",
      "last_name": "Jalapeno",
      "role": "admin",
      "department": "IT",
      "avatar_path": null,
      "show_url": "/people/2"
    }
  ],
  "comments": [  // Extended Data Access required, else not returned
    {
      "attachment_content_type": null,
      "attachment_name": null,
      "comment_type": "response",
      "created_at": "2015-02-18T22:48:46-08:00",
      "updated_at": "2015-02-18T22:48:46-08:00",
      "id": 70,
      "is_inventory": false,
      "is_labor": null,
      "is_public": true,
      "is_purchase": false,
      "remote_id": null,
      "creator": {
        "id": 2,
        "first_name": "Mark",
        "last_name": "Jalapeno",
        "role": "admin",
        "department": "IT",
        "avatar_path": null,
        "show_url": "/people/2"
      },
      "collaborator": null,
      "body": "Ticket closed."
    }
  ],
  "c_alert_level": "orange",
  "custom_attrs": [
    {
      "name": "c_alert_level",
      "label": "Alert Level",
      "value": "Orange",
      "type": "enum"
    }
  ],
  "alerts": [
    {
      "id": 5052,
      "message": "Due 4 days ago"
    }
  ],
  "inventory_items": [
    {
      "id": 642,
      "show_url": "/inventory/groups/devices/642",
      "name": "embarrassed-dugong",
      "type": "Device",
      "product_info": {
        "description": null,
        "image_url": "//h10003.www1.hp.com/digmedialib/prodimg/lowres/c03889640.jpg",
        "model_name": "ProBook 650 G1",
        "vendor_name": "Hewlett-Packard",
        "avg_rating": null,
        "rating_count": null,
        "category": null
      },
      "can_troubleshoot": true,
      "recent_tickets": 1,
      "tickets_this_year": 1
    }
  ],
  "purchases": [
    {
      "id": 2,
      "name": "Crucial 128MB Module",
      "purchased": false,
      "price": 74.99,
      "product_image": "http://webobjects2.cdw.com/is/image/CDW/225027",
      "part_number": "308878-001-CT",
      "quantity": 1
    }
  ],
  "work": [
    {
      "id": 1,
      "time_spent": 3600,
      "rate": 50.0,
      "labor": 50.0,
      "user": {
        "id": 159,
        "first_name": "Michael",
        "last_name": "Gerbush",
        "role": "admin",
        "department": "DEV",
        "avatar_path": null,
        "show_url":, "/people/159"
      }
    }
  ],
  "collaborations": [
    {
      "id": 1,
      "status": "Pending",
      "created_at": "2014-11-07T18:06:47-06:00",
      "updated_at": "2014-11-07T18:06:47-06:00",
      "collaborator": {
        "id": 2,
        "public_name": "spicerex",
        "url": "http://localhost:9675/people/2",
        "first_name": "Spice",
        "last_name": "Rex",
        "avatar_path": null,
        "role": "collaborator"
      }
    }
  ]
}
```

#### Create a ticket

Create a ticket with the given parameters

```js
card.services('helpdesk').request('ticket:create', attributes)
```

##### Attributes

Name | Type | Description
-----|------|--------------
`summary`|`string`| **Required**.  A short description of the request.
`description`|`string`| Full description of the request.
`assignee`|`integer`| The IT pro the ticket is assigned to.  Must be an IT pro `id`.
`priority`|`string`| The priority of the request. Must be `low`, `med`, or `high`.  Default: `med`.
`due_at`|`string`| Due date of the request.  Must be a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
`status`|`string`| The current status of the request. Must be `open` or `closed`.  Default: `open`.
`billing_rate`|`double`| Default billing rate (per hour) for ticket work. Default: `null`, defaults to each IT Pro's billing rate. 
`inventory_items`|`array`| A list of items from inventory related to the ticket.  Must be an array of objects containing an `id` and a `type` property for a valid inventory item.

##### Response

This request will return the created ticket, see the [single ticket response JSON](#response-1).

#### Update a ticket

Update a ticket with the given parameters

```js
card.services('helpdesk').request('ticket:update', id, attributes)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id`|`integer`| The `id` of the ticket
`attributes`|`object`| See below for detailed requirements

##### Attributes

Unless specified otherwise below, attributes not present will remain unchanged.

Name | Type | Description
-----|------|--------------
`summary`|`string`| A short description of the request.
`description`|`string`| Full description of the request.
`assignee`|`integer`| The IT pro the ticket is assigned to. Must be an IT pro `id` or `null` to unassign the ticket.
`priority`|`string`| The priority of the request. Must be `low`, `med`, or `high`.
`due_at`|`string`| Due date of the request.  Must be a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
`status`|`string`| The current status of the request. Must be `open` or `closed`.
`billing_rate`|`double`| Default billing rate (per hour) for ticket work. 
`inventory_items`|`array`| A list of items from inventory related to the ticket.  Must be an array of objects containing an `id` and a `type` property for a valid inventory item.


##### Response

This request will return the updated ticket, see the [single ticket response JSON](#response-1).

#### Create a comment

Create a comment with the given parameters

```js
card.services('helpdesk').request('comment:create', ticket_id, attributes)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`ticket_id`|`integer`| The `id` of the ticket where this comment will be appended.
`attributes`|`object`| See below for detailed requirements

##### Attributes

Name | Type | Description
-----|------|--------------
`body`|`string`| **Required**. The content of the comment.
`public`|`boolean`|Whether the ticket will be a public comment or an internal note.  Default: `true`.

##### Response

This request will return a comment object like those in the `comments` array in the
[ticket response JSON](#response-1).  Example comment response:

```json
{
  "attachment_content_type": null,
  "attachment_name": null,
  "comment_type": "response",
  "created_at": "2015-02-18T22:48:46-08:00",
  "updated_at": "2015-02-18T22:48:46-08:00",
  "id": 70,
  "is_inventory": false,
  "is_labor": null,
  "is_public": true,
  "is_purchase": false,
  "remote_id": null,
  "creator": {
    "id": 2,
    "first_name": "Mark",
    "last_name": "Jalapeno",
    "role": "admin",
    "department": "IT",
    "avatar_path": null,
    "show_url": "/people/2"
  },
  "collaborator": null,
  "body": "What a great ticket!"
}
```

#### Add work

Add work time to a ticket

```js
card.services('helpdesk').request('work:create', ticket_id, attributes)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`ticket_id`|`integer`| The `id` of the ticket where the work will be appended.
`attributes`|`object`| See below for detailed requirements

##### Attributes

Name | Type | Description
-----|------|--------------
`time_spent`|`integer`| **Required**. Seconds of time to add.
`user`|`integer`| IT Pro who performed the work. Must be an IT Pro `id`. Defaults to the logged in user.

##### Response

This request will return a work object like those in the `work` array in the
[ticket response JSON](#response-1).  Example work response:

```json
{
  "id": 10,
  "time_spent": 3600,
  "rate": 50.0,
  "labor": 50.0,
  "user": {
    "id": 159,
    "first_name": "Michael",
    "last_name": "Gerbush",
    "role": "admin",
    "department": "DEV",
    "avatar_path": null,
    "show_url":, "/people/159"
  }
}
```

#### Update work

Updates a previous work time entry on a ticket. 

**Note:** Using this API rewrites the history of work done for a ticket and therefore 
should be reserved only to fix previous, erroneous work entries. New work should
be added with the [add work](#add-work) API.

```js
card.services('helpdesk').request('work:update', ticket_id, id, attributes)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`ticket_id`|`integer`| The `id` of the **ticket** for which work will be updated.
`id`|`integer`| The `id` of the **work object** from the ticket `work` array.
`attributes`|`object`| See below for detailed requirements

##### Attributes

Unless specified otherwise below, attributes not present will remain unchanged.

Name | Type | Description
-----|------|--------------
`time_spent`|`integer`| Seconds of work time spent.
`rate`|`double`| Billing rate (per hour) for the work entry.

##### Response

This request will return the updated work object like those in the `work` array in the
[ticket response JSON](#response-1).  Example work response:

```json
{
  "id": 10,
  "time_spent": 3600,
  "rate": 50.0,
  "labor": 50.0,
  "user": {
    "id": 159,
    "first_name": "Michael",
    "last_name": "Gerbush",
    "role": "admin",
    "department": "DEV",
    "avatar_path": null,
    "show_url":, "/people/159"
  }
}
```

### Events

#### Show ticket

Fired after a new ticket is rendered inside the Spiceworks Help Desk.

```js
card.services('helpdesk').on('showTicket', handler)
```

##### Handler arguments

Name | Type | Description
-----|------|--------------
`id`|`integer`| The id of the ticket that was rendered.
