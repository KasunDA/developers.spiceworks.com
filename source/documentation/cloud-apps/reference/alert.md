# Alert Service

The alert service gives you access to the alerts within Spiceworks and allows existing alerts to be read as well as the creation of new alerts.

## Alerts

### Requests

#### List alerts

List all alerts which have been triggered:

```js
card.services('alert').request('alerts'[, options])
```

##### Options

Name | Type | Description
-----|------|----------------
`active` | `boolean` | Return alerts that are currently active or inactive.
`ticket_id` | `integer` | Return alerts that are associated with the specified `ticket_id`
`created_at` | `object` | Return alerts created within the given range. See [(datetime range)] (/documentation/cloud-apps/api-basics.html#date-time-filtering) documentation for more information.
`device` | `object` | Return alerts based on their device properties (see below).

###### Device Options

Name | Type | Description
-----|------|----------------
`id` | `integer` | Return alerts that are associated with the specified device `id`.
`name` | `string` | Return alerts that are associated with the specified device `name`.
`manufacturer` | `string` | Return alerts that are associated with the specified device `manufacturer`.
`model` | `string` | Return alerts that are associated with the specified device `model`.

##### Response
```js
{
  "meta": {
    "total_entries": 40,
    "page_count": 2,
    "per_page": 30,
    "current_page": 1
  },
  "alerts": [...] // see below for alert json example
}
```

#### Get a single alert

```js
card.services('alert').request('alert', id)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id` | `integer` | The `id` of the alert

##### Response

Example alert (note all arrays have been reduced to a single example item):

```js
{
  "id": 13,
  "title": "Waste Toner",
  "message": "",
  "active": true,
  "created_at": "2015-02-21T00:47:04-06:00",
  "updated_at": "2015-02-27T03:12:36-06:00",
  "ticket_id": null,
  "device": {
    "id": 479,
    "name": "My Device",
    "manufacturer": "Hewlitt-Packard",
    "model": "ProBook 6460b"
  }
}
```