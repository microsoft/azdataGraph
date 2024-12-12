azdataGraph
=======

azdataGraph is a derivative of mxGraph, which is a fully client side JavaScript diagramming library that uses SVG and HTML for rendering.

This is a graph diagraming component developed for use in Azure Data Studio.

For more information on mxGraph please see [mxgraph](https://github.com/jgraph/mxgraph)

Typings for the mxGraph library are included in this package. The typings are forked from [typed-mxgraph](https://github.com/typed-mxgraph/typed-mxgraph)

## How to publish a new version of azdataGraph

1. Clone the azdataGraph repository
2. Make your changes
3. Update the version number in the `package.json` file
4. Create a PR to the `main` branch with your changes
5. Once the PR is approved and merged, a new release will be created and published automatically.

## To manually publish a new version of azdataGraph
1. Clone the azdataGraph repository
1. Make your changes
1. Update the version number in the `package.json` file
1. Run `npm install` to install the dependencies
1. Run `npm run build` to build the package
1. Run `npm pack` to create a tarball of the package
1. Push the contents of the tarball to the release branch
1. Create a new release in the Github UI
1. Create a new tag with the version number and set the release branch as the target
1. Publish the release

