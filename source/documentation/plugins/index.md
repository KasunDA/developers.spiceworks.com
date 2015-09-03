### Creating Plugins
Have ideas for making Spiceworks better?  Create your very own plugins for Spiceworks and share them with the community. All it takes is some Javascript knowledge and a little bit of ingenuity.

### What Are Plugins?
While Spiceworks has a lot of functionality we think you’ll need, there still may be some tweaks or additions you want to make.  Plugins were designed as a way to allow you to make these changes or even allow us to ship functionality that we may not want to put into the product directly but still want to make available to you as an option.
Plugins are external snippets of JavaScript code that **plug in** to Spiceworks and can utilize [jQuery](http://jquery.com/) to help make things even easier for you. Spiceworks also provides you with [our own API's][Spiceworks_Plugin_API] that are useful for performing common tasks within Spiceworks.

A plugin pretty much lives within the context of the user’s browser and there is very little code that executes on the backend servers,  outside of a few of the provided Spiceworks APIs.   Spiceworks has events that will load the plugins on top of the page, after the page loads.  This gives them a lot of flexibility as to what they can do.  Some examples would be:

* Change the UI elements of Spiceworks to match your needs.
* Add new widgets and pages to Spiceworks.
* View the data in Spiceworks the way you want to.

Some examples of how you can use the plugins:

* Add a new widget to perform [subnet calculations](http://community.spiceworks.com/plugin/544) on your dashboard.
* Configure and add your own [troubleshooting actions](http://community.spiceworks.com/plugin/312) to the device inventory view to support external or custom applications on your network.
* [Customize the user portal](http://community.spiceworks.com/plugin/47) to meet your needs.
* [Define common responses](http://community.spiceworks.com/plugin/9) to help desk tickets.

### Getting Started
When you have thought of an idea for a plugin and you're ready to put your programming skills to the test, navigate to **Settings &rarr; Manage Extensions**.  Towards the top of the page, you'll find a **New Extension** button. Hover your mouse over this button and select **New Plugin** from the list.  This will bring up a text area where you can enter the name and a description of your plugin.  When you click **Save** your plugin will be created and added to the list of Extensions. To enter code for the plugin, click **edit** and the plugin editing window will open.

![Add a plugin](http://community.spiceworks.com/wiki_attachments/addplugin.png)


There are a few things you need to take into account when you start your plugin:

* **Can Spiceworks admins configure your plugin?** The first thing to consider when writing a plugin is whether or not Spiceworks admins can configure your plugin.  If they are going to be able to do this, the first step is to insert the code to bring up the configuration options.  Spiceworks has made this easy for you by having the necessary code inserted for you with just one click of your mouse.
	* Mouse over **Insert Code** and select **Plugin Configuration**. Then change the values to what you need them to be.
	* For more information on how to add additional fields, including drop-down (list) menus, check out the [Plugin Configuration Tutorial][Plugin_Configuration_Tutorial].

![Plugin actions](http://community.spiceworks.com/wiki_attachments/pluginactions.png)

* **What are you changing?** Are you making a new dashboard widget, a change to the user portal, or just changing the application in general?  
	* **Widget:** If you are making a new widget, the best place to start is with the Widget Type preexisting code in Spiceworks.  To access this code, hover your mouse over **Insert Code** and select **Widget Type**.  This will insert the base code to create a new widget.  For more information on widget type plugins, check out the [Widget Plugin Tutorial][Hello_World_Widget_Plugin_Tutorial].
	* **Other prewritten codes:** You can also use preexisting code from the **Insert Code** drop-down menu to run reports, add navigation links, and add messages to Spiceworks.
	* **User Portal:** If you want to make a change to the user portal, you're going to need to use the `SPICEWORKS.portalv2` API.
	* **Inventory:** If you want to make a change to the Spiceworks Inventory, you'll use the `SPICEWORKS.app.Inventory` API.  
	* **Help Desk:** You can change the Help Desk by using the `SPICEWORKS.app.helpdesk`
	* **Settings:** If you want to make changes to the settings, use `SPICEWORKS.app.settings`


### Using Multiple Files For A Plugin
If you store code in separate files and use those files to make a single plugin, you'll get cleaner-looking code that is easier to reuse and debug.  For example, it’s very common to have your styles in a separate CSS file, and even separate HTML and JavaScript files when you have a lot of code. In order to support this programming practice, Spiceworks allows you to define and include various types of files when creating a plugin.  We also allow you to upload images that you are using within the plugin so that you are not required to host the image somewhere else.
See [this tutorial][Multiple_Files_Plugin_Tutorial] for an example of adding CSS files and images.  See [this tutorial][HTML_Plugin_Tutorial] for an example of how to use separate HTML files.

### Code Templates
There are a few code templates built in to the plugin page.  You should take advantage of these if you are writing a plugin that uses any of these.  You can select these by hovering the mouse over the **Insert Code** button and clicking the code you want.

* **Widget Type:** This will insert the base code for a dashboard widget.  This baseline model is set up to simply display the text **Hello World** in a window on the Dashboard, but you can change it to build up to as complex a widget as you care to make.
* **Portal Widget Type:** This will insert the base code for a User Portal widget. This baseline model is set up to simply display the text **Hello World** in a window in the User Portal, but you can change it to build up to as complex a widget as you care to make.
* **Navigation Item:** This will insert the base code to have a new item on the navigation panel under **My Tools**.  By default, the code is configured to add a link titled **My Page** to link to a page that simply says **Hello World** but this can be changed to accomplish many things.  Check out the [Run Report Tutorial][Run_Report_Plugin_Tutorial] for an example of using this tool to display a report.

![Insert code](http://community.spiceworks.com/wiki_attachments/insertcode.png)

* **Run Report:** This will insert the code that runs a report of your choosing.  This code is not useful by itself, but you could add it to a widget or navigation item to put it somewhere useful.  You will need to add information to tell Spiceworks what kind of information to display.  You can learn more about how to put a report in a plugin by checking out the [Run Report Plugin Tutorial][Run_Report_Plugin_Tutorial].
* **Add Message:** This will insert a snippet of code that displays a message at the top of Spiceworks.  You can learn more about this type of plugin at the [Message Plugin Tutorial][Message_Plugin_Tutorial].
* **Plugin Configuration:** This will insert the code that adds a configuration option to the plugin.  This part of code will generally be at the beginning of the plugin.

### Spiceworks APIs
All basic Javascript Application Programming Interfaces (APIs) will work with the plugins feature. We've also provided you with several APIs that are useful for common tasks in Spiceworks.  These APIs always start with `SPICEWORKS.` What follows dictates what is going to happen. After `SPICEWORKS.` you can further specify the API or there are a few methods that you can attach to specify when the function is going to occur. Check out the [Spiceworks plugin API page][Spiceworks_Plugin_API] for more detailed information on these APIs, including what methods are available for each namespace.

* `SPICEWORKS.app`: You can use this API for all elements that are part of the application (as opposed to the user portal).
	* `SPICEWORKS.app.dashboard`: This API is used for creating widgets. Widgets only appear on the Dashboard.
	* `SPICEWORKS.app.navigation`: This API is used to add things to the navigation panel (left sidebar).
	* `SPICEWORKS.app.messaging`: This API is used to deliver messages to the user by using the info box at the top of the screen rather than a pop-up box.
* `SPICEWORKS.portalv2`: You can use this API for elements that are part of the User Portal.
* `SPICEWORKS.persistence`: This API allows you to store data on the server so all users can access information.
* `SPICEWORKS.utils`: this API allows you to make changes in the visualization of Spiceworks or include script from a remote location.
	* `SPICEWORKS.utils.google`: This API allows you to use Google's data visualization **gadgets**.
* `SPICEWORKS.data.Ticket`: This API returns information about tickets.
* `SPICEWORKS.data.Device`: This API returns information about devices.
* `SPICEWORKS.data.Alert`: This returns information about alerts.
* `SPICEWORKS.data.DataMonitor`: This API returns information about monitors.
* `SPICEWORKS.data.Group`: This API returns information about groups.
* `SPICEWORKS.data.Software`: This API returns information about software.
* `SPICEWORKS.data.Service`: This API returns information about services.
* `SPICEWORKS.data.Hotfix`: This API returns information about hotfixes.
* `SPICEWORKS.data.User`: This API returns information about users.
* `SPICEWORKS.data.Report`: This API returns information about reports.

### Tools To Make Plugins Easier
There are always ways to make things easier, so if you're not a programming expert, don't assume that you're left out of the game.  Using these tools will help to level the playing field so that anyone can create a plugin.

### Cloning A Plugin
Cloning a plugin is a great way to start building your plugin.  If you can find a plugin that is similar to the one you want to make, why not use someone else's hard work as a starting point.  You can simply clone the plugin and make changes to it to accomplish what you're trying to do.

* Download a plugin from the [Plugin Directory][Plugin_Directory], or if you've already downloaded the plugin, navigate to **Settings &rarr; Manage Plugins**.
* Click **source** next to the plugin you want to clone.
* Click **Clone Plugin** to create a new plugin that you can edit, containing the same code.  

![Clone plugin](http://community.spiceworks.com/wiki_attachments/cloneplugin.png)

### Firebug
You can use a Firefox plugin called Firebug to help you to create plugins for Spiceworks.  Firebug allows you to view and change the scripts that are running on a page.

* You can navigate to the page you want to change in Spiceworks and find the code that is running on that page to see how certain commands are executed.  Then you can make changes in Firebug and see how the program responds.
* Check out the [Firebug home page](http://getfirebug.com) for more information and to get the plugin.

![Firebug](http://community.spiceworks.com/wiki_attachments/firebug.png)

### Sharing Your Plugins
Sharing plugins with other users is a great way to get feedback and ideas to improve your plugin. Plus, you'll be helping someone else do their job better and get credit for your contribution.  Even though we know you're a top-notch programmer, when you first share a plugin it will not be listed in the plugin directory.  This is to allow you to get user feedback, update the description, and fix any bugs that might pop up.

#### Sharing a plugin

![Share plugin](http://community.spiceworks.com/wiki_attachments/shareplugin.png)

* After you've written and saved your plugin, click **share** in the row of the plugin you want to share.
* Click **Share** in the pop-up to confirm that you want to share the plugin.
* Update the description of the plugin with detailed information about the plugin and how to use it.
* Add screenshots to help users see how the plugin will look.

Once you've shared a plugin, post about it in the Extending Spiceworks group. Users can download the plugin by going directly to the url of your plugin. Once you've got users to try out your plugin and it's ready to be shared with everyone, we'll list it in the directory.

#### More Reading
Developing Plugins for Spiceworks is, in some ways, like creating scripts for the Greasemonkey Firefox Add On. If you'd like some more examples of how powerful this sort of scripting can be, please check out [the examples provided by the Greasemonkey team](http://wiki.greasespot.net/Main_Page)

#### Spiceworks API Information
The Spiceworks APIs are the tools that allow you to make change to Spiceworks. Find out what they can do on the following links:

* [Data API](http://developers.spice.spiceworks.com/docs/in-spiceworks/plugin-data-api-reference)
* [App, persistence, utils APIs][Spiceworks_Plugin_API]

### Helpful Plugin Pages
* [Plugins][Plugins]: Information on downloading and using plugins.
* [Plugin Tutorials][Plugin_Tutorials]: See several examples of plugins.  Here you can see the code to help learn how to write your own.
* [Spiceworks Plugin APIs][Spiceworks_Plugin_API]: See the code for the APIs that Spiceworks has created for you to use.
* [Extending Spiceworks Group](http://community.spiceworks.com/group/show/300): This is the group to join to discuss plugins with other Spiceworks users.
* [Plugin Directory][Plugin_Directory]: Here you can download the plugins that have been created and deemed working.

[Spiceworks_Plugin_API]: /documentation/plugins/reference/index.html
[Hello_World_Widget_Plugin_Tutorial]: /documentation/plugins/your-first-plugin.html
[Plugin_Configuration_Tutorial]: /documentation/plugins/settings.html
[Multiple_Files_Plugin_Tutorial]: /documentation/plugins/multi-file-plugins.html
[HTML_Plugin_Tutorial]: /documentation/plugins/html-plugins.html
[Run_Report_Plugin_Tutorial]: /documentation/plugins/reporting.html
[Message_Plugin_Tutorial]: /documentation/plugins/messaging.html
[Plugins]: http://community.spiceworks.com/help/Plugins
[Plugin_Tutorials]: /documentation/plugins/your-first-plugin.html
[Plugin_Directory]: http://community.spiceworks.com/plugin
