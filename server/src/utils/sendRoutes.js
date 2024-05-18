// Function to list routes and their paths
function listRoutes(app) {
    const routes = [];

    // Loop through all the routes defined in the app
    app._router.stack.forEach((layer) => {
      if (layer.route) {
        const path = layer.route.path;
        const methods = [];
  
        // Get the supported HTTP methods for this route
        for (const method in layer.route.methods) {
          methods.push(method.toUpperCase());
        }
  
        // Add the route to the list
        routes.push({
          path,
          methods,
        });
      }
    });
  
    // Generate the output string
    const output = `Welcome!\r\n${routes.map((route) => `${route.methods.join(', ')} ${route.path}`).join('\r\n')}`;
  
    console.log(routes);
    return output;
}

module.exports = listRoutes;
