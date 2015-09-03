Plugins are a great way to customize Spiceworks for your needs.  To help you get more out of plugins, we have created our own set of Spiceworks Plugin API's.  You can use these to customize specific areas of Spiceworks.   All the return types are JSON objects and the best way to introspect the data is Firebug. It makes it really easy to try out. Just open firebug on a page with Spiceworks loaded and type in the javascript fragment.

### Spiceworks Global Namespace
The global namespace for all Spiceworks APIs are under the **SPICEWORKS** (all caps) namespace.  There are a number of sub-namespaces that will are mentioned below.

**Methods:**

* **observe(event, callback)** - Register to execute the callback when the given event occurs.  Event is just a string name.
* **fire(event)** - Cause registered callbacks to be executed
* **ready(callback)** - Function "callback" will be executed once Spiceworks has finished loading.
* **clone(object)** - Create a sort of instance of the passed object.  Returns a new object that inherits all properties and behaviours off of the passed object.

### Spiceworks Application
The **SPICEWORKS.app** namespace is used for all UI elements that are part of the "application" (as opposed to the "portal", for example).

**Methods:**

* **ready(callback)** - Function "callback" will be executed once Spiceworks has finished loading.  This is where you would define code that might modify some global aspect of the application.

* **isShowing()** - Returns true if the Spiceworks application is showing (and false if the portal is showing).

### Dashboard Widgets
**SPICEWORKS.app.dashboard** is what you'll use to create new widget types. The specification of a new widget type looks like this.

~~~ javascript
  SPICEWORKS.app.dashboard.addWidgetType({
    name:'hello_world_widget',
    label:'Hello',
    icon:'/images/icons/small/gear.png',
    settingDefinitions:[
      {name:'greeting',
       type:'string',
       label:'Greeting',
       defaultValue:'hello'},
      {name:'area',
       type:'string',
       label:'Area',
       defaultValue:'world'}
    ],
    update: function(element, settings){
      element.innerHTML = settings.greeting + ' ' + settings.area + '!!';
    }
  });
~~~
A widget type spec must include name, label, icon, prefs and an update function.  The update function takes two parameters, the dom element to render into and the options object.  The options object will contain all of the configuration information that the user will specify.

The prefs array will hold field descriptors.  Each field requires a name, type, label and defaultValue (actually, 'string' is assumed).  Currently, string is the only type of setting supported, but we can add more over time very easily (number, url, text, email, etc).  Fields will likely be allowed to have some level of validation as well.

**Methods:**

* **addWidgetType(widgetTypeSpec)** - Creates a new "type" of widget.  This new type will appear in the "Add Content" popup as an option for widgets to add.
* **getWidgetTypes()** - Returns an array of all the widgetTypes defined by plugins.
* **getWidgetType(name)** -  Returns the object representation of the widget named in the parameter.
* **isShowing()** - Returns true if the dashboard is currently "showing".  This is determined by looking at the elements on the page to be sure.

### Navigation
**SPICEWORKS.app.navigation** will add to the section of options in the My Tools portion of the navigation menu.  In the future these may move around a bit, but the idea is a simple one: Create a link which causes an entire page to be rendered with content.  Here's an example of how one might use this to create a super simple "tool".  (Note: this is very similar to how you create widgets, only without "preferences".

~~~ javascript
  SPICEWORKS.app.navigation.addItem({
    name:'hello_world',
    label: 'Hello',
    // Update the page
    update: function(element){
      element.innerHTML = 'Hello World';
    }
  });
~~~

A tool specification must include a name, label and update method.  The update method takes a single argument which is the element where content should be rendered.

**Methods:**

* **addItem(itemSpec)** - Create a new navigation item and add it to the sidebar.  The tool specification should look like the one in the example above.
* **getItems()** - Returns an array of all the tool objects that have been defined using the "addTool" method.  This will not include tools created through the existing tool mechanism.

### Messaging
Often times it's nice to be able to tell the user about something or alert them to new information.  You can use an **alert()** box, but this is kind of ugly.  Spiceworks tries to make this cleaner by giving you the ability to add messages to top of the Spiceworks application by using the **SPICEWORKS.app.messaging** call.

**Methods:**

* **push(message, options)** - Add a message to the top of the screen and return the **messageId**.  **options** are optional and accepts a hash formatted like this: **{selfRemoving: true, timeoutSeconds: 5, id:'myMessage'}**
* **pop(messageID)** - Remove the specified message from the area at the top of the screen.

### Help Desk
The Help Desk is one of the most used aspects of Spiceworks, so of course you probably have ideas to make it better meet your needs.  The helpdesk API gives you the ability to make these changes in a plugin.

