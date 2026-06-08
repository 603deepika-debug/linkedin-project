
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

        console.log('\nRAW RESPONSE:');
        console.log(raw);
        console.log('=====================\n');

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

const getProfileExperience = (profile_url) =>
  rapidRequest(
    `/profile/experience?username=${encodeURIComponent(
      extractUsername(profile_url)
    )}`
  );

const getProfileEducation = (profile_url) =>
  rapidRequest(
    `/profile/education?username=${encodeURIComponent(
      extractUsername(profile_url)
    )}`
  );

const getProfileSkills = (profile_url) =>
  rapidRequest(
    `/profile/skills?username=${encodeURIComponent(
      extractUsername(profile_url)
    )}`
  );

const getProfileConnections = (profile_url) =>
  rapidRequest(
    `/profile/connections?username=${encodeURIComponent(
      extractUsername(profile_url)
    )}`
  );

// ─────────────────────────────────────────────
// COMPANY ENDPOINTS
// ─────────────────────────────────────────────

const getCompanyDetail = (company) =>
  rapidRequest(
    `/company/detail?company=${encodeURIComponent(company)}`
  );

const getCompanyEmployees = (company) =>
  rapidRequest(
    `/company/employees?company=${encodeURIComponent(company)}`
  );

const getCompanyJobs = (company) =>
  rapidRequest(
    `/company/jobs?company=${encodeURIComponent(company)}`
  );

// ─────────────────────────────────────────────
// SEARCH ENDPOINTS
// ─────────────────────────────────────────────

const searchPeople = (keyword) =>
  rapidRequest(
    `/search/people?keyword=${encodeURIComponent(keyword)}`
  );

const searchCompanies = (keyword) =>
  rapidRequest(
    `/search/companies?keyword=${encodeURIComponent(keyword)}`
  );

const searchJobs = (keyword) =>
  rapidRequest(
    `/search/jobs?keyword=${encodeURIComponent(keyword)}`
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
  getProfileExperience,
  getProfileEducation,
  getProfileSkills,
  getProfileConnections,
  getCompanyDetail,
  getCompanyEmployees,
  getCompanyJobs,
  searchPeople,
  searchCompanies,
  searchJobs,
  uploadProfileByUrl,
};


