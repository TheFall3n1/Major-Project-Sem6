import { Logo } from '../src/assets/images';

const siteConfig = {
  seo: {
    title: ' ',
    author: '   - LPU',
    copyright: '',
    description:
      'Browse programming tutorials and articles written by    - LPU team. Learn Web Development, Blockchain, Web3, AI/ML, Firebase and Google Cloud.',
    image:
      'https://res....com/dckfb8ri8/image/upload/v1668099221/Blog/landing_og_sq4ndv.jpg',
    altText: ' ',
    ogType: 'website',
    monetizationTag: '',
    twitterUsername: '',
    pages: {
      articles: {
        title: 'Articles |  ',
        description:
          '  ',
        image:
          'https://res....com/dckfb8ri8/image/upload/v1668099221/Blog/articles_og_j1kfet.jpg'
      },
      snippets: {
        title: 'Snippets |  ',
        description:
          'Learn about various Data Science, Web development, etc., subject matters within a very short amount of time with snippets.',
        image:
          'https://res....com/dckfb8ri8/image/upload/v1668099221/Blog/snippets_og_hmcdf2.jpg'
      },
      categories: {
        title: 'Categories |  ',
        description: 'Browse different categories.',
        image:
          'https://res....com/dckfb8ri8/image/upload/v1668099220/Blog/categories_og_eq5occ.jpg'
      },
      tags: {
        title: 'Tags |  ',
        description: 'Explore all the tags.',
        image:
          'https://res....com/dckfb8ri8/image/upload/v1668099221/Blog/tags_og_ikj2yj.jpg'
      },
      // privacy: {
      //   title: 'Privacy Policy |  ',
      //   description: 'This page contains itsrakesh - blog privacy policies.',
      //   image:
      //     'https://ik.imagekit.io/itsrakesh/Blog/privacy_policy_xq4AJG1mUd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656350838506'
      // },
      cookie: {
        title: 'Cookie Policy |  ',
        description: 'This page contains   cookie policies.',
        image:
          'https://res....com/dckfb8ri8/image/upload/v1668099221/Blog/landing_og_sq4ndv.jpg'
      }
      // terms: {
      //   title: 'Terms & Conditions |  ',
      //   description: 'This page contains itsrakesh - blog terms & conditions.',
      //   image:
      //     'https://ik.imagekit.io/itsrakesh/Blog/terms___conditions_jb7mesw-j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656350842954'
      // }
      // externalArticles: {
      //   title: 'External Articles |  ',
      //   description: 'Read articles written by Rakesh Potnuru on other sites.',
      //   image:
      //     'https://ik.imagekit.io/itsrakesh/Blog/external_articles_urr6u2vH1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657081755552'
      // }
    }
  },
  branding: {
    logo: Logo,
    colors: {
      brand: {
        50: '#4285F4',
        100: '#EA4335',
        200: '#FBBC04',
        300: '#34A853',
        400: '#48466D',
        500: '#769FCD'
      },
      text: '#454E56',
      themeLight: '#4285F4',
      themeDark: '#000000'
    },
    fonts: {
      heading: 'Google Sans Bold',
      body: 'Google Sans Regular'
    }
  },
  urls: {
    socials: {
      twitter: 'https://twitter.com/  lpu',
      linkedin: 'https://www.linkedin.com/company/  lpu',
      github: 'https://github.com/  lpu',
      instagram: 'https://www.instagram.com/  lpu',
      youtube: 'https://www.youtube.com/c/  LPU'
    },
    about:
      '',
    status: 'https://status.  lpu.live',
    newsletter: '',
    kofi: ''
  },
  adsense: {
    publisherId: '',
    slots: {
      pageTop: '',
      inFeed: ''
    }
  },
  copyrightText: `© ${new Date().getFullYear()}   DevX | All rights reserved.`,
  siteVersion: '1.0.0'
};

export default siteConfig;