**Catalog of Events for Helpdesk v2**
Here is a complete list of events for Helpdesk v2, with arguments. You would start each event with $UI.app.pluginEventBus.on('app:helpdesk...)

* __“app:helpdesk:ticket:show”__ (ticket object) — when a ticket is loaded or displayed
* __“app:helpdesk:purchase:add”__ (purchase object) — when a purchase is added to a ticket
* __“app:helpdesk:ticket:change:status”__ (ticket object) — when a ticket’s status is changed to open or closed
* __“app:helpdesk:ticket:add”__ (ticket object) — when a new ticket is created
* __“app:helpdesk:ticket:new:show”__ — when the new ticket form is added to the DOM
* __“app:helpdesk:ticket:dup_search:show”__ — when the duplicate search modal is added to the DOM
* __"app:helpdesk:ticket:header:render"__ — when the ticket header pane is rendered
* __“app:helpdesk:ticket:comment:show”__ — when a comment is added to the DOM
* __“app:primary:show”__ — when the ticket table is added to the DOM
* __“app:secondary:show”__ — when the ticket pane is added to the DOM (useful for detecting when a ticket is clicked from the table)
* __"app:helpdesk:ticket:change:due"__ - when the due date is changed
* __"app:helpdesk:ticket:change:priority"__ - when the priority is changed
* __"app:helpdesk:ticket:change:assignee"__ - when the assignee is changed
* __"app:helpdesk:ticket:change:category"__ - when the category is changed
* __"app:helpdesk:ticket:change:time_spent"__ - when time is added or removed from the ticket

### Inventory
One of the primary areas of Spiceworks, the inventory is a place where you could use the **SPICEWORKS.app.inventory** call to really help you out.

**Methods:**

* **ready(callback)** - Function "callback" will be executed when the inventory is finished loading.

**Catalog of Events for Inventory**

* **SPICEWORKS.app.inventory.environment** - This is the top level of the Inventory
* **SPICEWORKS.app.inventory.group** - This refers to the group level view of the Inventory.
* **SPICEWORKS.app.inventory.group.device** - This refers to viewing an individual device in the Inventory.
* **SPICEWORKS.app.inventory.group.environment** - This refers to the environment summary of a group in the Inventory.
* **SPICEWORKS.app.inventory.softwareGroup** - This refers to the software group of your Inventory.
* **SPICEWORKS.app.inventory.softwareGroup.environment** - This refers to the environment summary of the software group.
* **SPICEWORKS.app.inventory.softwareGroup.software** - This refers to the individual pieces of software in the software group.
* **SPICEWORKS.app.inventory.softwareGroup.service** - This refers to the services that are listed in the software group.
* **SPICEWORKS.app.inventory.softwareGroup.hotfix** - This refers to the hotfixes that are listed in the software group.

### User Portal
The **SPICEWORKS.portalv2** namespace is used for all UI elements that are part of the "portal" (as opposed to the "application").

**Methods:**

* **ready(callback)** - Function"callback" will be executed when the Spiceworks portal is finished loading.  This is where you would define code that might modify some global aspect of the user portal.

* **isShowing()** - Returns true if the Spiceworks portal is showing (and false if the application is showing).

**Add Widgets to the User Portal:**

* **SPICEWORKS.portalv2.addPortalType()**

### Persistence
Data can easily be stored on the server using the **SPICEWORKS.persistence** call.

* **SPICEWORKS.persistence.store( 'some_key_or_id', { foo: 'bar' } );** - User changes something or takes some action.
* **SPICEWORKS.persistence.load( 'some_key_or_id', function (result) {
  console.log(result.foo);  //=> 'bar'});** - At some later time, perhaps the next page load, or even later.

**Methods:**

* **store(key, value, callback)** - Store a value for future use.  Value can be most any type of object (but a normal "hash" sort of object is prefered).  Methods will not be persisted, only data.  Callback is optional.
* **load(key, callback)** - Fetch the specified value and pass it to the callback.  The value will NOT be returned from the function.  The callback is NOT guarenteed to be executed immediately.  Depending on the server, it may take a few seconds to execute, so do not create code that expects this to run immediately.
* **remove(key, callback)** - Delete a value from the data store.  Callback is optional and is run once the value is deleted.

### Utilities
A number of helpful methods can be found under **SPICEWORKS.utils**.

**Methods:**

* **addStyle(styleText)** - Add a chunk of style information to the **HEAD** of the current document.  Example: Set background color to red
  SPICEWORKS.utils.addStyle('body{background-color:red}');

* **include(url, callback)** - Include a script from a remote location.  This is used internally but is available for plugin writers as well.  If you find you need to include some remote javascript, this is the way to do it.

~~~ javascript
  SPICEWORKS.utils.include('http://myserver.com/somefile.js', function () {
    /* External JS has been loaded, now do something with it. */
  });
~~~

### Settings
The **SPICEWORKS.settings** call refers to the main settings page.

**Methods:**

* **ready (callback)** - Function"callback" will be executed when the main settings page is finished loading.

**Catalog of Events for Settings**

* **SPICEWORKS.settings.help_desk**
* **SPICEWORKS.settings.monitors**
* **SPICEWORKS.settings.network**
* **SPICEWORKS.settings.email**
* **SPICEWORKS.settings.accounts**
* **SPICEWORKS.settings.spicemeter**
* **SPICEWORKS.settings.events**
* **SPICEWORKS.settings.categories**
* **SPICEWORKS.settings.backup**
* **SPICEWORKS.settings.advanced**

### Other Resources

* [Data API Info](/docs/in-spiceworks/plugin-data-api-reference) - Detailed information about the info you can pull from the Spiceworks database to include in plugins.
