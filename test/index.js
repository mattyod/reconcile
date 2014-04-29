'use strict';

var reconcile = require('../index');

describe('reconcile', sandbox(function () {
  var fragment,
      root = 'dependencies/foo/bar/file.json';

  it('ammends the last fragment', function () {
    fragment = './foo.json';

    reconcile(root, fragment).should
      .equal('dependencies/foo/bar/foo.json');

  });

  it('joins the last fragment', function () {
    fragment = './folder/foo.json';

    reconcile(root, fragment).should
      .equal('dependencies/foo/bar/folder/foo.json');

  });

  it('appends up a level', function () {
    fragment = '../foo.json';

    reconcile(root, fragment).should
      .equal('dependencies/foo/foo.json');

  });

  it('joins up a level', function () {
    fragment = '../folder/foo.json';

    reconcile(root, fragment).should
      .equal('dependencies/foo/folder/foo.json');

  });

  it('appends up two levels', function () {
    fragment = '../../foo.json';

    reconcile(root, fragment).should
      .equal('dependencies/foo.json');

  });

  it('joins up two levels', function () {
    fragment = '../../folder/foo.json';

    reconcile(root, fragment).should
      .equal('dependencies/folder/foo.json');

  });

  it('replaces when fragment points back to root', function () {
    fragment = '../../../foo.json';

    reconcile(root, fragment).should
      .equal('foo.json');

  });

  it('joind when fragement points back to root', function () {
    fragment = '../../../folder/foo.json';

    reconcile(root, fragment).should
      .equal('folder/foo.json');

  });

}));