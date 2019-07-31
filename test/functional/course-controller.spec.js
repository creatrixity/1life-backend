'use strict'

const { test, trait } = use('Test/Suite')('Course Controller')

trait('Test/ApiClient');

test('should return a list of courses', async ({ client, assert }) => {
  let response = await client
    .get('/api/v1/courses')
    .end();

  assert.isAtLeast(response.body.length, 1);
}).timeout(0)

test('should return a list of modules for a course #1', async ({ client, assert }) => {
  let response = await client
    .get('/api/v1/courses/1/modules')
    .end();

  assert.isAtLeast(response.body.length, 1);
  assert.isAtLeast(response.body[0].__meta__.lessons_count, 1);
}).timeout(0)
