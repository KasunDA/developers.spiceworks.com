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
`priority` | `string` | Return alerts that are of the specified priority. Can be either `high`, `med`, or `low`.
`created_at` | `object` | Return alerts created within the given range. See [(datetime range)] (/documentation/cloud-apps/api-basics.html#date-time-filtering) documentation for more information.
`alert_item` | `object` | Return alerts based on their associated item properties (see below).

###### Alert Item Options

An alert item is the object associated with the given alert. Both an `id` and `type` must be present.

Name | Type | Description
-----|------|----------------
`id` | `integer` or `string` | Return alerts that are associated with the specified alert item `id` or `none` to get all alerts linked to the specified `type`.
`type` | `string` | Return alerts that are associated with the specified alert item `type`. Can be one of the following: `anti_virus_product`, `device`, `disk`, `physical_disk`, `software_installation`, `interface`, `mobile_device`, `mobile_software_installation`, `network_adapter`, `service_installation`, `hotfix_installation`, `network_user`, `battery_backup`, `battery_backup_event`, `printer_supply`, `event`, `agreement`, `ticket`, `office365_mailbox`, `rackspace_mailbox`, `google_apps_mailbox`, `warranty`, `web_domain`, `cloud_service`, `cloud_service_detection`, `webroot_entry`

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