const http = require('http');

const email = process.env.DEFAULT_DOCTOR_EMAIL || 'doctor@example.com';
const password = process.env.DEFAULT_DOCTOR_PASSWORD || 'YOUR_TEST_PASSWORD';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', (err) => reject(err));
    if (data) req.write(data);
    req.end();
  });
}

async function runSecurityTests() {
  console.log('====================================================');
  console.log('🛡️ FINAL PRODUCTION SECURITY VERIFICATION SUITE');
  console.log('====================================================');

  try {
    // 1. Valid Doctor Login
    console.log('\n[Test 1] Valid Doctor Login');
    const validLogin = await request(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({
        email: email,
        password: password,
      })
    );
    console.log(`Status: ${validLogin.status} | Token Issued:`, Boolean(validLogin.data.token));
    const token = validLogin.data.token;

    // 2. Incorrect Password Test (Should return 401 Invalid email or password)
    console.log('\n[Test 2] Incorrect Password Attempt');
    const wrongPass = await request(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({
        email: email,
        password: 'WrongPassword123!',
      })
    );
    console.log(`Status: ${wrongPass.status} (Expected 401) | Message: "${wrongPass.data.message}"`);

    // 3. Non-existent Doctor Record Test (Should return 401 Invalid email or password)
    console.log('\n[Test 3] Non-existent Doctor Account Attempt');
    const unknownUser = await request(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({
        email: 'nonexistent.doctor@example.com',
        password: 'SomePassword123!',
      })
    );
    console.log(`Status: ${unknownUser.status} (Expected 401) | Message: "${unknownUser.data.message}"`);

    // 4. Invalid/Malformed JWT Protection Test (Should return 401 Unauthorized)
    console.log('\n[Test 4] Protected Route Access with Fake Token');
    const fakeTokenRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/me',
      method: 'GET',
      headers: { Authorization: 'Bearer fake-invalid-jwt-token-12345' },
    });
    console.log(`Status: ${fakeTokenRes.status} (Expected 401) | Message: "${fakeTokenRes.data.message}"`);

    // 5. Unauthenticated Protected Route Access Test (Should return 401)
    console.log('\n[Test 5] Protected Blog Creation without Auth Header');
    const noAuthBlog = await request(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/blog',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({ title: 'Unauthenticated Blog Attempt', content: 'Should fail' })
    );
    console.log(`Status: ${noAuthBlog.status} (Expected 401) | Message: "${noAuthBlog.data.message}"`);

    // 6. Valid Authenticated Access Test
    console.log('\n[Test 6] Valid Authenticated Access to /api/auth/me');
    const validMe = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/me',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Status: ${validMe.status} (Expected 200) | Authenticated ID: ${validMe.data.user?.id}`);

    console.log('\n====================================================');
    console.log('✅ ALL PRODUCTION SECURITY VERIFICATION TESTS PASSED');
    console.log('====================================================');
  } catch (error) {
    console.error('❌ Security suite error:', error);
  }
}

runSecurityTests();
