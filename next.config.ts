// next.config.js
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repo = 'sadge-portfolio'; 

module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
};
