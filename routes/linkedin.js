const express = require('express');
const router = express.Router();
const api = require('../services/linkedinApi');

// ─── Helper ──────────────────────────────────────────────────────────────────
function handleResult(res, viewName, result, extra = {}) {
  res.render(viewName, { result: result.data, status: result.status, error: null, ...extra });
}
function handleError(res, viewName, err, extra = {}) {
  res.render(viewName, { result: null, status: 500, error: err.message, ...extra });
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  res.render('dashboard');
});

// ═══════════════════════════════════════════════════════════════
//  PROFILE ENDPOINTS
// ═══════════════════════════════════════════════════════════════

/** GET /linkedin/profile/detail */
router.get('/profile/detail', (req, res) => {
  res.render('profile/detail', { result: null, status: null, error: null, profile_url: '' });
});
router.post('/profile/detail', async (req, res) => {
  const { profile_url } = req.body;
  try {
    const result = await api.getProfileDetail(profile_url);
    handleResult(res, 'profile/detail', result, { profile_url });
  } catch (err) {
    handleError(res, 'profile/detail', err, { profile_url });
  }
});

/** GET /linkedin/profile/posts */
router.get('/profile/posts', (req, res) => {
  res.render('profile/posts', { result: null, status: null, error: null, profile_url: '' });
});
router.post('/profile/posts', async (req, res) => {
  const { profile_url } = req.body;
  try {
    const result = await api.getProfilePosts(profile_url);
    handleResult(res, 'profile/posts', result, { profile_url });
  } catch (err) {
    handleError(res, 'profile/posts', err, { profile_url });
  }
});

/** GET /linkedin/profile/experience */
router.get('/profile/experience', (req, res) => {
  res.render('profile/experience', { result: null, status: null, error: null, profile_url: '' });
});
router.post('/profile/experience', async (req, res) => {
  const { profile_url } = req.body;
  try {
    const result = await api.getProfileExperience(profile_url);
    handleResult(res, 'profile/experience', result, { profile_url });
  } catch (err) {
    handleError(res, 'profile/experience', err, { profile_url });
  }
});

/** GET /linkedin/profile/education */
router.get('/profile/education', (req, res) => {
  res.render('profile/education', { result: null, status: null, error: null, profile_url: '' });
});
router.post('/profile/education', async (req, res) => {
  const { profile_url } = req.body;
  try {
    const result = await api.getProfileEducation(profile_url);
    handleResult(res, 'profile/education', result, { profile_url });
  } catch (err) {
    handleError(res, 'profile/education', err, { profile_url });
  }
});

/** GET /linkedin/profile/skills */
router.get('/profile/skills', (req, res) => {
  res.render('profile/skills', { result: null, status: null, error: null, profile_url: '' });
});
router.post('/profile/skills', async (req, res) => {
  const { profile_url } = req.body;
  try {
    const result = await api.getProfileSkills(profile_url);
    handleResult(res, 'profile/skills', result, { profile_url });
  } catch (err) {
    handleError(res, 'profile/skills', err, { profile_url });
  }
});

/** GET /linkedin/profile/connections */
router.get('/profile/connections', (req, res) => {
  res.render('profile/connections', { result: null, status: null, error: null, profile_url: '' });
});
router.post('/profile/connections', async (req, res) => {
  const { profile_url } = req.body;
  try {
    const result = await api.getProfileConnections(profile_url);
    handleResult(res, 'profile/connections', result, { profile_url });
  } catch (err) {
    handleError(res, 'profile/connections', err, { profile_url });
  }
});

// ─── Profile Upload (URL-based) ───────────────────────────────
router.get('/profile/upload', (req, res) => {
  res.render('profile/upload', { result: null, status: null, error: null, profileUrl: '' });
});
router.post('/profile/upload', async (req, res) => {
  const { profileUrl } = req.body;
  try {
    const result = await api.uploadProfileByUrl(profileUrl);
    handleResult(res, 'profile/upload', result, { profileUrl });
  } catch (err) {
    handleError(res, 'profile/upload', err, { profileUrl });
  }
});

// ═══════════════════════════════════════════════════════════════
//  COMPANY ENDPOINTS
// ═══════════════════════════════════════════════════════════════

router.get('/company/detail', (req, res) => {
  res.render('company/detail', { result: null, status: null, error: null, company: '' });
});
router.post('/company/detail', async (req, res) => {
  const { company } = req.body;
  try {
    const result = await api.getCompanyDetail(company);
    handleResult(res, 'company/detail', result, { company });
  } catch (err) {
    handleError(res, 'company/detail', err, { company });
  }
});

router.get('/company/employees', (req, res) => {
  res.render('company/employees', { result: null, status: null, error: null, company: '' });
});
router.post('/company/employees', async (req, res) => {
  const { company } = req.body;
  try {
    const result = await api.getCompanyEmployees(company);
    handleResult(res, 'company/employees', result, { company });
  } catch (err) {
    handleError(res, 'company/employees', err, { company });
  }
});

router.get('/company/jobs', (req, res) => {
  res.render('company/jobs', { result: null, status: null, error: null, company: '' });
});
router.post('/company/jobs', async (req, res) => {
  const { company } = req.body;
  try {
    const result = await api.getCompanyJobs(company);
    handleResult(res, 'company/jobs', result, { company });
  } catch (err) {
    handleError(res, 'company/jobs', err, { company });
  }
});

// ═══════════════════════════════════════════════════════════════
//  SEARCH ENDPOINTS
// ═══════════════════════════════════════════════════════════════

router.get('/search/people', (req, res) => {
  res.render('search/people', { result: null, status: null, error: null, keyword: '' });
});
router.post('/search/people', async (req, res) => {
  const { keyword } = req.body;
  try {
    const result = await api.searchPeople(keyword);
    handleResult(res, 'search/people', result, { keyword });
  } catch (err) {
    handleError(res, 'search/people', err, { keyword });
  }
});

router.get('/search/companies', (req, res) => {
  res.render('search/companies', { result: null, status: null, error: null, keyword: '' });
});
router.post('/search/companies', async (req, res) => {
  const { keyword } = req.body;
  try {
    const result = await api.searchCompanies(keyword);
    handleResult(res, 'search/companies', result, { keyword });
  } catch (err) {
    handleError(res, 'search/companies', err, { keyword });
  }
});

router.get('/search/jobs', (req, res) => {
  res.render('search/jobs', { result: null, status: null, error: null, keyword: '' });
});
router.post('/search/jobs', async (req, res) => {
  const { keyword } = req.body;
  try {
    const result = await api.searchJobs(keyword);
    handleResult(res, 'search/jobs', result, { keyword });
  } catch (err) {
    handleError(res, 'search/jobs', err, { keyword });
  }
});


router.get('/profile/view', (req, res) => {
  res.render('profile/view', { profile: null, error: null, profile_url: '' });
});


router.post('/profile/view', async (req, res) => {
  const { profile_url } = req.body;

  try {

    const [detail] = await Promise.all([
      api.getProfileDetail(profile_url)
    ]);

    res.render('profile/view', {
      profile: detail.data.data,
      error: null,
      profile_url
    });

  } catch (err) {
    res.render('profile/view', {
      profile: null,
      error: err.message,
      profile_url
    });
  }
});
module.exports = router;
