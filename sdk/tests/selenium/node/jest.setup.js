// 180s aligns with jest.config.js testTimeout. The previous 60s value
// silently overrode the config and caused breadcrumb/graphics/search tests
// to fail before their audits could complete in headless CI.
jest.setTimeout(180000);
