const urls = [
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHqYB5Pt-1iUoCkPLqoi_wkrx4vEbqy_s1Kll2HMuC3WY8eqEA54aSdMo294Mnr9a1PozvL3YSGcPR8MC_GFnWF8ro0Wo77mGxhWh1O4-WjSMYTMCBgKuKhOBQuxt4=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH9EPmn2cYGYD_ArkJrIx_OWpcWHjuCGdElOJ-NV5ZabQMnxY0IVVck97mR07vYICr3_GIgksXCjTLWc_4CWWMrkAgx6spnF948-KktC5784hP4-ML_VnxAbz8zHLA=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE4GAwge41PkpdRPDFTDAgcMV0ESZ-lBVDoQ10cpM9FQz_gRqq8b8M8pjoN4ry63PQma73xCJ4sCs23yp7-2rG6imUlHAJ8HDeGR7hwYBuulXi8xj1vKMvW3NeGOKYX=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQKVvCc2Pe0WP1X8EapWlcbhvZYJtfy8Rj1H_Y0gz2ezdY4E6AtACB9ojgCtIx7dSHg-Kg3GA2BqNgOxAaipVCERlSuxsK6mbyK9bfuZqFDsEILr5JS4tZUBY4t5J6=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH8SyL-uVKB58v4w4xtdOWh4sRmBr6i7-x-lna2fys9PywgMWInZgtVK72NbQP6eSZrYcYnvSIU5DrGI1axuATy7m6ViCyHmriMHDLgng5ATP3GsA7FhlBC-u-Kfg=='
];

async function check() {
  for (const u of urls) {
    try {
      const res = await fetch(u, { redirect: 'manual' });
      console.log('Location:', res.headers.get('location'));
    } catch (e) {
      console.log('Err:', e.message);
    }
  }
}
check();
