import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG:true,
    unoptimized:true,
    domains: ["dl.dropboxusercontent.com","plus.unsplash.com"] // Add Dropbox domain here
  },
  compiler:{
    removeConsole : process.env.NODE_ENV === 'production'
  },
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }

    return config;
  },
    async redirects() {
    return [
      {
        source: "/core-values-that-make-assent-the-excellent-choice-as-steel-fabricator-and-steel-erector",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/adnoc-strategic-collaboration-agreement-with-assent-steel-for-steel-structure-fabrication-works",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-hosts-visit-of-delegates-from-brazil-national-industry-confederation-cni",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-is-pleased-to-introduce-mr-karl-roberts-as-chief-business-development-advisor-for-their-north-america-operations",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-15th-anniversary-celebration-and-long-service-awards",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-egypt-engineering-office-communication-skills-training-program",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-facility-rated-grade-a-by-dubai-municipality",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-is-proud-to-be-the-largest-steel-fabrication-facility-in-the-gcc",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-presentation-and-soft-skills-training",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-s-steel-cutting-ceremony-for-the-mazeikiai-refinery-project",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-visits-sharjah-s-old-people-s-home",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/happy-world-day-for-safety-and-health-at-work",
        destination: "/news/world-day-for-safety-and-health-at-work",
        permanent: true,
      },
      {
        source: "/news-detail/heart-of-steel-meet-our-head-of-security-mohamed-nasr",
        destination: "/news/heart-of-steel-egypt",
        permanent: true,
      },
      {
        source: "/news-detail/new-name-same-trusted-steel-fabricator-assent-steel-industries-l-l-c",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/usa-contract-award-one-giant-leap-for-assent-steel",
        destination: "/news/project-award-usa-bechtel-and-kiewit",
        permanent: true,
      },
      {
        source: "/news-detail/valentine-s-day-celebration-at-assent-steel",
        destination: "/news/valentine-s-day",
        permanent: true,
      },
      {
        source: "/press-detail/assent-steel-for-a-safe-and-accident-free-workplace",
        destination: "/news/world-day-for-safety-and-health-at-work",
        permanent: true,
      },
      {
        source: "/press-detail/role-of-structural-steel-in-oil-and-gas-industry",
        destination: "/",
        permanent: true,
      },
      {
        source: "/project/acfi-feed-mill-coffee-roasting-oat-flaking-factories",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-cold-storage-g-m-office-g-m",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-modification-extension-of-warehouse-with-cold-storage-office",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/contact-branch-office",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/contact-head-office",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/core-values-and-purpose",
        destination: "/",
        permanent: true,
      },
      {
        source: "/form-download",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/form-quotation",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/form-vender-registration",
        destination: "/",
        permanent: true,
      },
      {
        source: "/news-detail/10-million-manhours-without-lost-time-incidents-lti",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/3-5-million-manhours-lti-free",
        destination: "/news/3-5-m-manhours",
        permanent: true,
      },
      {
        source: "/news-detail/5s-challenge-november-winners",
        destination: "/news/5s-winner-celebration",
        permanent: true,
      },
      {
        source: "/news-detail/5s-challenge-october-winners",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/5s-challenge-winners-september",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/all-together-for-syria-and-turkiye",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-celebrates-13th-year-of-establishment",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-celebrates-international-women-s-day",
        destination: "/news/women-s-day-wishes",
        permanent: true,
      },
      {
        source: "/news-detail/assent-celebrates-uae-national-day",
        destination: "/news/uae-national-day-2nov-production-video-uae-anthem-assent-steel-is-a-proud-uae-based-company",
        permanent: true,
      },
      {
        source: "/news-detail/assent-celebrates-world-quality-day",
        destination: "/news/world-quality-month-thus",
        permanent: true,
      },
      {
        source: "/news-detail/assent-cleanup-drive-2022",
        destination: "/news/world-environment-day-cleanup-drive",
        permanent: true,
      },
      {
        source: "/news-detail/assent-first-aid-training",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-is-pleased-to-introduce-mr-karl-roberts-as-chief-business-development-advisor-for-their-north-america-operations",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-new-contract-award",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-quality-trainings",
        destination: "/news/quality-at-every-step",
        permanent: true,
      },
      {
        source: "/news-detail/assent-safety-tbt-pre-task-briefings-2021",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-sandwich-panels-are-now-fm-approved",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-11-fabrication-bays",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-2023-year-in-review",
        destination: "/news/year-end-review-2024",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-5s-training",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-8-super-painting-bays",
        destination: "/news/info-painting-bays",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-at-night",
        destination: "/news/factory-reel-day-to-night-bracklight-trasformation",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-blood-donation-drive-2022",
        destination: "/news/blood-donation",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-celebrates-15-years",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-celebrates-uae-flag-day",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-delivers-globally-2",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-dubai-waste-to-energy-project-progress",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-dubai-waste-to-energy-project-visit",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-fire-mock-drill",
        destination: "/gallery-details/hse/heat-stress-mockdrill",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-first-responders",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-in-the-color-of-nature",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-industries-l-l-c",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-internal-and-site-audit",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-iosh-training",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-is-14-years-strong",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-is-proud-to-be-the-largest-steel-fabrication-facility-in-the-gcc",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-long-service-award-celebration",
        destination: "/news/long-service-awards-2025",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-new-contract-awards",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-platinum-leed-certified",
        destination: "/news/assent-steel-facts-leed-platinum",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-presentation-and-soft-skills-training",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-ramadan-donation-drive-2023-2",
        destination: "/news/all-donations-food-meal-groceries-ramadan-pack-from-hr",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-s-fire-emergency-awareness-training",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-s-sportsfest-2023",
        destination: "/news/sports-fest-2024-mon-tue",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-s-sportsfest-parade",
        destination: "/news/sports-fest-2024-1",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-s-world-class-certifications",
        destination: "/news/aisc-certificate-recoginition-static-post",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-sportsfest-2022",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-sportsfest-2022-parade",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-timeline",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-toolbox-talks",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-wellness-program",
        destination: "/news/wellness-month-video",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-workforce-beach-outing",
        destination: "/news/team-outing",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-workforce-excellence-awards",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-workforce-iftar-2023",
        destination: "/news/workforce-and-staaf-iftar",
        permanent: true,
      },
      {
        source: "/news-detail/assent-steel-year-in-review-2022",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/assent-visits-expo2020-dubai",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/at-assent-we-walk-the-talk",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/aws-certified-welding-fabricator",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/bangladesh-independence-day",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/christmas-theme-team-contest",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/christmas-tree-at-assent-steel",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/christmas-winter-wonderland-contest",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/cleaners-appreciation-award",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/connecting-continents-with-steel-excellence",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/dibba-bulk-handling-project-completion",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/drawing-contest",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/eid-al-adha-mubarak",
        destination: "/news/eid-al-adha-greeting",
        permanent: true,
      },
      {
        source: "/news-detail/eid-mubarak",
        destination: "/news/eid-mubarak-gr",
        permanent: true,
      },
      {
        source: "/news-detail/fabricated-steel-delivered-2010-2022",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/green-certificate",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/greetings-from-assent-steel-ramadan-kareem",
        destination: "/news/ramadan-kareem-from-assent-steel",
        permanent: true,
      },
      {
        source: "/news-detail/hand-and-finger-injury-prevention-campaign",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/hand-and-finger-injury-prevention-campaign-2023",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/hand-injury-prevention-campaign-2022",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/happy-diwali",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/happy-international-workers-day",
        destination: "/news/international-workers-day-assent-steel",
        permanent: true,
      },
      {
        source: "/news-detail/happy-world-quality-day",
        destination: "/news/world-quality-month-thus",
        permanent: true,
      },
      {
        source: "/news-detail/heat-stress-campaign-2023",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/hr-refresher-training",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/hr-top-performers-awards-dec-2022",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/hse-alert-discussion",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/iosh-certifications-in-assent",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/islamic-new-year-2",
        destination: "/news/new-year",
        permanent: true,
      },
      {
        source: "/news-detail/jumbo-structures",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/jumbo-structures-assent-steel",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/long-service-awards-10-years",
        destination: "/news/long-service-awards-2025",
        permanent: true,
      },
      {
        source: "/news-detail/mega-lucky-draw",
        destination: "/news/mega-lucky-draw",
        permanent: true,
      },
      {
        source: "/news-detail/new-contract-award",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/new-contract-award-1",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/new-contract-award-2",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/new-contract-award-3",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/new-contract-awards",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/notification-change-in-name",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/onam-celebration-assent-steel",
        destination: "/news/onam-celebration",
        permanent: true,
      },
      {
        source: "/news-detail/opening-of-assent-training-center",
        destination: "/news/asea-opening",
        permanent: true,
      },
      {
        source: "/news-detail/operations-learning-session",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/ppe-exhibition",
        destination: "/news/ppe-exhibition",
        permanent: true,
      },
      {
        source: "/news-detail/project-update-westfield-erf-100-delivered",
        destination: "/news/project-update-westfield-erf-100-delivered",
        permanent: true,
      },
      {
        source: "/news-detail/sabis-international-school-project-supplier-appreciation",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/safe-manual-handling-campaign",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/safety-awards-february",
        destination: "/news/hse-engagement-card-performance-2024-award-distribution",
        permanent: true,
      },
      {
        source: "/news-detail/safety-leadership-walk",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/safety-stand-down-meeting",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/steel-cutting-ceremony-hzi-dubai-waste-to-energy",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/steel-deliveries-at-assent-steel",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/stroll-around-our-process-from-engineering-to-delivery",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/tapmi-visit-at-assent-steel",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/team-building-assent-steel-egypt",
        destination: "/news/team-building-egypt",
        permanent: true,
      },
      {
        source: "/news-detail/trial-assembly",
        destination: "/news/triall-assembly",
        permanent: true,
      },
      {
        source: "/news-detail/uae-commemoration-day",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/uae-flag-day",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/uae-national-day",
        destination: "/news/uae-national-day-2nov-production-video-uae-anthem-assent-steel-is-a-proud-uae-based-company",
        permanent: true,
      },
      {
        source: "/news-detail/upskilling-the-staff",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/valentine-s-day-celebration-at-assent-steel",
        destination: "/news/valentine-s-day",
        permanent: true,
      },
      {
        source: "/news-detail/we-are-hiring",
        destination: "/news/wearehiring-hr",
        permanent: true,
      },
      {
        source: "/news-detail/welding-positions",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/wellness-with-assent-steel",
        destination: "/news/wellness-month-video",
        permanent: true,
      },
      {
        source: "/news-detail/workforce-excellence-award-winners",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-detail/world-quality-day-celebration",
        destination: "/news",
        permanent: true,
      },
      
      // -------- Press / Other --------
      
      {
        source: "/press-detail/5-iconic-steel-structures-by-assent",
        destination: "/",
        permanent: true,
      },
      {
        source: "/press-detail/assent-steel-sustainable-initiatives",
        destination: "/",
        permanent: true,
      },
      {
        source: "/press-detail/core-values-that-make-assent-the-excellent-choice-as-steel-fabricator-and-steel-erector",
        destination: "/",
        permanent: true,
      },
      {
        source: "/press-detail/national-welding-month-we-appreciate-our-welders",
        destination: "/",
        permanent: true,
      },
      {
        source: "/press-detail/structural-steel-in-transport-industry",
        destination: "/",
        permanent: true,
      },
      {
        source: "/press-release",
        destination: "/",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/",
        permanent: true,
      },
      {
        source: "/products-cladding",
        destination: "/",
        permanent: true,
      },
      {
        source: "/products-hot-rolled",
        destination: "/",
        permanent: true,
      },
      
      // -------- Projects --------
      
      {
        source: "/project/abu-dhabi-plaza",
        destination: "/projects/commercial/abu-dhabi-plaza",
        permanent: true,
      },
      {
        source: "/project/acfi-feed-mill-coffee-roasting-oat-flaking-factories",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/aktau-desalination-plant",
        destination: "/projects/industrial-oil-gas/aktau-desalination-plant",
        permanent: true,
      },
      {
        source: "/project/al-barsha-mall",
        destination: "/projects/commercial/al-barsha-mall",
        permanent: true,
      },
      {
        source: "/project/al-dabb-iya-facilities",
        destination: "/projects/industrial-oil-gas/al-dabb-iya-facilities",
        permanent: true,
      },
      {
        source: "/project/al-maktoum-stadium",
        destination: "/projects/commercial/al-maktoum-stadium",
        permanent: true,
      },
      {
        source: "/project/al-taweela-alumina",
        destination: "/projects/industrial-oil-gas/al-taweela-alumina",
        permanent: true,
      },
      {
        source: "/project/amc-car-park",
        destination: "/projects/commercial/amc-car-park",
        permanent: true,
      },
      {
        source: "/project/az-zour-north-iwpp",
        destination: "/projects/industrial-oil-gas/az-zour-north-iwpp",
        permanent: true,
      },
      {
        source: "/project/bab-thamama",
        destination: "/projects/industrial-oil-gas/bab-thamama",
        permanent: true,
      },
      {
        source: "/project/badra-oil-field",
        destination: "/projects/industrial-oil-gas/badra-oil-field",
        permanent: true,
      },
      {
        source: "/project/blue-water-residential",
        destination: "/projects/commercial/blue-water-residential",
        permanent: true,
      },
      {
        source: "/project/borouge-iii-o-u",
        destination: "/projects/industrial-oil-gas/borouge-iii-o-u",
        permanent: true,
      },
      {
        source: "/project/cargo-mega-terminal",
        destination: "/projects/commercial/cargo-mega-terminal",
        permanent: true,
      },
      {
        source: "/project/clean-fuel-project-mab-1",
        destination: "/projects/industrial-oil-gas/clean-fuel-project-mab-1",
        permanent: true,
      },
      
      // -------- Redirects to generic projects page --------
      
      {
        source: "/project/construction-of-adidas-logistic-center",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-agility-g-i-l-warehouse-office",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-al-jasser-cabinet-factory-2",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-bin-dasmal-warehouse-office",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-hotpack-p-i-warehouse-factory",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-nestle-manufacturing-facility",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-coca-cola-soft-drink-factory",
        destination: "/projects/commercial/coca-cola-arena",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-factory-office",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-g-1-office-and-warehouse",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-g-m-office-warehouse",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-g-m-warehouse",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-g-m-warehouse-office",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-hans-logistics-ground-floor-warehouse-and-g-m-office-blocks",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-patchi-warehouse",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-perfume-plant",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-print-pac-factory-warehouse-and-office-building",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-warehouse",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-warehouse-2",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-proposed-warehouse-in-kfia-airport",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-rta-garhoud-maintenance-facilities",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-sikka-warehouse",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/construction-of-warehouse-office",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/deira-waterfront-development",
        destination: "/projects/commercial/deira-waterfront-development",
        permanent: true,
      },
      {
        source: "/project/desalination-plant-facility-uhp",
        destination: "/projects/industrial-oil-gas/desalination-plant-facility-uhp",
        permanent: true,
      },
      {
        source: "/project/doha-metro",
        destination: "/projects/commercial/doha-metro",
        permanent: true,
      },
      {
        source: "/project/dubai-arena",
        destination: "/news/engg-marvels-dubai-coca-cola-arena",
        permanent: true,
      },
      {
        source: "/project/dubai-harbour-views",
        destination: "/projects/commercial/dubai-harbour-views",
        permanent: true,
      },
      {
        source: "/project/dubai-hills-estate-regional-mall",
        destination: "/projects/commercial/dubai-hills-estate-regional-mall",
        permanent: true,
      },
      {
        source: "/project/dubai-i-terminal-building",
        destination: "/projects/commercial/dubai-i-terminal-building",
        permanent: true,
      },
      {
        source: "/project/dubai-international-airport-expansion",
        destination: "/projects/commercial/dubai-international-airport-expansion",
        permanent: true,
      },
      {
        source: "/project/dubai-mall-boulevard-expansion",
        destination: "/projects/commercial/dubai-mall-boulevard-expansion",
        permanent: true,
      },
      {
        source: "/project/emirates-international-school",
        destination: "/projects/commercial/emirates-international-school",
        permanent: true,
      },
      {
        source: "/project/gas-sweetening",
        destination: "/projects/industrial-oil-gas/gas-sweetening",
        permanent: true,
      },
      {
        source: "/project/green-anode-plant-rodding-shop",
        destination: "/projects/industrial-oil-gas/green-anode-plant-rodding-shop",
        permanent: true,
      },
      {
        source: "/project/jazan-refinery-epc-2",
        destination: "/projects/industrial-oil-gas/jazan-refinery-epc-2",
        permanent: true,
      },
      {
        source: "/project/jebel-ali-power-station-m-extension",
        destination: "/projects/industrial-oil-gas/jebel-ali-power-station-m-extension",
        permanent: true,
      },
      {
        source: "/project/jumeirah-open-beach",
        destination: "/projects/commercial/jumeirah-open-beach",
        permanent: true,
      },
      {
        source: "/project/kellogg-s-factory",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/project/kuwait-international-airport",
        destination: "/projects/commercial/kuwait-international-airport",
        permanent: true,
      },
      {
        source: "/project/laffan-refinery-ii",
        destination: "/projects/industrial-oil-gas/laffan-refinery-ii",
        permanent: true,
      },
      {
        source: "/project/louvre-museum",
        destination: "/projects/commercial/louvre-museum",
        permanent: true,
      },
      {
        source: "/project/ma-aden-rolling-mill",
        destination: "/projects/industrial-oil-gas/ma-aden-rolling-mill",
        permanent: true,
      },
      {
        source: "/project/maaden-alumina-refinery",
        destination: "/projects/industrial-oil-gas/ma-aden-alumina-refinery",
        permanent: true,
      },
      {
        source: "/project/mapd-hydrogenation",
        destination: "/projects/industrial-oil-gas/mapd-hydrogenation",
        permanent: true,
      },
      {
        source: "/project/marsa-al-seef",
        destination: "/projects/commercial/marsa-al-seef",
        permanent: true,
      },
      {
        source: "/project/mirfa-iwpp",
        destination: "/projects/industrial-oil-gas/mirfa-iwpp",
        permanent: true,
      },
      {
        source: "/project/mohammed-bin-rashid-library",
        destination: "/projects/commercial/mohammed-bin-rashid-library",
        permanent: true,
      },
      {
        source: "/project/qurayyah-power-plant",
        destination: "/projects/industrial-oil-gas/qurayyah-power-plant",
        permanent: true,
      },
      {
        source: "/project/qusahwira-field",
        destination: "/projects/industrial-oil-gas/qusahwira-field",
        permanent: true,
      },
      {
        source: "/project/rabigh-ii-aromatics-naptha",
        destination: "/projects/industrial-oil-gas/rabigh-ii-aromatics-naptha",
        permanent: true,
      },
      {
        source: "/project/rapid-petronas-package-3",
        destination: "/projects/industrial-oil-gas/rapid-petronas-package-3",
        permanent: true,
      },
      {
        source: "/project/route-2020-metro-substructure-superstructure",
        destination: "/projects/commercial/route-2020-metro",
        permanent: true,
      },
      {
        source: "/project/ruwais-refinery-expansion-1-3-7",
        destination: "/projects/industrial-oil-gas/ruwais-refinery-expansion-1-3-7",
        permanent: true,
      },
      {
        source: "/project/sadara-desalination-plant",
        destination: "/projects/industrial-oil-gas/sadara-desalination-plant",
        permanent: true,
      },
      {
        source: "/project/sarb-package-4",
        destination: "/projects/industrial-oil-gas/sarb-package-4",
        permanent: true,
      },
      {
        source: "/project/shah-gas-package-1-2-3-4",
        destination: "/projects/industrial-oil-gas/shah-gas-package-1-2-3-4",
        permanent: true,
      },
      {
        source: "/project/shah-sulphur-station-pipeline",
        destination: "/projects/industrial-oil-gas/shah-sulphur-station-pipeline",
        permanent: true,
      },
      {
        source: "/project/sheikh-jaber-al-ahmad-cultural-centre",
        destination: "/projects/commercial/sheikh-jaber-al-ahmad-cultural-centre",
        permanent: true,
      },
      {
        source: "/project/smpp-concentrator",
        destination: "/projects/industrial-oil-gas/smpp-concentrator",
        permanent: true,
      },
      {
        source: "/project/south-yoloten",
        destination: "/projects/industrial-oil-gas/south-yoloten",
        permanent: true,
      },
      {
        source: "/project/tennis-complex",
        destination: "/projects/commercial/tennis-complex",
        permanent: true,
      },
      {
        source: "/project/umm-al-houl-power",
        destination: "/projects/industrial-oil-gas/umm-al-houl-power",
        permanent: true,
      },
      {
        source: "/project/west-qurna-i",
        destination: "/projects/industrial-oil-gas/west-qurna-i",
        permanent: true,
      },
      {
        source: "/project/western-range-dso-iron-ore",
        destination: "/projects/industrial-oil-gas/western-range-dso-iron-ore",
        permanent: true,
      },
      {
        source: "/projects-construction",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/projects-oil-gas-industry",
        destination: "/projects/industrial-oil-gas",
        permanent: true,
      },
      {
        source: "/projects-peb",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/projects-plants",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/qhse",
        destination: "/hse",
        permanent: true,
      },
      {
        source: "/qhse-hse",
        destination: "/hse",
        permanent: true,
      },
      {
        source: "/qhse-quality",
        destination: "/quality",
        permanent: true,
      },
      {
        source: "/services-engineering",
        destination: "/steel-engineering-services",
        permanent: true,
      },
      {
        source: "/services-fabrication",
        destination: "/steel-fabrication-services",
        permanent: true,
      },
      {
        source: "/services-installation",
        destination: "/",
        permanent: true,
      },
      {
        source: "/steel-engineering-service-in-africa",
        destination: "/global-presence/steel-engineering-service-in-africa",
        permanent: true,
      },
      {
        source: "/steel-engineering-service-in-europe",
        destination: "/global-presence/steel-engineering-service-in-europe",
        permanent: true,
      },
      {
        source: "/steel-engineering-service-in-us",
        destination: "/global-presence/steel-engineering-service-in-north-america",
        permanent: true,
      },
      {
        source: "/subsidiaries",
        destination: "/",
        permanent: true,
      },
      {
        source: "/vision-and-mission",
        destination: "/",
        permanent: true,
      },      
    ];
  },
};

export default nextConfig;
