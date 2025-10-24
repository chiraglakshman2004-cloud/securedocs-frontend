// Simple test script to verify frontend-backend connection
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000';

async function testConnection() {
  console.log('🧪 Testing SecureDocs Portal Connection...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/ping`);
    const healthText = await healthResponse.text();
    console.log(`   ✅ Health check: ${healthText}\n`);

    // Test 2: Check if server is running
    console.log('2. Testing server availability...');
    if (healthResponse.ok) {
      console.log('   ✅ Server is running and responding\n');
    } else {
      console.log('   ❌ Server is not responding properly\n');
      return;
    }

    console.log('🎉 All connection tests passed!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the backend server: cd backend && npm start');
    console.log('2. Start the frontend: cd frontend && npm start');
    console.log('3. Open http://localhost:3000 in your browser');
    console.log('4. Test file upload functionality');

  } catch (error) {
    console.log('❌ Connection test failed:');
    console.log('   Make sure the backend server is running on port 5000');
    console.log('   Error:', error.message);
  }
}

testConnection();
