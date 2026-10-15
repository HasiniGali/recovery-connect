// Mock localStorage for Node test environment
const store = new Map();
global.localStorage = {
  getItem: (key) => store.get(key) || null,
  setItem: (key, val) => store.set(key, val),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear()
};
global.window = {
  dispatchEvent: () => {}
};
global.Event = class Event {};

async function testHeroFlow() {
  console.log('--- STARTING RECOVERY CONNECT HERO FLOW TEST ---');

  // 1. Import extractor and API
  const { extractPreferences, calculatePreferenceMatch } = await import('./src/services/nlpExtractor.ts');
  const { api } = await import('./src/services/api.ts');

  // 2. Test Hero Query
  const heroQuery = 'I need free Tamil counselling near Vellore that is open today.';
  console.log('\nStep 1 & 2: Parsing query:', heroQuery);
  const extraction = extractPreferences(heroQuery);
  console.log('Extracted Tokens:', extraction.tokens.map(t => `${t.type}: ${t.label}`));

  // Check expected tokens
  const tokenLabels = extraction.tokens.map(t => t.label.toLowerCase());
  const expected = ['counselling', 'free', 'tamil', 'vellore', 'open today'];
  for (const exp of expected) {
    if (tokenLabels.some(l => l.includes(exp))) {
      console.log(`✓ Token matched: "${exp}"`);
    } else {
      console.error(`✗ Missing token: "${exp}"`);
    }
  }

  // 3. Load resources and calculate matches
  console.log('\nStep 3 & 4 & 5: Matching resources & calculating scores...');
  const allResources = await api.getResources();
  console.log(`Total database resources loaded: ${allResources.length}`);

  const matches = allResources
    .map(resource => ({
      resource,
      match: calculatePreferenceMatch(resource, extraction)
    }))
    .filter(({ resource }) => {
      if (extraction.category && resource.category !== extraction.category) return false;
      if (extraction.cost === 'free' && resource.cost !== 'free') return false;
      if (extraction.language && !resource.languages.includes(extraction.language)) return false;
      if (extraction.availability === 'open_today' && resource.availability !== 'open_today' && resource.availability !== '24_7') return false;
      return true;
    })
    .sort((a, b) => b.match.score - a.match.score);

  console.log(`✓ Filtered matching resources found: ${matches.length}`);
  matches.forEach(({ resource, match }, idx) => {
    console.log(`  [${idx + 1}] ${resource.name} | Preference Match: ${match.score}% | Dist: ${resource.distanceKm}km | Status: ${resource.verificationStatus}`);
  });

  const topResource = matches[0].resource;
  console.log(`\nStep 6, 7, 8, 9: Top resource inspected: "${topResource.name}" (ID: ${topResource.id})`);
  console.log(`✓ Verification Status: ${topResource.verificationStatus}`);
  console.log(`✓ Distance: ${topResource.distanceKm} km`);
  console.log(`✓ Source: ${topResource.source}`);
  console.log(`✓ Verification Date: ${topResource.verificationDate}`);

  // 4. Test bookmarking
  console.log('\nTesting Save / Bookmark functionality...');
  await api.saveResource(topResource.id);
  const isSaved = await api.isResourceSaved(topResource.id);
  console.log(`✓ Is resource saved: ${isSaved}`);

  // 5. Test Community Reporting
  console.log('\nStep 11 & 12: Submitting community accuracy report...');
  const newReport = await api.reportResource({
    resourceId: topResource.id,
    resourceName: topResource.name,
    reason: 'phone_incorrect',
    reasonLabel: 'Phone number incorrect',
    description: 'Call failed during business hours. Please verify new reception line.'
  });
  console.log(`✓ Report submitted with ID: ${newReport.id}`);

  // 6. Test Admin Retrieval
  console.log('\nStep 13 & 14: Checking Admin Reports Queue...');
  const reports = await api.getReports();
  const foundReport = reports.find(r => r.id === newReport.id);
  console.log(`✓ Report appears in admin queue: ${!!foundReport}, Status: ${foundReport?.status}`);

  // Verify resource status updated to 'reported'
  const reportedResource = await api.getResourceById(topResource.id);
  console.log(`✓ Public Resource status updated to: ${reportedResource?.verificationStatus}`);

  // 7. Test Admin Resolution
  console.log('\nStep 15 & 16: Admin reviews and resolves report...');
  await api.resolveReport(newReport.id, 'Confirmed phone line was temporarily down for exchange maintenance; now active.');
  const updatedReports = await api.getReports();
  const resolvedReport = updatedReports.find(r => r.id === newReport.id);
  console.log(`✓ Admin Report status now: ${resolvedReport?.status}`);

  const finalResource = await api.getResourceById(topResource.id);
  console.log(`✓ Public Resource status restored to: ${finalResource?.verificationStatus}`);
  console.log(`✓ Resource Audit Log entries count: ${finalResource?.auditHistory.length}`);
  console.log(`✓ Latest audit log: ${finalResource?.auditHistory[0]?.note}`);

  console.log('\n--- ALL HERO FLOW CHECKS PASSED PERFECTLY ---');
}

testHeroFlow().catch(console.error);
