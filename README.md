# Cancelling Continuous Requests in User Interactions
In various user interface scenarios, continuous user interactions, such as rapid clicks on a checkbox or repeated inputs in a search box, can lead to a series of requests that may become redundant or obsolete. Implementing a cancellation mechanism is crucial in these situations to optimize network resources, prevent unnecessary data fetching, and enhance overall system performance. Here we are discussing request cancellation with the axios package.
<br>

<div align="center">

https://github.com/SudhilRaj/Cancel-Request-Axios/assets/46745297/491bb6ea-4dc8-4917-a83d-07f9fe7c8624

</div>
<br>

<h3><a href="https://srk-axioscanceldemo.netlify.app/" target="_blank"><b>Live Demo</b></a></h3>

## Key Aspects:
### Continuous User Interaction: 
The cancellation mechanism is designed to address scenarios where users engage in continuous interactions, such as clicking checkboxes rapidly or making frequent modifications to a search query.

### Cancellation Token: 
A cancellation token is associated with each user-initiated action that triggers a request. This token allows for the identification and subsequent cancellation of ongoing requests tied to previous actions.

### Seamless Transition: 
When a new user interaction is detected, the mechanism uses the cancellation token from the previous action to cancel any ongoing requests associated with that token. This ensures a seamless transition to processing the latest user-initiated action.

### Feedback and Transparency: 
While the cancellation process occurs behind the scenes, providing feedback to users is essential. Informative messages or visual cues can be employed to convey that the system is aware of and responding to their continuous interactions.

### Adaptable to Different UI Components: 
The cancellation mechanism is adaptable to various UI components, not limited to search boxes. It can be employed with checkboxes, dropdowns, or any interactive element where rapid or repeated user actions may lead to unnecessary requests.

### State Management: 
Depending on the use case, the mechanism may involve managing additional state variables. For instance, in a checkbox scenario, a counter could track the number of cancelled requests due to rapid clicks.

## Benefits:
### Resource Optimization:
Continuous request cancellation optimizes network resources and server load by preventing redundant requests that may no longer be relevant.

### Enhanced Responsiveness: 
By swiftly cancelling outdated requests, the system ensures that subsequent actions are processed based on the latest user input, enhancing responsiveness.

### Improved User Experience: 
Users benefit from a smoother and more efficient interaction with the application, as unnecessary delays caused by redundant requests are mitigated.

Incorporating a cancellation mechanism in response to continuous user interactions is a versatile solution that can be tailored to different components, promoting a responsive and resource-efficient user experience.

## Operation:
Cancelling a request will ends in the catch block of the request. It allows us to handle the exception or perform specific actions in response to the error.
When it comes to the actual cancellation, we can go with different approaches. We can use use <em>axios cancelToken</em> approach or <em>AbortController</em> approach.
(Refer <b>App.js</b> file)

We can execute a request using axios with or without using async/await, axios return promises. (Note: async/await is part of ECMAScript 2017 and is not supported in Internet Explorer and older browsers)

It is not strictly necessary to use async/await with Axios requests, but it is a common and recommended practice, especially when working with promises. Axios itself returns promises, and using async/await syntax provides a cleaner and more readable way to handle asynchronous code.

Here's an example of making an Axios request without async/await:

```js
const fetchData = () => {
  axios.get('https://api.example.com/data')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

fetchData();
```

And the same example using async/await:

```js
const fetchData = async () => {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();
```

Using async/await can make the code more readable and easier to understand, especially when dealing with multiple asynchronous operations or handling errors. It also allows us to write asynchronous code that looks more similar to synchronous code, making it more intuitive for developers.

Also using try, catch, and finally is not mandatory when using async/await with Axios. It's just one way to handle asynchronous operations and errors in a structured manner. We can use async/await without try, catch, or finally in simpler scenarios.

The try, catch, and finally blocks are not specific to asynchronous operations or async/await. They are fundamental constructs in JavaScript for handling exceptions and errors in synchronous code as well.

Here's a brief overview:

- <b>try:</b> This block contains the code that might throw an exception. If an exception occurs, the control is transferred to the catch block.

- <b>catch:</b> This block contains the code that is executed when an exception is thrown in the corresponding try block. It allows us to handle the exception or perform specific actions in response to the error.

- <b>finally:</b> This block, if present, will be executed regardless of whether an exception is thrown or not. It's often used for cleanup tasks that should be performed regardless of the outcome.

Here's an example without try, catch, or finally:

```js
const fetchData = async () => {
  const response = await axios.get('https://api.example.com/data');
  console.log(response.data);
};

fetchData();
```

In this example, any errors that occur during the asynchronous operation will be propagated up the call stack. If we don't use try and catch, we won't be able to catch errors specifically within the fetchData function, and they will need to be handled by the calling code.

Using try, catch, and finally provides more control over error handling. The catch block allows us to handle errors specifically within the function where the await is used, and the finally block allows us to run code regardless of whether an error occurred or not.

It's a good practice to use try, catch, and finally when we want to handle errors in a more granular way or when we need to perform cleanup actions. However, it's not strictly required for every async/await usage.

We can use Axios's own .then, .catch, and .finally instead of try and catch when dealing with Promises. Axios returns a Promise, so we can chain .then and .catch methods on the promise.

Here's an example:
```js
const fetchData = () => {
  axios.get('https://api.example.com/data')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      console.log('Request completed, regardless of success or failure.');
    });
};

fetchData();
```

In this example, the .then block is executed if the request is successful, the .catch block is executed if there's an error, and the .finally block is executed regardless of success or failure.

Using .then, .catch, and .finally provides a more imperative style of handling asynchronous operations, while async/await provides a more declarative style. Choose the one that fits our coding style and the requirements of our application.

The use of .then, .catch, and .finally in Axios serves the same purpose as the async/await approach. Both approaches are used to handle asynchronous operations and are equivalent in terms of functionality.

The async/await syntax provides a more concise and synchronous-looking code structure, making it easier to read and write asynchronous code. On the other hand, chaining .then, .catch, and .finally provides a more imperative style of handling promises.

Choose the approach that fits our coding style and the requirements of our project. Both approaches achieve the same result in terms of handling asynchronous operations with Axios.


Refer:
https://github.com/axios/axios/tree/v1.x#cancellation ,
https://axios-http.com/docs/cancellation
