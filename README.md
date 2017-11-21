# quip-viz

The [Quip](https://www.quip.com) Platform for instant collaboration for any app has a [Live Apps for Quip API](https://consensys.quip.com/dev/liveapps/), which allows developers to create their own plug-ins.

Quip lacks graph capabilities, so this Live App uses the popular graph visualization software [Graphviz](http://www.graphviz.org/) via the [Viz.js](http://viz-js.com/) library to allow Quip users to describe the graph using [Dot](http://www.graphviz.org/content/dot-language) language and visualize the generated graph in Quip.

To install, simply clone this repository and follow the [Live Apps Guide](https://quip.com/dev/liveapps/) to build and register the app in your Quip.

Once installed, simply create a new document or edit an existing one, ans
* start typing '\@viz'
* select the app from drop down
* click on it display drop down menu
* click 'Edit Mode'
* type in graph e.g. "digraph { a-> b; }"
* view the graph as you type in new changes
* once done select 'View Mode' from drop down menu
