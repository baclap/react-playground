'use strict';

const views = require('co-views');

const render = views('app/views', {
  map: {html: 'swig'}
});

// render middleware
// Adds a `render` function to ctx that behaves exactly like co-views. The
// benefit here is that an additional `flash` object is added to ctx which can
// be used to push error messages or notices onto. This data is automatically
// passed into the view for you. Additionally the user in ctx.state.user is also
// passed into every view.
module.exports = function *(next) {
  this.flash = {
    notices: [],
    errors: []
  };
  this.render = function(view, opts) {
    const _opts = opts || {};
    _opts.flash = this.flash;
    _opts.user = this.state.user;
    return render(view, _opts);
  };
  yield next;
}
