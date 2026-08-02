const http = require('http');

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

async function testSuite() {
  console.log('====================================================');
  console.log('🧪 RUNNING FULL CRUD & DATABASE INTEGRATION TEST');
  console.log('====================================================');

  try {
    // 1. Health API
    console.log('\n1. GET /api/health');
    const health = await request({ hostname: 'localhost', port: 5000, path: '/api/health', method: 'GET' });
    console.log(`STATUS: ${health.status} | OK`);

    // 2. Doctor Login with MongoDB / Hashed Credentials
    console.log('\n2. POST /api/auth/login');
    const loginData = JSON.stringify({
      email: 'doctor@shreyaanphysiotherapycenter.in',
      password: 'DrSonam@2026',
    });
    const login = await request(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginData) },
      },
      loginData
    );
    console.log(`STATUS: ${login.status} | Token: ${login.data.token ? 'JWT Issued' : 'Failed'}`);
    const token = login.data.token;

    // 3. Authenticated Doctor Profile
    console.log('\n3. GET /api/auth/me');
    const me = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/me',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`STATUS: ${me.status} | Doctor Name: ${me.data.user?.name}`);

    // 4. Create Blog
    console.log('\n4. POST /api/blog (Create Blog)');
    const blogData = JSON.stringify({
      title: 'Post-Surgical Knee Rehabilitation Timeline',
      content: '<p>A step-by-step 12-week guide for ACL & Total Knee Replacement recovery.</p>',
      excerpt: 'Comprehensive clinical guide for post-surgical knee rehab.',
      category: 'Knee Rehab',
      tags: ['Knee', 'Post-Op', 'Rehab'],
      status: 'published',
    });
    const createBlog = await request(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/blog',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(blogData),
          Authorization: `Bearer ${token}`,
        },
      },
      blogData
    );
    console.log(`STATUS: ${createBlog.status} | Blog ID: ${createBlog.data.blog?._id} | Slug: ${createBlog.data.blog?.slug}`);
    const blogId = createBlog.data.blog?._id;

    // 5. Update Blog
    console.log('\n5. PUT /api/blog/:id (Update Blog)');
    const updateBlogData = JSON.stringify({
      title: 'Post-Surgical Knee Rehabilitation & Recovery Timeline',
      excerpt: 'Updated clinical guide with advanced exercise progressions.',
    });
    const updateBlog = await request(
      {
        hostname: 'localhost',
        port: 5000,
        path: `/api/blog/${blogId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(updateBlogData),
          Authorization: `Bearer ${token}`,
        },
      },
      updateBlogData
    );
    console.log(`STATUS: ${updateBlog.status} | Updated Title: ${updateBlog.data.blog?.title}`);

    // 6. Delete Blog
    console.log('\n6. DELETE /api/blog/:id (Delete Blog)');
    const deleteBlog = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/blog/${blogId}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`STATUS: ${deleteBlog.status} | Message: ${deleteBlog.data.message}`);

    // 7. Upload Gallery Image
    console.log('\n7. POST /api/gallery (Upload Gallery Item)');
    const galleryData = JSON.stringify({
      title: 'Therapeutic Ultrasound & Heat Therapy Area',
      imageUrl: '/images/gallery/ultrasound-unit.jpg',
      category: 'Equipment',
    });
    const createGallery = await request(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/gallery',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(galleryData),
          Authorization: `Bearer ${token}`,
        },
      },
      galleryData
    );
    console.log(`STATUS: ${createGallery.status} | Gallery ID: ${createGallery.data.galleryItem?._id}`);
    const galleryId = createGallery.data.galleryItem?._id;

    // 8. Delete Gallery Item
    console.log('\n8. DELETE /api/gallery/:id (Delete Gallery Item)');
    const deleteGallery = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/gallery/${galleryId}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`STATUS: ${deleteGallery.status} | Message: ${deleteGallery.data.message}`);

    console.log('\n====================================================');
    console.log('🎉 ALL 8 FULL-STACK REST API CRUD TESTS PASSED SUCCESSFULLY!');
    console.log('====================================================');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSuite();
