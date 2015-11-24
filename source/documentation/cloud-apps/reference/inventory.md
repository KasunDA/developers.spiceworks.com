# Inventory Service

The inventory service gives you access to the network device and asset inventory
managed within Spiceworks. Inventory includes [Devices](#devices) and [Software](#software).

## Devices

### Requests

#### List devices

List all devices visible by the current authenticated user:

```js
card.services('inventory').request('devices'[, options])
```

##### Options

Name | Type | Description
-----|------|--------------
`id` | `array` | Returns devices whose id is contained within the array of ids.
`scan_state`|`string`| Return devices that were in this state during the last scan. Can be either `'inventoried'`,  `'manual'`, or `'unknown'`.
`owner`|`integer`| id corresponding to the owner of the device or asset. See [People](/documentation/cloud-apps/reference/people.html#people-service) documentation for more information.
`offline_at`|`object`([datetime range](/documentation/cloud-apps/api-basics.html#date-time-filtering))| Return devices that were last noticed offline within the given [datetime range](/documentation/cloud-apps/api-basics.html#date-time-filtering).
`online_at`|`object`([datetime range](/documentation/cloud-apps/api-basics.html#date-time-filtering))| Return devices that were last noticed online within the given [datetime range](/documentation/cloud-apps/api-basics.html#date-time-filtering).
`online`|`boolean`| Return only devices that are online if `true` or offline if `false`.
`last_scanned_at`|`object`([datetime range](/documentation/cloud-apps/api-basics.html#date-time-filtering))| Return devices that were last scanned within the given [datetime range](/documentation/cloud-apps/api-basics.html#date-time-filtering).
`operating_system`|`string`| Return devices running the operating system `operating_system`.
`model`|`string`| Return devices with model name `model`.
`manufacturer`|`string`| Return devices manufactured by `manufacturer`.
`device_type`|`string`| Return only devices that match this `device_type`. Users can add custom types, but the default device types are: `Desktop`, `Laptop`, `Server`, `Fax`, `Firewall`, `Copier`, `Router`, `NetworkPrinter`, `Unknown`, `Switch`, `Hub`, `HttpDevice`, `VoipDevice`, `Wireless`, `SnmpDevice`, `NAS`, `Ilo`, `IloOA`, `Tablet`, and `Smartphone`.
`search`|`object`| Search fields: `manufacturer`, `model`, `name`, `operating_system`, `software.name`, `software.display_name`, `software.vendor`.  See [Searching](/documentation/cloud-apps/api-basics.html#searching) documentation for more information.

##### Response
```js
{
  "meta": {
    "total_entries": 166,
    "page_count": 6,
    "per_page": 30,
    "current_page": 1
  },
  "devices": [...] // see below for device json example
}
```

#### Get a single device

```js
card.services('inventory').request('device', id)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id`|`integer`| The `id` of the device

##### Response

Example computer (note all arrays have been reduced to a single example
item):

```js
{
  "id": 2,
  "show_url": "/inventory/groups/devices/2",
  "type": "Computer",
  "primary_owner_name": "Harry Houdini", // Extended Data Access (People) required
  "server_name": "jolly-capybara.example.com",
  "name": "jolly-capybara",
  "domain": "example.com",
  "manually_added": false,
  "device_type": "Laptop",
  "description": "AT/AT COMPATIBLE",
  "location": null,
  "product_info": {
    "description": null,
    "image_url": "//h10003.www1.hp.com/digmedialib/prodimg/lowres/c03889640.jpg",
    "model_name": "ProBook 650 G1",
    "vendor_name": "Hewlett-Packard",
    "avg_rating": null,
    "rating_count": null,
    "category": null
  },
  "manufacturer": "Hewlett-Packard",
  "model": "ProBook 650 G1",
  "memory": 17088729088,
  "os_architecture": "64 bit",
  "number_of_processors": 1,
  "processor_architecture": "x64",
  "processor_type": "Intel Core i5-4200M 2.50GHz",
  "kernel": null,
  "operating_system": "Windows 7 Pro",
  "version": "6.1.7601",
  "service_pack_major_version": 1,
  "service_pack_minor_version": 0,
  "windows_product_id": "00371-868-0000007-85065",
  "management_oid": null,
  "number_of_licensed_users": 0,
  "bios_date": "2013-12-05T00:00:00-08:00",
  "bios_version": "L77 Ver. 01.02",
  "page_count": null,
  "mac_address": "E1:19:B5:F9:9C:A2",             // Extended Data Access required, else not returned
  "ip_address": "3.247.227.245",                  // Extended Data Access required, else not returned
  "ip_comparable": 66577397,                      // Extended Data Access required, else not returned
  "os_serial_number": "81386-805-2882254-33720",  // Extended Data Access required, else not returned
  "asset_tag": "3B71E7EF7A",                      // Extended Data Access required, else not returned
  "serial_number": "3B71E7EF7A",                  // Extended Data Access required, else not returned
  "uuid": "332A52FA-6EAF-86A6-3FE1-A340835369B1", // Extended Data Access required, else not returned
  "created_at": "2015-02-01T12:56:38-08:00",
  "updated_at": "2015-02-19T02:26:01-08:00",
  "scan_state": "inventoried",
  "install_date": "2014-05-30T20:40:42-07:00",
  "last_backup_time": null,
  "last_boot_up_time": "2015-02-04T10:57:36-08:00",
  "last_qrcode_time": null,
  "last_scan_time": "2015-02-04T13:50:48-08:00",
  "offline_at": "2015-02-02T01:21:31-08:00",
  "online_at": "2015-02-04T13:50:48-08:00",
  "online": true,
  "up_time": null,
  "owner": {
    "avatar_path": "/images/icons/medium/person-avatar-admin.png",
    "department": "IT",
    "first_name": "Harry",
    "id": 2,
    "last_name": "Houdini",
    "role": "admin",
    "show_url": "/people/2"
  },
  "site": {
    "name": "Central Server",
    "collector": null
  },
  "network_adapters": [
    {
      "name": "NETwNs64",
      "net_connection_id": "Wireless Network Connection",
      "description": "Intel(R) Centrino(R) Advanced-N 6235",
      "ip_address": "242.2.223.202",                           // Extended Data Access required, else not returned
      "ip_comparable": 4060274634,                             // Extended Data Access required, else not returned
      "gateway": "34.240.52.162",                              // Extended Data Access required, else not returned
      "net_mask": "255.255.252.0",                             // Extended Data Access required, else not returned
      "mac_address": "4A:4D:11:16:65:97",                      // Extended Data Access required, else not returned
      "dns_domain": "example.com",                             // Extended Data Access required, else not returned
      "dns_servers": "8.48.12.14 153.95.118.87 183.25.121.27", // Extended Data Access required, else not returned
      "dhcp_enabled": "true",                                  // Extended Data Access required, else not returned
      "dhcp_server": "179.207.148.94",                         // Extended Data Access required, else not returned
      "ip_addresses": [                                        // Extended Data Access required, else not returned
        "10.10.48.35",
        "fe80::9c43:4df5:dc5b:1252"
      ]
    }
  ],
  "video_adapters": [
    {
      "name": "Intel(R) HD Graphics 4600",
      "device_name": "VideoController1",
      "drivers": [
        "igdumdim64.dll",
        "igd10iumd64.dll",
        "igd10iumd64.dll",
        "igdumdim32",
        "igd10iumd32",
        "igd10iumd32"
      ],
      "driver_version": "9.18.10.3324",
      "driver_date": "2013-10-07T00:00:00-07:00",
      "video_processor": "Intel(R) HD Graphics Family"
    }
  ],
  "monitors": [
    {
      "name": "Generic PnP Monitor",
      "manufacturer": "Samsung Electric Co",
      "model": "S24C200",
      "screen_height": 1080,
      "screen_width": 1920,
      "monitor_type": "Generic PnP Monitor",
      "manufacturer_date": "2014-04-28",
      "serial_number": "14959821"  // Extended Data Access required, else not returned
    }
  ],
  "printers": [
    {
      "name": "Fax",
      "default": "false",
      "print_processor": "winprint",
      "printer_device": "Fax",
      "horizontal_resolution": "200",
      "vertical_resolution": "200"
    }
  ],
  "peripherals": [
    {
      "name": "Generic Bluetooth Adapter",
      "manufacturer": "Intel Corp.",
      "product_identifier": "07DA",
      "vendor_identifier": "8087",
      "service": "BTHUSB",
      "source": "USB",
      "status": "OK",
      "windows_device_id": "USB\\VID_8087&PID_07DA"
    }
  ],
  "memory_slots": [
    {
      "name": "Top - Slot 1 (top)",
      "status": "",
      "memory_type": "",
      "speed": "1600",
      "size": 8589934592,
      "max_capacity": 8589934592
    },
    {
      "name": "Top - Slot 2 (under)",
      "status": "",
      "memory_type": "",
      "speed": "1600",
      "size": 8589934592,
      "max_capacity": 8589934592
    }
  ],
  "logical_disks": [
    {
      "name": "C:",
      "description": "Local Disk",
      "file_system": "NTFS",
      "free_space": 31873048576,
      "size": 255953203200,
      "volume_name": null
    }
  ],
  "physical_disks": [
    {
      "name": "0",
      "manufacturer": null,
      "model": "HGST HTS725050A7E630 ATA Device",
      "size": 500105249280,
      "status": "OK",
      "interface": "IDE",
      "firmware": "GH2OA910",
      "failure_prediction": "enabled",
      "is_solid_state": true,
      "partitions": [
        {
          "name": "Disk #0, Partition #0",
          "partition_type": null,
          "size": 104857600,
          "starting_offset": 1048576,
          "free_space": 0
        },
        {
          "name": "Disk #0, Partition #1",
          "partition_type": null,
          "size": 255953207296,
          "starting_offset": 105906176,
          "free_space": 31873052672
        }
      ],
      "serial_number": "02394654" // Extended Data Access required, else not returned
    }
  ],
  "software": [
    {
      "id": 8,
      "show_url": "/inventory/software/applications/8",
      "name": "7-Zip",
      "display_name": "7-Zip 9.20 (x64 edition)",
      "version": "9.20.00.0",
      "vendor": "Igor Pavlov",
      "summary": null,
      "url_about_info": "http://www.7-zip.org/",
      "url_update_info": "http://www.7-zip.org/download.html",
      "install_date": "2014-05-14",
      "install_location": null,
      "uninstall_string": "MsiExec.exe /I{23170F69-40C1-2702-0920-000001000000}",
      "identity": "{23170F69-40C1-2702-0920-000001000000}",
      "product_key": null  // Extended Data Access required, else not returned
    }
  ]
}
```

##### Switch Response

Example switch (note all arrays have been reduced to a single example
item):

```js
{
  "id": 475,
  "type": "SnmpDevice",
  "primary_owner_name": "Steve Jobs",
  "server_name": "clean-octopus.example.com",
  "name": "clean-octopus",
  "domain": "example.com",
  "manually_added": false,
  "device_type": "Switch",
  "description": "Cisco IOS Version: 12.2(58)SE2 Model: WS-C2960S-48FPD-L",
  "location": null,
  "manufacturer": "Cisco",
  "model": "WS-C2960S-48FPD-L",
  "memory": 0,
  "os_architecture": null,
  "number_of_processors": null,
  "processor_architecture": null,
  "processor_type": null,
  "kernel": null,
  "operating_system": "Cisco IOS",
  "version": "12.2(58)SE2",
  "service_pack_major_version": null,
  "service_pack_minor_version": null,
  "windows_product_id": null,
  "management_oid": "1.3.6.1.4.1.9.1.1208",
  "number_of_licensed_users": null,
  "bios_date": null,
  "bios_version": null,
  "page_count": null,
  "mac_address": null,                // Extended Data Access required, else not returned
  "ip_address": "48.188.254.146",     // Extended Data Access required, else not returned
  "ip_comparable": 817692306,         // Extended Data Access required, else not returned
  "os_serial_number": null,           // Extended Data Access required, else not returned
  "asset_tag": null,                  // Extended Data Access required, else not returned
  "serial_number": "48.188.254.146",  // Extended Data Access required, else not returned
  "uuid": null,                       // Extended Data Access required, else not returned
  "created_at": "2015-02-04T16:25:35-06:00",
  "updated_at": "2015-02-05T14:52:38-06:00",
  "scan_state": "inventoried",
  "install_date": null,
  "last_backup_time": null,
  "last_boot_up_time": "2014-04-15T22:04:44-05:00",
  "last_qrcode_time": null,
  "last_scan_time": "2015-02-04T17:18:18-06:00",
  "offline_at": null,
  "online_at": "2015-02-04T17:18:18-06:00",
  "online": true,
  "up_time": null,
  "owner": null,
  "site": {
    "name": "Central Server",
    "collector": null
  },
  "vlans": [
    {
      "vlan": "Wireless VLAN",
      "ports": [
        {
          "name": "TenGigabitEthernet2/0/1",
          "neighbors": [    // Extended Data Access required, else not returned
            {
              "ip_address": null,
              "mac_address": "02:21:16:08:9C:B7",
              "status": "learned"
            }
          ]
        }
      ]
    }
  ],
  "ports": [
    {
      "name": "Vlan1",
      "speed": 1000000000,
      "if_type": "propVirtual",
      "if_index": "1",
      "admin_status": "down",
      "op_status": "down",
      "ip_address": null,                 // Extended Data Access required, else not returned
      "net_mask": null,                   // Extended Data Access required, else not returned
      "mac_address": "D4:A4:38:0C:1D:A0"  // Extended Data Access required, else not returned
    }
  ]
}
```

##### Asset or Unknown Device Response

Example response for a user-defined asset or an unknown device on the network:

```js
{
  "id": 665,
  "show_url": "/inventory/groups/devices/665",
  "type": "Unknown",
  "primary_owner_name": "Scott Abel",
  "server_name": null,
  "name": "Chris's Printer",
  "domain": null,
  "manually_added": true,
  "device_type": "Printer",
  "description": null,
  "location": null,
  "product_info": {
    "description": null,
    "image_url": null,
    "model_name": "Officejet 6310",
    "vendor_name": "Hewlett-Packard",
    "avg_rating": null,
    "rating_count": null,
    "category": null
  },
  "manufacturer": "Hewlett-Packard",
  "model": "Officejet 6310",
  "memory": 0,
  "os_architecture": null,
  "number_of_processors": null,
  "processor_architecture": null,
  "processor_type": null,
  "kernel": null,
  "operating_system": null,
  "version": null,
  "service_pack_major_version": null,
  "service_pack_minor_version": null,
  "windows_product_id": null,
  "management_oid": null,
  "number_of_licensed_users": null,
  "bios_date": null,
  "bios_version": null,
  "page_count": null,
  "mac_address": null,              // Extended Data Access required, else not returned
  "ip_address": null,               // Extended Data Access required, else not returned
  "ip_comparable": 0,               // Extended Data Access required, else not returned
  "os_serial_number": null,         // Extended Data Access required, else not returned
  "asset_tag": null,                // Extended Data Access required, else not returned
  "serial_number": "948384-83347",  // Extended Data Access required, else not returned
  "uuid": null,                     // Extended Data Access required, else not returned
  "created_at": "2015-02-04T12:56:38-08:00",
  "updated_at": "2015-02-19T02:26:01-08:00",
  "scan_state": "offline",
  "install_date": null,
  "last_backup_time": null,
  "last_boot_up_time": null,
  "last_qrcode_time": null,
  "last_scan_time": null,
  "offline_at": null,
  "online_at": null,
  "online": true,
  "up_time": null,
  "owner": {
    "avatar_path": "/images/icons/medium/person-avatar-admin.png",
    "department": "IT",
    "first_name": "Scott",
    "id": 5,
    "last_name": "Abel",
    "role": "admin",
    "show_url": "/people/5"
  },
  "site": {
    "name": "Central Server",
    "collector": null
  }
}
```

#### Create an asset or device

Create an asset or device with the given attributes. A device created via API
must be manually maintained by the IT pro in the Inventory application.
I.e. it is not scanned from the network.
All attributes are optional unless indicated otherwise.

```js
card.services('inventory').request('device:create', attributes)
```

##### Attributes

Name | Type | Description
-----|------|--------------
`name`|`string`| **Required**.  The name of the device or asset
`mac_address`|`string`|A hardware network address to identify the device.
`ip_address`|`string`|A network IP address to identify the device.
`serial_number`|`string`|A unique serial number to identify the device. One will be generated if not specified.
`asset_tag`|`string`|A tracking tag of some kind.
`description`|`string`|Any kind of description of the device or asset.
`location`|`string`|A description of the physical location of the device or asset.
`device_type`|`string`|The user-defined kind of device, like `Copier`, `Fax`, etc.
`site`|`string`|The location of the device or asset in a multi-site Spiceworks installation. Must be a valid `site.name`.
`manufacturer`|`string`|Manufacturer information.
`model`|`string`|Model information.
`primary_owner_name`|`string`| Primary owner of the device or asset
`owner`|`integer`| id corresponding to the owner of the device or asset. See [People](/documentation/cloud-apps/reference/people.html#people-service) documentation for more information.

##### Response

This request will return the single device JSON, see the [asset response](#asset-or-unknown-device-response).

#### Update a device

Update a device with the given parameters

```js
card.services('inventory').request('device:update', id, attributes)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id`|`integer`| The `id` of the device
`attributes`|`object`| See below for detailed requirements

##### Attributes

This request accepts the same [attributes](#attributes) as creating a device, [see the list above](#attributes).

##### Response

This request will return the updated device JSON, see the [single device response](#response-1).

#### Delete a device

```js
card.services('inventory').request('device:destroy', id)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id`|`integer`|The `id` of the device

##### Response

This request will return the deleted device JSON, see the [single device response](#response-1).

## Software

### Requests

#### List software applications

List all software applications visible by the current authenticated user:

```js
card.services('inventory').request('software'[, options])
```

##### Options

Name | Type | Description
-----|------|--------------
`name`|`string`| Return software matching a specific name.


##### Response
```js
{
  "meta": {
    "total_entries": 3096,
    "page_count": 104,
    "per_page": 30,
    "current_page": 1
  },
  "software": [...] // see below for a single software application JSON example
}
```


#### Get a single software application

```js
card.services('inventory').request('software', id)
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id`|`integer`| The `id` of the software application.

##### Response

Example software application (note all arrays have been reduced to a single example
item):

```js
{
  "id": 8,
  "show_url": "/inventory/software/applications/8",
  "name": "7-Zip",
  "display_name": "7-Zip 9.20 (x64 edition)",
  "vendor": "Igor Pavlov",
  "summary": null,
  "url_about_info": "http://www.7-zip.org/",
  "url_update_info": "http://www.7-zip.org/download.html",
  "computers": [
    {
      "id": 317,
      "show_url": "/inventory/groups/devices/317",
      "name": "adorable-dugong",
      "type": "Device",
      "product_info": {
        "description": null,
        "image_url": null,
        "model_name": "EliteBook 2560p",
        "vendor_name": "Hewlett-Packard",
        "avg_rating": null,
        "rating_count": null,
        "category": null
      },
      "version": "9.20.00.0",
      "install_date": "2011-09-15",
      "install_location": null,
      "uninstall_string": "MsiExec.exe /I{23170F69-40C1-2702-0920-000001000000}",
      "identity": "{23170F69-40C1-2702-0920-000001000000}",
      "product_key": null  // Extended Data Access required, else not returned
    }
  ]
}
```
