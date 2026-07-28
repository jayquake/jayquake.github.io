/* Apartment finder UI.
 *
 * Plain JS on purpose: this is a single-user tool served from a local box, and
 * a build step would be more machinery than the whole app needs.
 */

const PAGE_SIZE = 30;

const state = {
  tab: 'feed',
  offset: 0,
  total: 0,
  listings: [],
};

const $ = (sel) => document.querySelector(sel);

/* ---------- helpers ---------- */

async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}

function shekels(n) {
  return n == null ? '—' : `₪${n.toLocaleString('en-US')}`;
}

let toastTimer;
function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 2600);
}

/** Escapes user/scraped text before it goes near innerHTML. */
function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

/** Only http(s) URLs are allowed to become links — manual:// entries are not. */
function safeUrl(url) {
  return /^https?:\/\//i.test(url || '') ? url : null;
}

/* ---------- rendering ---------- */

function sparkline(history) {
  if (!history || history.length < 2) return '';
  const prices = history.map((h) => h.priceIls);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const width = 260;
  const height = 34;

  const points = prices
    .map((price, i) => {
      const x = (i / (prices.length - 1)) * width;
      const y = height - 4 - ((price - min) / range) * (height - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const dropped = prices[prices.length - 1] < prices[0];
  const color = dropped ? 'var(--good)' : 'var(--muted)';

  return `<svg class="spark" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img"
    aria-label="Price history: ${shekels(prices[0])} to ${shekels(prices[prices.length - 1])}">
    <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2"
      stroke-linejoin="round" stroke-linecap="round" />
  </svg>`;
}

function listingCard(listing) {
  const image = listing.imageUrls && listing.imageUrls[0];
  const history = listing.priceHistory || [];
  const firstPrice = history.length > 1 ? history[0].priceIls : null;
  const isDrop = firstPrice != null && listing.priceIls != null && listing.priceIls < firstPrice;

  const specs = [
    listing.rooms != null ? `${listing.rooms} rm` : null,
    listing.sizeSqm != null ? `${listing.sizeSqm} m²` : null,
    listing.floor != null ? (listing.floor === 0 ? 'ground floor' : `floor ${listing.floor}`) : null,
  ].filter(Boolean).join(' · ');

  const place = [listing.neighborhood, listing.city].filter(Boolean).join(', ');

  // Only a confirmed agent post is badged. `null` means the listing never said,
  // and labelling that "private" would be a claim the data does not support.
  const posterBadge =
    listing.isAgency === true ? '<span class="badge warn">Realtor</span>'
    : listing.isAgency === false ? '<span class="badge ok">Owner</span>'
    : '';

  const amenityBadges = Object.entries({
    Elevator: listing.amenities.elevator,
    Parking: listing.amenities.parking,
    Balcony: listing.amenities.balcony,
    'Safe room': listing.amenities.safeRoom,
    Furnished: listing.amenities.furnished,
  })
    .filter(([, on]) => on)
    .map(([label]) => `<span class="badge">${label}</span>`)
    .join('');

  const url = safeUrl(listing.url);
  const titleHtml = url
    ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(listing.title)}</a>`
    : esc(listing.title);

  const reasons = (listing.scoreReasons || []).slice(0, 2).join(' · ');

  return `
    <article class="card listing ${image ? '' : 'no-image'}" data-id="${esc(listing.id)}">
      ${image ? `<img class="thumb" src="${esc(image)}" alt="" loading="lazy" referrerpolicy="no-referrer" />` : ''}
      <div>
        <p class="listing-title" dir="auto">${titleHtml}</p>
        <div class="price ${isDrop ? 'is-drop' : ''}">
          ${shekels(listing.priceIls)}
          ${isDrop ? `<span class="old">${shekels(firstPrice)}</span>` : ''}
        </div>
        <div class="meta" dir="auto">${esc(specs)}${specs && place ? ' · ' : ''}${esc(place)}</div>
        ${reasons ? `<div class="meta">✨ ${esc(reasons)}</div>` : ''}
        <div class="badges">
          <span class="badge score">${listing.score}</span>
          <span class="badge src">${esc(listing.source)}</span>
          ${posterBadge}
          ${amenityBadges}
        </div>
        ${sparkline(history)}
        <div class="actions">
          <button class="btn btn-ghost" data-action="SAVED">${listing.status === 'SAVED' ? '★ Saved' : '☆ Save'}</button>
          <button class="btn btn-ghost" data-action="HIDDEN">Hide</button>
          <button class="btn btn-ghost" data-action="CONTACTED">${listing.status === 'CONTACTED' ? '✓ Contacted' : 'Contacted'}</button>
        </div>
      </div>
    </article>`;
}

function renderList(container, listings, emptyMessage) {
  if (!listings.length) {
    container.innerHTML = `<p class="empty">${esc(emptyMessage)}</p>`;
    return;
  }
  container.innerHTML = listings.map(listingCard).join('');

  // Listing sites expire their image URLs and some block hotlinking, so a
  // broken thumbnail is routine. Drop it and reflow the card to the no-image
  // layout rather than leaving an empty grey box occupying the column.
  container.querySelectorAll('img.thumb').forEach((img) => {
    img.addEventListener(
      'error',
      () => {
        const card = img.closest('.listing');
        if (card) card.classList.add('no-image');
        img.remove();
      },
      { once: true }
    );
  });
}

/* ---------- data loading ---------- */

const FILTER_FIELDS = [
  ['#filter-q', 'q'],
  ['#filter-min-price', 'minPrice'],
  ['#filter-max-price', 'maxPrice'],
  ['#filter-poster', 'poster'],
  ['#filter-source', 'source'],
];

function feedQuery(offset) {
  const params = new URLSearchParams({
    sort: $('#filter-sort').value,
    limit: String(PAGE_SIZE),
    offset: String(offset),
  });
  for (const [sel, key] of FILTER_FIELDS) {
    const value = $(sel).value.trim();
    if (value) params.set(key, value);
  }
  return params.toString();
}

async function loadFeed(append = false) {
  const offset = append ? state.offset + PAGE_SIZE : 0;
  try {
    const data = await api(`/listings?${feedQuery(offset)}`);
    state.offset = offset;
    state.total = data.total;
    state.listings = append ? state.listings.concat(data.listings) : data.listings;
    renderList($('#feed-list'), state.listings, 'No listings match. Try widening the filters, or tap "Scan now".');
    $('#result-count').textContent =
      data.total === 0 ? '' : `${state.listings.length} of ${data.total}`;
    $('#load-more').hidden = state.listings.length >= state.total;
  } catch (err) {
    $('#feed-list').innerHTML = `<p class="empty">Failed to load: ${esc(err.message)}</p>`;
  }
}

async function loadSaved() {
  try {
    const data = await api('/listings?status=SAVED&limit=200');
    renderList($('#saved-list'), data.listings, 'Nothing saved yet.');
  } catch (err) {
    $('#saved-list').innerHTML = `<p class="empty">Error: ${esc(err.message)}</p>`;
  }
}

async function loadStatus() {
  try {
    const s = await api('/status');
    const last = s.lastRun;
    const parts = [`${s.counts.active} active`, `${s.counts.saved} saved`];
    if (last) {
      const when = new Date(last.startedAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
      parts.push(`last scan ${when} · ${last.new} new`);
      if (last.errors && last.errors.length) parts.push(`⚠️ ${last.errors.length} source errors`);
    }
    if (s.scanning) parts.push('scanning now…');
    $('#status-line').textContent = parts.join(' · ');
    $('#scan-btn').disabled = s.scanning;
    return s;
  } catch {
    $('#status-line').textContent = 'Cannot reach the server';
    return null;
  }
}

async function loadCriteria() {
  const { criteria: c } = await api('/criteria');
  const set = (id, value) => {
    const el = $(id);
    if (el) el.value = value ?? '';
  };
  set('#c-minPrice', c.minPriceIls);
  set('#c-maxPrice', c.maxPriceIls);
  set('#c-minRooms', c.minRooms);
  set('#c-maxRooms', c.maxRooms);
  set('#c-minSize', c.minSizeSqm);
  set('#c-idealPrice', c.preferences.idealMaxPriceIls);
  set('#c-cities', (c.cities || []).join(', '));
  set('#c-favAreas', (c.preferences.favoriteNeighborhoods || []).join(', '));
  set('#c-exclude', (c.excludeKeywords || []).join(', '));
  set('#c-minScore', c.minScoreToAlert);
  set('#c-minDrop', c.minPriceDropPercent);
  const posterSelect = $('#c-posterType');
  if (posterSelect) posterSelect.value = c.posterType || 'any';
  $('#c-strictPoster').checked = !!c.strictPosterFilter;
  $('#c-reqElevator').checked = !!c.requireElevator;
  $('#c-reqParking').checked = !!c.requireParking;
  $('#c-reqBalcony').checked = !!c.requireBalcony;
  $('#c-reqSafeRoom').checked = !!c.requireSafeRoom;
}

/* ---------- events ---------- */

function numberOrUndefined(id) {
  const raw = $(id).value.trim();
  if (raw === '') return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

function csv(id) {
  return $(id).value.split(',').map((s) => s.trim()).filter(Boolean);
}

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => {
      t.classList.toggle('is-active', t === tab);
      t.setAttribute('aria-selected', String(t === tab));
    });
    state.tab = tab.dataset.tab;
    document.querySelectorAll('.panel').forEach((p) => {
      p.classList.toggle('is-active', p.id === `panel-${state.tab}`);
    });

    if (state.tab === 'saved') loadSaved();
    if (state.tab === 'settings') loadCriteria().catch((e) => toast(e.message));
  });
});

// Delegated so the handler survives re-renders.
document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const card = button.closest('[data-id]');
  if (!card) return;

  const id = card.dataset.id;
  const listing = state.listings.find((l) => l.id === id);
  const requested = button.dataset.action;
  // Tapping the active status clears it, so the same button un-saves.
  const status = listing && listing.status === requested ? null : requested;

  try {
    await api(`/listings/${id}/action`, { method: 'POST', body: { status } });
    if (listing) listing.status = status;

    if (status === 'HIDDEN') {
      card.remove();
      toast('Hidden');
    } else {
      toast(status ? 'Updated' : 'Cleared');
      if (state.tab === 'saved') loadSaved();
      else renderList($('#feed-list'), state.listings, '');
    }
  } catch (err) {
    toast(`Error: ${err.message}`);
  }
});

$('#scan-btn').addEventListener('click', async () => {
  $('#scan-btn').disabled = true;
  try {
    await api('/scan', { method: 'POST', body: {} });
    toast('Scan started — this takes a few minutes');
    // Poll until the run finishes, then refresh the feed.
    const poll = setInterval(async () => {
      const s = await loadStatus();
      if (s && !s.scanning) {
        clearInterval(poll);
        loadFeed();
      }
    }, 5000);
  } catch (err) {
    toast(`Error: ${err.message}`);
    $('#scan-btn').disabled = false;
  }
});

$('#manual-submit').addEventListener('click', async () => {
  const box = $('#manual-result');
  const text = $('#manual-text').value.trim();
  if (text.length < 20) {
    box.hidden = false;
    box.className = 'result err';
    box.textContent = 'That text is too short.';
    return;
  }

  try {
    const result = await api('/ingest/manual', {
      method: 'POST',
      body: { text, url: $('#manual-url').value.trim() || undefined },
    });
    const p = result.parsed;
    box.hidden = false;
    box.className = 'result ok';
    box.textContent = result.note
      ? `Parsed ${shekels(p.priceIls)} · ${p.rooms ?? '?'} rooms — but it does not match your criteria.`
      : `Added: ${shekels(p.priceIls)} · ${p.rooms ?? '?'} rooms · ${p.city || 'city not detected'}`;
    $('#manual-text').value = '';
    $('#manual-url').value = '';
    loadFeed();
  } catch (err) {
    box.hidden = false;
    box.className = 'result err';
    box.textContent = `Error: ${err.message}`;
  }
});

$('#criteria-save').addEventListener('click', async () => {
  const box = $('#criteria-result');
  try {
    await api('/criteria', {
      method: 'PUT',
      body: {
        minPriceIls: numberOrUndefined('#c-minPrice'),
        maxPriceIls: numberOrUndefined('#c-maxPrice'),
        minRooms: numberOrUndefined('#c-minRooms'),
        maxRooms: numberOrUndefined('#c-maxRooms'),
        minSizeSqm: numberOrUndefined('#c-minSize'),
        cities: csv('#c-cities'),
        excludeKeywords: csv('#c-exclude'),
        minScoreToAlert: numberOrUndefined('#c-minScore') ?? 55,
        minPriceDropPercent: numberOrUndefined('#c-minDrop') ?? 3,
        posterType: $('#c-posterType').value,
        strictPosterFilter: $('#c-strictPoster').checked,
        requireElevator: $('#c-reqElevator').checked,
        requireParking: $('#c-reqParking').checked,
        requireBalcony: $('#c-reqBalcony').checked,
        requireSafeRoom: $('#c-reqSafeRoom').checked,
        preferences: {
          idealMaxPriceIls: numberOrUndefined('#c-idealPrice'),
          favoriteNeighborhoods: csv('#c-favAreas'),
        },
      },
    });
    box.hidden = false;
    box.className = 'result ok';
    box.textContent = 'Saved. The next scan will use these criteria.';
  } catch (err) {
    box.hidden = false;
    box.className = 'result err';
    box.textContent = `Error: ${err.message}`;
  }
});

let debounce;
['#filter-q', '#filter-min-price', '#filter-max-price'].forEach((sel) => {
  $(sel).addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => loadFeed(), 350);
  });
});
['#filter-sort', '#filter-poster', '#filter-source'].forEach((sel) => {
  $(sel).addEventListener('change', () => loadFeed());
});

$('#filter-reset').addEventListener('click', () => {
  ['#filter-q', '#filter-min-price', '#filter-max-price', '#filter-poster', '#filter-source'].forEach((sel) => {
    $(sel).value = '';
  });
  $('#filter-sort').value = 'score';
  loadFeed();
});
$('#load-more').addEventListener('click', () => loadFeed(true));

/* ---------- boot ---------- */
loadStatus();
loadFeed();
