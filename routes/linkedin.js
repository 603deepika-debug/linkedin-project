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


router.get('/profile/comments', (req, res) => {
  res.render('profile/comments', { result: null, status: null, error: null, profile_url: '' });
});

router.post('/profile/comments', async (req, res) => {
  const { profile_url } = req.body;

  try {
    const result = await api.getProfileComments(profile_url);
    handleResult(res, 'profile/comments', result, { profile_url });
  } catch (err) {
    handleError(res, 'profile/comments', err, { profile_url });
  }
});


router.get('/profile/reactions', (req, res) => {
  res.render('profile/reactions', { result: null, status: null, error: null, profile_url: '' });
});

router.post('/profile/reactions', async (req, res) => {
  const { profile_url } = req.body;

  try {
    const result = await api.getProfileReactions(profile_url);
    handleResult(res, 'profile/reactions', result, { profile_url });
  } catch (err) {
    handleError(res, 'profile/reactions', err, { profile_url });
  }
});

router.get('/profile/contact', (req, res) => {
  res.render('profile/contact', { result: null, status: null, error: null, profile_url: '' });
});

router.post('/profile/contact', async (req, res) => {
  const { profile_url } = req.body;

  try {
    const result = await api.getProfileContact(profile_url);
    handleResult(res, 'profile/contact', result, { profile_url });
  } catch (err) {
    handleError(res, 'profile/contact', err, { profile_url });
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

// ═══════════════════════════════════════════════════════════════
// COMPANY POSTS
// ═══════════════════════════════════════════════════════════════

router.get('/company/posts', (req, res) => {
  res.render('company/posts', { result: null,status: null,error: null,company: '' });
});


router.post('/company/posts', async (req, res) => {

  const { company } = req.body;

  try {

    const result = await api.getCompanyPosts(company);

    handleResult(res,'company/posts',result,{ company });

  } catch (err) {

    handleError(res,'company/posts',err, { company });

  }

});

// router.get('/company/employees', (req, res) => {
//   res.render('company/employees', { result: null, status: null, error: null, company: '' });
// });
// router.post('/company/employees', async (req, res) => {
//   const { company } = req.body;
//   try {
//     const result = await api.getCompanyEmployees(company);
//     handleResult(res, 'company/employees', result, { company });
//   } catch (err) {
//     handleError(res, 'company/employees', err, { company });
//   }
// });

// router.get('/company/jobs', (req, res) => {
//   res.render('company/jobs', { result: null, status: null, error: null, company: '' });
// });
// router.post('/company/jobs', async (req, res) => {
//   const { company } = req.body;
//   try {
//     const result = await api.getCompanyJobs(company);
//     handleResult(res, 'company/jobs', result, { company });
//   } catch (err) {
//     handleError(res, 'company/jobs', err, { company });
//   }
// });

// ═══════════════════════════════════════════════════════════════
//  SEARCH ENDPOINTS
// ═══════════════════════════════════════════════════════════════

// router.get('/search/people', (req, res) => {
//   res.render('search/people', { result: null, status: null, error: null, keyword: '' });
// });
// router.post('/search/people', async (req, res) => {
//   const { keyword } = req.body;
//   try {
//     const result = await api.searchPeople(keyword);
//     handleResult(res, 'search/people', result, { keyword });
//   } catch (err) {
//     handleError(res, 'search/people', err, { keyword });
//   }
// });

// router.get('/search/companies', (req, res) => {
//   res.render('search/companies', { result: null, status: null, error: null, keyword: '' });
// });
// router.post('/search/companies', async (req, res) => {
//   const { keyword } = req.body;
//   try {
//     const result = await api.searchCompanies(keyword);
//     handleResult(res, 'search/companies', result, { keyword });
//   } catch (err) {
//     handleError(res, 'search/companies', err, { keyword });
//   }
// });

router.get('/search/companies', (req, res) => {

  res.render('company/search', { 
    result: null, 
    status: null, 
    error: null, 
    keyword: '' 
  });

});


router.post('/search/companies', async (req, res) => {

  const { keyword } = req.body;


  try {

    const result = await api.searchCompanies(keyword);


    handleResult(
      res,
      'company/search',
      result,
      { keyword }
    );


  } catch(err){


    handleError(
      res,
      'company/search',
      err,
      { keyword }
    );


  }

});

router.get('/job/detail',(req,res)=>{
 res.render('job/detail',{result:null,status:null,error:null,job_id:''});
});


router.post('/job/detail',async(req,res)=>{

 const {job_id}=req.body;

 try{

 const result = await api.getJobDetail(job_id);

 handleResult(res,'job/detail',result,{job_id});
}
 catch(err){

 handleError(res, 'job/detail',err,{job_id});

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
