const fetch = require('node-fetch');

const apiUrl = 'http://api.test.scoteid.com/api';
const applicationName = 'ScotEID App Desktop';
const applicationVersion = '1.1.4';
const applicationKey = 'YourApplicationKey';
const schemaVersion = '1.0'; // Replace with the actual schema version
const timestamp = new Date().toISOString();

const user = {
    name: 'Ama Siaw',
    email: 'ama@example.com',
  };

async function createUser(user) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ApplicationName': applicationName,
        'ApplicationVersion': applicationVersion,
        'ApplicationKey': applicationKey,
        'SchemaVersion': schemaVersion,
        'Timestamp': timestamp,
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const newUser = await response.json();
      console.log('User created:', newUser);
    } else {
      console.error('Error creating user:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage example
createUser(user);
