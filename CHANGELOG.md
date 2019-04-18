## 1.0.1 (2019-04-18)

### Bug fixes

Make sure images and links don't render whatever happens to be in `node.attrs` to the DOM.

## 0.19.0 (2017-03-16)

### Breaking changes

Link marks are now non-inclusive by default.

## 0.12.0 (2016-10-21)

### Bug fixes

Don't treat \<b style=font-weight: normal> as strong when parsing.
(Google Docs puts such ridiculous HTML on the clipboard.)

## 0.11.0 (2016-09-21)

### Breaking changes

Moved into a separate module.

No longer exports the [specs](http://prosemirror.net/docs/ref/version/0.11.0.html#model.NodeSpec) for the nodes and
marks separately, since they are now plain objects, not subclasses.
They are still exported through [nodes](http://prosemirror.net/docs/ref/version/0.11.0.html#schema-basic.nodes) and
[marks](http://prosemirror.net/docs/ref/version/0.11.0.html#schema-basic.marks) objects.

The list-related nodes were moved to the [schema-list](http://prosemirror.net/docs/ref/version/0.11.0.html#schema-list)
module.

