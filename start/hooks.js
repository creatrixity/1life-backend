const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Exception = use('Exception');

  Exception.handle('InvalidJwtToken', async (error, { response, session }) => {
    return response.status(401).send({
      error: {
        status: 401,
        message: 'Supply a valid JWT token!'
      }
    });
  });
});
