# CSS Performance

## Use translate() instead of absolute position.

Translate() does not cause the browser to trigger repaint and layout and instead only acts on the compositor. The absolute position triggers the repaint or DOM reflow. So, translate() gives better performance
