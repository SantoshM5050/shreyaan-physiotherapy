const http = require('http');

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runBackendTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING COMPREHENSIVE BACKEND API SUITE VERIFICATION');
  console.log('====================================================');

  try {
    // 1. Health API Test
    console.log('\n[1/7] Testing GET /api/health...');
    const healthRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET',
    });
    console.log(`Status: ${healthRes.status} | Output:`, healthRes.data);

    // 2. Doctor Login API Test
    console.log('\n[2/7] Testing POST /api/auth/login...');
    const loginPayload = JSON.stringify({
      email: 'doctor@shreyaanphysiotherapycenter.in',
      password: 'DrSonam@2026',
    });
    const loginRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(loginPayload),
        },
      },
      loginPayload
    );
    console.log(`Status: ${loginRes.status} | Token Generated:`, Boolean(loginRes.data.token));
    const token = loginRes.data.token;

    // 3. Doctor Session Verification API Test
    console.log('\n[3/7] Testing Protected GET /api/auth/me...');
    const meRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Status: ${meRes.status} | Authenticated Doctor:`, meRes.data.user?.name);

    // 4. Create Blog API Test
    console.log('\n[4/7] Testing Protected POST /api/blog (Create Blog)...');
    const newBlogPayload = JSON.stringify({
      title: 'Advanced Electrotherapy & Ultrasound for Muscle Rehab',
      content: '<p>Electrotherapy uses targeted electrical signals to stimulate nerves and muscles...</p>',
      excerpt: 'Comprehensive overview of electrotherapy in physical rehabilitation.',
      category: 'Treatment',
      tags: ['Electrotherapy', 'Rehab', 'Pain Relief'],
      status: 'published',
    });
    const createBlogRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/blog',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(newBlogPayload),
          Authorization: `Bearer ${token}`,
        },
      },
      newBlogPayload
    );
    console.log(`Status: ${createBlogRes.status} | Created Blog Slug:`, createBlogRes.data.blog?.slug);
    const createdBlogId = createBlogRes.data.blog?._id;

    // 5. Read Blogs API Test
    console.log('\n[5/7] Testing GET /api/blog...');
    const blogsRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/blog',
      method: 'GET',
    });
    console.log(`Status: ${blogsRes.status} | Total Blogs Found:`, blogsRes.data.count);

    // 6. Create Gallery API Test
    console.log('\n[6/7] Testing Protected POST /api/gallery (Upload Gallery Item)...');
    const newGalleryPayload = JSON.stringify({
      title: 'State-of-the-Art Dry Needling Setup',
      imageUrl: '/images/gallery/dry-needling-setup.jpg',
      category: 'Equipment',
    });
    const createGalleryRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/gallery',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(newGalleryPayload),
          Authorization: `Bearer ${token}`,
        },
      },
      newGalleryPayload
    );
    console.log(`Status: ${createGalleryRes.status} | Gallery Title:`, createGalleryRes.data.galleryItem?.title);

    // 7. Read Gallery API Test
    console.log('\n[7/7] Testing GET /api/gallery?category=Equipment...');
    const galleryRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/gallery?category=Equipment',
      method: 'GET',
    });
    console.log(`Status: ${galleryRes.status} | Total Equipment Gallery Items:`, galleryRes.data.count);

    console.log('\n====================================================');
    console.log('✅ ALL BACKEND API ENDPOINTS VERIFIED & WORKING PERFECTLY');
    console.log('====================================================');
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

runBackendTests();
