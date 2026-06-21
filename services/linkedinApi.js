
const https = require('https');

const RAPIDAPI_KEY =
  process.env.RAPIDAPI_KEY 

const RAPIDAPI_HOST =
  'linkedin-scraper-api-real-time-fast-affordable.p.rapidapi.com';

/**
 * Extract LinkedIn username from profile URL
 * Example:
 * https://www.linkedin.com/in/neal-mohan/
 * => neal-mohan
 */
function extractUsername(profileUrl) {
  if (!profileUrl) return '';

  const match = profileUrl.match(/linkedin\.com\/in\/([^/?]+)/i);

  if (match && match[1]) {
    return match[1];
  }

  // If user directly enters username
  return profileUrl.trim();
}



let apiRequestCount = 0;

function rapidRequest(path, method = 'GET', body = null) {
  apiRequestCount++;

  console.log('\n==============================');
  console.log('API REQUEST #' + apiRequestCount);
  console.log('METHOD:', method);
  console.log('PATH:', path);
  console.log('==============================\n');

  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : null;

    const options = {
      method,
      hostname: RAPIDAPI_HOST,
      port: null,
      path,
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json',
        ...(bodyStr
          ? {
              'Content-Length': Buffer.byteLength(bodyStr),
            }
          : {}),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];

      console.log('STATUS:', res.statusCode);

      console.log(
        'RATE LIMIT:',
        res.headers['x-ratelimit-requests-limit'] || 'Not Provided'
      );

      console.log(
        'REMAINING:',
        res.headers['x-ratelimit-requests-remaining'] || 'Not Provided'
      );

      res.on('data', (chunk) => chunks.push(chunk));

      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString();

        // console.log('\nRAW RESPONSE:');
        // console.log(raw);
        // console.log('=====================\n');

        try {
          const json = JSON.parse(raw);

          resolve({
            status: res.statusCode,
            data: json,
            requestCount: apiRequestCount,
            rateLimit:
              res.headers['x-ratelimit-requests-limit'] || null,
            remaining:
              res.headers['x-ratelimit-requests-remaining'] || null,
          });
        } catch (err) {
          reject(
            new Error(
              'Failed to parse API response: ' + err.message
            )
          );
        }
      });
    });

    req.on('error', reject);

    if (bodyStr) {
      req.write(bodyStr);
    }

    req.end();
  });
}
// ─────────────────────────────────────────────
// PROFILE ENDPOINTS
// ─────────────────────────────────────────────

const getProfileDetail = (profile_url) =>
  rapidRequest(
    `/profile/detail?username=${encodeURIComponent(
      extractUsername(profile_url)
    )}`
  );

const getProfilePosts = (profile_url) =>
  rapidRequest(
    `/profile/posts?username=${encodeURIComponent(
      extractUsername(profile_url)
    )}`
  );


const getProfileComments = (profile_url) =>
  rapidRequest(
    `/profile/comments?username=${encodeURIComponent(
      extractUsername(profile_url)
    )}&page_number=1`
  );



const getProfileReactions = (profile_url) =>
  rapidRequest(
    `/profile/reactions?username=${encodeURIComponent(
      extractUsername(profile_url)
    )}&page_number=1`
  );


const getProfileContact = (profile_url) =>
  rapidRequest(
    `/profile/contact?username=${encodeURIComponent(
      extractUsername(profile_url)
    )}`
  );

// ─────────────────────────────────────────────
// COMPANY ENDPOINTS
// ─────────────────────────────────────────────


const getCompanyDetail = (company) =>
  rapidRequest(
    `/companies/detail?identifier=${encodeURIComponent(company)}`
  );


const getCompanyPosts = (company) =>
  rapidRequest(
    `/company/posts?company_name=${encodeURIComponent(company)}`
  );


const searchCompanies = (keyword) =>
  rapidRequest(
    `/companies/search?keyword=${encodeURIComponent(keyword)}&page_number=1`
  );

// ─────────────────────────────────────────────
// SEARCH ENDPOINTS
// ─────────────────────────────────────────────


const getJobDetail = (job_id) =>
  rapidRequest(
    `/jobs/detail?job_id=${encodeURIComponent(job_id)}`
  );


const searchJobs = (keyword) =>
  rapidRequest(
    `/jobs/search?keywords=${encodeURIComponent(keyword)}&location=United%20States&page_number=1`
  );

// ─────────────────────────────────────────────
// PROFILE UPLOAD
// ─────────────────────────────────────────────

const uploadProfileByUrl = (profileUrl) =>
  rapidRequest('/profile/upload', 'POST', {
    url: profileUrl,
  });

module.exports = {
  getProfileDetail,
  getProfilePosts,
  getProfileComments,
  getProfileReactions,
  getCompanyDetail,
  getCompanyPosts,
  searchCompanies,
  getJobDetail,
  searchJobs,
  uploadProfileByUrl,
};


