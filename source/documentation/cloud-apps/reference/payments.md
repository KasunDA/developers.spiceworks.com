# Payments

## Client-Side Integration

#### Create a new subscription for a user

```js
//maybe we should move the appUid piece to an init method??
var payment = new SW.Payment({appUid: "your-oauth2-application-id"});
payment.request('subscription:create', id, options);
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id`|`integer`| The `id` of the subscription the user wants to purchase.  Can be found in the App Center developer dashboard.

##### Options

Name | Type | Description
-----|------|--------------
`transaction_uid`|`integer`| A unique id created by your app to identify the transaction.

##### Response

The response will have the following fields:

Name | Type | Description
-----|------|--------------
`id`|`integer`| The `id` of the user's individual subscription.
`user`|`integer`| The `id` of the user subscribed to your app.
`product`|`integer`| The `id` of the subscription the user purchased.  Should match the `id` passed in.
`status`|`string`| The current status of the user's subscription.  Either `'active'` or `'canceled'`.
`payment_status`|`string`| The status of the most recent payment.  One of `'success'`, `'failed'`, or `'not_billed'`.
`signed_request`|`string`| A signed object with the same values as the response, which can be decrypted and verified using your app's secret key.  This will include the `transaction_uid` which can be used to confirm the response is legitimate.

```js
{
  "user_subscription": {
    "id": 122119087921267,
    "user": 1245537185,
    "product": 1234, //same as productId passed in
    "status": "active",
    "payment_status": "not_billed",
    "signed_request": "7QYHzKqKByA7fjiqJUh2bxFvEdqdvn0n_y1zYiyN6tg.eyJhbGCJxdWFudGl0eSI6IjEiLCJzdGF0dXMiOiJjb21wbGV0ZWQifQ"

    // signed_request can be decrypted using app secret and
    // is an object including transaction_uid so purchase can be
    // confirmed

    // timestamps

    // more info about payment plan?

    // more info about next billing period?
    //(in case of downgrades and cancellations)

    // more info about trial period? ('not_billed' not enough?)
  }
}
```

#### Update an existing subscription for a user

```js
//maybe we should move the appUid piece to an init method??
var payment = new SW.Payment({appUid: "your-oauth2-application-id"});
payment.request('subscription:update', id, attributes, options);
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id`|`integer`| The `id` of the subscription being signed up for.  Can be found in the App Center developer dashboard.
`attributes`|`object`| See below for detailed requirements

##### Attributes

Name | Type | Description
-----|------|--------------
`product`|`integer`| The id of the subscription that the user is subscribed to.  The id for subscription can be found on the App Center developer dashboard.

##### Options

Name | Type | Description
-----|------|--------------
`transaction_uid`|`integer`| A unique id created by your app to identify the transaction.

##### Response

See above

#### Pay for an existing subscription for a user

This should be used when the `payment_status` of a subscription is `'failed'`.

```js
//maybe we should move the appUid piece to an init method??
var payment = new SW.Payment({appUid: "your-oauth2-application-id"});
payment.request('subscription:pay', id, options);
```

##### Parameters

Name | Type | Description
-----|------|--------------
`id`|`integer`| The `id` of the users's subscription being paid for.

##### Options

Name | Type | Description
-----|------|--------------
`transaction_uid`|`integer`| A unique id created by your app to identify the transaction.

##### Response

See above

## Server-Side Integration

### APIs


### Webhooks
