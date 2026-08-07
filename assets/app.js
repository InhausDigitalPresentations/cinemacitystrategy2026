/* ============================================================================
   CINEMACITY · SOCIAL MEDIA STRATEGY 2026–27
   app.js — RENDERING + INTERACTION
   ----------------------------------------------------------------------------
   No frameworks, no build step, no dependencies. Classic script (not a module)
   so the deck opens correctly from the filesystem by double-clicking index.html.

   Architecture
     · index.html holds the narrative frames — each is a unique composition and
       is easier to edit in place than through an abstraction.
     · content.js holds every repeating component's data.
     · This file renders those components and wires navigation.

   Nothing autoplays. Videos are click-to-load. Reduced motion is respected.
   ========================================================================= */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Escape everything that comes from content.js before it touches innerHTML. */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* A value is an unfilled placeholder if it is empty or an ALL_CAPS token. */
  function isToken(v) {
    return !v || /^[A-Z0-9_]+$/.test(String(v).trim());
  }

  function fmt(n) { return n.toLocaleString('en-US'); }

  /* ------------------------------------------------------------------------
     GOOGLE DRIVE URL NORMALISATION
     Accepts:
        https://drive.google.com/file/d/FILE_ID/view?usp=sharing
        https://drive.google.com/open?id=FILE_ID
        https://drive.google.com/uc?id=FILE_ID
        https://drive.google.com/file/d/FILE_ID/preview   (already embeddable)
     Returns an embeddable /preview URL, or null if it isn't a usable Drive link.
     Non-Drive URLs are returned untouched so direct MP4s also work.
  --------------------------------------------------------------------------*/
  function toDriveEmbed(url) {
    if (isToken(url)) return null;
    var u = String(url).trim();
    if (u.indexOf('drive.google.com') === -1) return u; // direct file / other host
    var m = u.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || u.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (!m) return null;
    return 'https://drive.google.com/file/d/' + m[1] + '/preview';
  }

  function isDirectVideo(url) { return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url || ''); }

  /* =======================================================================
     1 · NAVIGATION INDEX
  ======================================================================== */
  function buildIndex() {
    var grid = $('#indexGrid');
    if (!grid || typeof REELS === 'undefined') return;
    grid.innerHTML = REELS.map(function (r) {
      return '<div class="index__reel">' +
        '<h3>Reel ' + esc(r.n) + '</h3>' +
        '<p class="rt">' + esc(r.title) + '</p>' +
        '<ol>' + r.frames.map(function (f) {
          return '<li><a href="#' + esc(f.id) + '" data-goto="' + esc(f.id) + '">' +
                 '<i>' + esc(f.n) + '</i><span>' + esc(f.label) + '</span></a></li>';
        }).join('') + '</ol></div>';
    }).join('');
  }

  function wireIndex() {
    var panel = $('#indexPanel'), openBtn = $('#idxOpen'), closeBtn = $('#idxClose');
    if (!panel) return;
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      panel.setAttribute('data-open', 'true');
      panel.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var first = panel.querySelector('a');
      if (closeBtn) closeBtn.focus();
      else if (first) first.focus();
    }
    function close() {
      panel.setAttribute('data-open', 'false');
      panel.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    openBtn && openBtn.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    panel.addEventListener('click', function (e) {
      if (e.target.closest('[data-goto]')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.getAttribute('data-open') === 'true') { e.preventDefault(); close(); }
    });
    /* Trap focus inside the panel while it is open */
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || panel.getAttribute('data-open') !== 'true') return;
      var f = $$('a, button', panel).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* =======================================================================
     2 · SCROLL STATE — rail counter, chapter slug, progress bar
  ======================================================================== */
  function wireScrollState() {
    var frames = $$('.frame');
    var bar = $('#progressBar'), railNow = $('#railNow'), railReel = $('#railReel'), slug = $('#chromeSlug');
    var ticking = false;

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      if (bar) bar.style.width = pct + '%';

      var mid = window.scrollY + window.innerHeight * 0.35;
      var cur = frames[0];
      for (var i = 0; i < frames.length; i++) {
        if (frames[i].offsetTop <= mid) cur = frames[i]; else break;
      }
      if (!cur) return;
      var n = cur.getAttribute('data-frame') || '00';
      var reel = cur.getAttribute('data-reel') || '01';
      var label = cur.getAttribute('data-label') || '';
      if (railNow) railNow.textContent = 'FRAME ' + n;
      if (railReel) railReel.textContent = 'REEL ' + reel;
      if (slug) slug.innerHTML = '<b>' + esc(label) + '</b> · Reel ' + esc(reel);
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* =======================================================================
     3 · KEYBOARD NAVIGATION — ↑ ↓ · J K · Home End
  ======================================================================== */
  function wireKeys() {
    var frames = $$('.frame');
    function goto(dir) {
      var y = window.scrollY + 4;
      var target = null;
      if (dir > 0) {
        for (var i = 0; i < frames.length; i++) { if (frames[i].offsetTop > y + 10) { target = frames[i]; break; } }
      } else {
        for (var j = frames.length - 1; j >= 0; j--) { if (frames[j].offsetTop < y - 10) { target = frames[j]; break; } }
      }
      if (target) window.scrollTo({ top: target.offsetTop, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    document.addEventListener('keydown', function (e) {
      var t = e.target;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/).test(t.tagName)) return;
      if ($('#indexPanel') && $('#indexPanel').getAttribute('data-open') === 'true') return;
      if (e.key === 'ArrowDown' || e.key === 'j' || e.key === 'J' || e.key === 'PageDown') { e.preventDefault(); goto(1); }
      else if (e.key === 'ArrowUp' || e.key === 'k' || e.key === 'K' || e.key === 'PageUp') { e.preventDefault(); goto(-1); }
      else if (e.key === 'Home') { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); }
      else if (e.key === 'End') { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' }); }
    });
  }

  /* =======================================================================
     4 · REVEAL ON SCROLL
  ======================================================================== */
  function wireReveal() {
    var els = $$('[data-rv]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* Animate bar-chart fills once they scroll into view */
  function wireBars() {
    var bars = $$('.crow__fill, .fstep__bar');
    function run(el) {
      var w = el.getAttribute('data-w');
      if (w) el.style.width = w;
      var sx = el.getAttribute('data-sx');
      if (sx) el.style.transform = 'scaleX(' + sx + ')';
    }
    if (reduceMotion || !('IntersectionObserver' in window)) { bars.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.2 });
    bars.forEach(function (el) {
      el.style.transition = 'width .9s cubic-bezier(.22,.61,.36,1), transform .9s cubic-bezier(.22,.61,.36,1)';
      io.observe(el);
    });
  }

  /* =======================================================================
     5 · VIDEO COMPONENT — click to load, never autoplay
  ======================================================================== */
  function videoSlot(v, opts) {
    opts = opts || {};
    var wide = /16\s*[:\/]\s*9/.test(v.format || '') || /16 \/ 9/.test(v.aspectRatio || '');
    var embed = toDriveEmbed(v.driveUrl);
    var hasThumb = !isToken(v.thumbnail);
    var titleTok = isToken(v.title), descTok = isToken(v.description);

    var media;
    if (embed) {
      media =
        '<button class="vslot__play" data-embed="' + esc(embed) + '" data-direct="' + (isDirectVideo(embed) ? '1' : '0') + '" ' +
        'aria-label="Play ' + esc(titleTok ? 'reference video' : v.title) + '">' +
        (hasThumb ? '<img src="' + esc(v.thumbnail) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
        '<i><svg viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0l12 7-12 7z"/></svg></i>' +
        '</button>';
    } else if (hasThumb) {
      media =
        '<img src="' + esc(v.thumbnail) + '" alt="' + esc(titleTok ? '' : v.title) + '" loading="lazy" onerror="this.style.display=\'none\'">';
    } else {
      /* Unfilled slot. Reads as a designed frame, not as a missing asset —
         the token itself stays in content.js where it belongs. */
      media =
        '<div class="vslot__empty">' +
          '<span class="ico"><svg width="10" height="12" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M0 0l12 7-12 7z"/></svg></span>' +
          '<span class="ratio">' + esc(wide ? '16 : 9' : '9 : 16') + '</span>' +
        '</div>';
    }

    var tags = [];
    if (v.platform) tags.push(v.platform);
    if (v.format) tags.push(v.format);
    if (v.credit && !isToken(v.credit)) tags.push(v.credit);

    return '<figure class="vslot' + (wide ? ' vslot--wide' : '') + '">' +
      '<div class="vslot__media">' + media + '</div>' +
      '<figcaption class="vslot__meta">' +
        '<span class="vslot__t' + (titleTok ? ' is-empty' : '') + '">' +
          esc(titleTok ? 'Reference film' : v.title) + '</span>' +
        (descTok ? '' : '<span class="vslot__d">' + esc(v.description) + '</span>') +
        (tags.length ? '<span class="vslot__tags">' + tags.map(function (t) {
          return '<span class="vslot__tag">' + esc(t) + '</span>';
        }).join('') + '</span>' : '') +
        (v.externalUrl && !isToken(v.externalUrl)
          ? '<a href="' + esc(v.externalUrl) + '" target="_blank" rel="noopener" class="vslot__tag" style="justify-self:start;margin-top:4px">Reference ↗</a>'
          : '') +
      '</figcaption></figure>';
  }

  function wireVideoPlay() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.vslot__play, .vscard__play');
      if (!btn) return;
      var src = btn.getAttribute('data-embed');
      if (!src) return;
      var host = btn.parentNode;
      var el;
      if (btn.getAttribute('data-direct') === '1') {
        el = document.createElement('video');
        el.src = src; el.controls = true; el.playsInline = true; el.autoplay = true; el.muted = false;
      } else {
        el = document.createElement('iframe');
        el.src = src;
        el.allow = 'autoplay; encrypted-media; fullscreen';
        el.setAttribute('allowfullscreen', '');
        el.setAttribute('title', btn.getAttribute('aria-label') || 'Reference video');
        el.setAttribute('loading', 'lazy');
      }
      /* If the embed fails, keep the frame intact and say so. */
      el.addEventListener('error', function () {
        var err = document.createElement('div');
        err.className = 'vslot__err';
        err.textContent = 'Video could not load. Check the Drive link is shared as “Anyone with the link”.';
        host.appendChild(err);
      });
      btn.remove();
      host.appendChild(el);
    });
  }

  /* =======================================================================
     6 · RENDERERS
  ======================================================================== */

  function renderLearned() {
    var el = $('#learnedGrid');
    if (el && typeof LEARNED !== 'undefined') {
      el.innerHTML = LEARNED.map(function (m, i) {
        return '<div class="stat" data-rv data-d="' + (i % 4) + '">' +
          '<div class="stat__n">' + esc(m.stat) + '</div>' +
          '<p class="stat__l">' + esc(m.label) + '</p>' +
          '<p class="stat__d">' + esc(m.detail) + '</p></div>';
      }).join('');
    }
    var s = $('#learnedSource');
    if (s && typeof LEARNED_SOURCE !== 'undefined') s.textContent = LEARNED_SOURCE;
  }

  function renderTrend() {
    var el = $('#trendChart');
    if (!el || typeof KPI_TREND === 'undefined') return;
    var max = Math.max.apply(null, KPI_TREND.months.map(function (m) { return m.views; }));
    el.innerHTML = KPI_TREND.months.map(function (m) {
      return '<div class="crow"><span class="crow__m">' + esc(m.m) + '</span>' +
        '<span class="crow__track"><span class="crow__fill" data-w="' + ((m.views / max) * 100).toFixed(1) + '%"></span></span>' +
        '<span class="crow__v">' + fmt(m.views) + '</span></div>';
    }).join('');
  }

  function renderSearch() {
    var el = $('#searchChart');
    if (!el || typeof SEARCH_TREND === 'undefined') return;
    el.innerHTML = SEARCH_TREND.points.map(function (p) {
      return '<div class="crow"><span class="crow__m">' + esc(p.m) + '</span>' +
        '<span class="crow__track"><span class="crow__fill' + (p.v > 50 ? '' : ' crow__fill--alt') + '" data-w="' + p.v + '%"></span></span>' +
        '<span class="crow__v">' + p.v + '%</span></div>';
    }).join('');
    var n = $('#searchNote'); if (n) n.textContent = SEARCH_TREND.note;
  }

  function renderProof() {
    if (typeof CONTENT_PROOF === 'undefined') return;
    var h = $('#proofHead'); if (h) h.textContent = CONTENT_PROOF.headline;
    var r = $('#proofReading'); if (r) r.textContent = CONTENT_PROOF.reading;
    var t = $('#proofTable');
    if (t) {
      t.innerHTML = '<thead><tr><th>Content type</th><th>Views</th><th>Likes</th><th>Engagement</th></tr></thead><tbody>' +
        CONTENT_PROOF.rows.map(function (row) {
          var cls = row.bad ? ' class="num bad"' : row.good ? ' class="num good"' : ' class="num"';
          return '<tr><td>' + esc(row.type) + '</td><td class="num">' + esc(row.views) + '</td>' +
                 '<td' + cls + '>' + esc(row.likes) + '</td><td' + cls + '>' + esc(row.rate) + '</td></tr>';
        }).join('') + '</tbody>';
    }
  }

  function renderMarket() {
    var el = $('#marketGrid');
    if (el && typeof MARKET !== 'undefined') {
      el.innerHTML = MARKET.map(function (m, i) {
        return '<div class="stat" data-rv data-d="' + (i % 4) + '">' +
          '<div class="stat__n">' + esc(m.stat) + '</div>' +
          '<p class="stat__l">' + esc(m.label) + '</p>' +
          '<p class="stat__d">' + esc(m.detail) + '</p>' +
          '<p class="stat__s">' + esc(m.source) + '</p></div>';
      }).join('');
    }

    if (typeof COMPETITIVE === 'undefined') return;
    var intro = $('#compIntro'); if (intro) intro.textContent = COMPETITIVE.intro;
    var read = $('#compRead'); if (read) read.textContent = COMPETITIVE.read;
    var t = $('#compTable');
    if (t) {
      t.innerHTML = '<thead><tr><th>Chain</th><th>Owner</th><th>UAE footprint</th><th>What they sell</th></tr></thead><tbody>' +
        COMPETITIVE.rows.map(function (r) {
          return '<tr' + (r.us ? ' data-us="true"' : '') + '><td>' + esc(r.name) + '</td>' +
            '<td>' + esc(r.owner) + '</td><td>' + esc(r.scale) + '</td><td>' + esc(r.angle) + '</td></tr>';
        }).join('') + '</tbody>';
    }

    var a = $('#advantage');
    if (a && typeof ADVANTAGE !== 'undefined') {
      a.innerHTML = '<h3 class="advantage__t">' + esc(ADVANTAGE.title) + '</h3>' +
        '<p>' + esc(ADVANTAGE.body) + '</p><p>' + esc(ADVANTAGE.action) + '</p>';
    }
  }

  function renderObjectives() {
    var el = $('#objectivesList');
    if (!el || typeof OBJECTIVES === 'undefined') return;
    el.innerHTML = OBJECTIVES.map(function (o) {
      return '<div class="occ occ--obj" data-rv>' +
        '<div><h3 class="occ__n"><span class="occ__num">' + esc(o.n) + '</span>' + esc(o.title) + '</h3></div>' +
        '<div class="occ__bits" style="grid-template-columns:1fr">' +
          '<div class="occ__bit"><p>' + esc(o.body) + '</p></div>' +
          '<div class="occ__bit"><h4>How we read it</h4><p>' + esc(o.kpi) + '</p></div>' +
        '</div></div>';
    }).join('');
  }

  function renderOccasions() {
    var el = $('#occasions-list');
    if (el && typeof OCCASIONS !== 'undefined') {
      el.innerHTML = OCCASIONS.map(function (o) {
        return '<div class="occ" data-rv>' +
          '<div><h3 class="occ__n">' + esc(o.name) + '</h3><span class="occ__moment">' + esc(o.moment) + '</span></div>' +
          '<div class="occ__bits">' +
            '<div class="occ__bit"><h4>Who</h4><p>' + esc(o.who) + '</p></div>' +
            '<div class="occ__bit"><h4>What they want</h4><p>' + esc(o.motivation) + '</p></div>' +
            '<div class="occ__bit" style="grid-column:1/-1"><h4>What stops them</h4><p>' + esc(o.barrier) + '</p></div>' +
          '</div>' +
          '<div><span class="occ__pillar">' + esc(o.pillar) + '</span></div></div>';
      }).join('');
    }
    var n = $('#audienceNote');
    if (n && typeof AUDIENCE_NOTE !== 'undefined') n.textContent = AUDIENCE_NOTE;
  }

  function renderPlatforms() {
    var el = $('#platforms-list');
    if (!el || typeof PLATFORMS === 'undefined') return;
    el.innerHTML = PLATFORMS.map(function (p) {
      var bits = [
        ['Audience', p.audience], ['Our role', p.brand], ['Formats', p.formats],
        ['Posting rhythm', p.posting], ['Weekly mix', p.mix], ['Paid', p.paid],
        ['What we watch', p.kpis]
      ];
      return '<div class="plat" data-rv>' +
        '<div><h3 class="plat__name">' + esc(p.name) + '</h3>' +
        '<p class="plat__role">' + esc(p.role) + '</p>' +
        '<p class="plat__cadence">' + esc(p.cadence) + '</p>' +
        '<span class="plat__pri">' + esc(p.priority) + '</span>' +
        '<p class="plat__owner">Run by ' + esc(p.owner) + '</p></div>' +
        '<div class="plat__body">' +
          bits.map(function (b) {
            return '<div class="plat__bit"><h4>' + esc(b[0]) + '</h4><p>' + esc(b[1]) + '</p></div>';
          }).join('') +
          (p.flag ? '<div class="plat__flag">' + esc(p.flag) + '</div>' : '') +
        '</div></div>';
    }).join('');
  }

  function renderStrip() {
    var el = $('#expTrack');
    if (!el || typeof EXPERIENCE_STRIP === 'undefined' || typeof IMAGES === 'undefined') return;
    function run() {
      return EXPERIENCE_STRIP.map(function (k) {
        var p = IMAGES.photo[k];
        if (!p) return '';
        return '<figure><img src="' + esc(p.src) + '" alt="' + esc(p.alt) + '" loading="lazy" decoding="async"></figure>';
      }).join('');
    }
    /* Two identical runs, animated -50% — the loop has no visible seam. */
    el.innerHTML = run() + run();
    el.setAttribute('aria-hidden', 'false');
  }

  function renderProduction() {
    if (typeof MONTHLY_PRODUCTION === 'undefined') return;
    var t = $('#productionTable');
    if (t) {
      t.innerHTML = '<thead><tr><th>What we make</th><th>How much</th><th>Where it goes</th><th>Who makes it</th></tr></thead><tbody>' +
        MONTHLY_PRODUCTION.rows.map(function (r) {
          return '<tr><td>' + esc(r.what) + (r.detail ? '<span class="prod__d">' + esc(r.detail) + '</span>' : '') + '</td>' +
            '<td class="num">' + esc(r.volume) + '</td><td>' + esc(r.where) + '</td><td>' + esc(r.owner) + '</td></tr>';
        }).join('') + '</tbody>';
    }
    var n = $('#productionNote'); if (n) n.textContent = MONTHLY_PRODUCTION.note;
  }

  function renderWeekly() {
    if (typeof WEEKLY_OUTPUT === 'undefined') return;
    var t = $('#weeklyTable');
    if (t) {
      t.innerHTML = '<thead><tr><th>Platform</th><th>Every week</th><th>Produced</th><th>Run by</th></tr></thead><tbody>' +
        WEEKLY_OUTPUT.rows.map(function (r) {
          return '<tr><td>' + esc(r.platform) + '</td><td class="num">' + esc(r.volume) + '</td>' +
            '<td>' + esc(r.origin) + '</td><td>' + esc(r.owner) + '</td></tr>';
        }).join('') + '</tbody>';
    }
    var n = $('#weeklyNote'); if (n) n.textContent = WEEKLY_OUTPUT.note;
  }

  function renderSnapchat() {
    if (typeof SNAPCHAT === 'undefined') return;
    var s = SNAPCHAT;
    var i = $('#snapIntro'); if (i) i.textContent = s.intro;

    var why = $('#snapWhy');
    if (why) {
      why.innerHTML = s.why.map(function (w, k) {
        return '<div class="card" data-rv data-d="' + k + '"><h3>' + esc(w.t) + '</h3><p>' + esc(w.d) + '</p></div>';
      }).join('');
    }

    var wk = $('#snapWeek');
    if (wk) {
      wk.innerHTML = '<thead><tr><th>When</th><th>What</th><th>How</th></tr></thead><tbody>' +
        s.week.map(function (r) {
          return '<tr><td>' + esc(r.day) + '</td><td>' + esc(r.what) + '</td><td>' + esc(r.how) + '</td></tr>';
        }).join('') + '</tbody>';
    }

    var ru = $('#snapRules');
    if (ru) ru.innerHTML = s.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('');

    var st = $('#snapSetup');
    if (st) {
      st.innerHTML = s.setup.map(function (x) {
        return '<div class="setrow"><b>' + esc(x.t) + '</b><span>' + esc(x.d) + '</span></div>';
      }).join('');
    }

    var wf = $('#snapWorkflow'); if (wf) wf.textContent = s.workflow;
    var me = $('#snapMeasure'); if (me) me.textContent = s.measure;
  }

  /* Reference films can carry an optional `group`. Consecutive films sharing a
     group render under one small label — which is what stops a twelve-film
     pillar reading as an undifferentiated wall. Ungrouped films just render. */
  function videoGroups(videos) {
    var groups = [];
    videos.forEach(function (v) {
      var name = v.group || '';
      var last = groups[groups.length - 1];
      if (last && last.name === name) last.items.push(v);
      else groups.push({ name: name, items: [v] });
    });
    return groups.map(function (g) {
      return (g.name ? '<p class="vids__group">' + esc(g.name) + '</p>' : '') +
        '<div class="vids">' + g.items.map(function (v) { return videoSlot(v); }).join('') + '</div>';
    }).join('');
  }

  function renderPillars() {
    var el = $('#pillars-list');
    if (!el || typeof PILLARS === 'undefined') return;
    el.innerHTML = PILLARS.map(function (p) {
      var imgKey = (typeof PILLAR_IMAGES !== 'undefined') ? PILLAR_IMAGES[p.id] : null;
      var photo  = (imgKey && typeof IMAGES !== 'undefined') ? IMAGES.photo[imgKey] : null;
      /* When a banner exists it carries the number, name and line, so the
         text header below would only repeat itself. Fall back to the plain
         header if a pillar has no photo assigned. */
      var head = photo
        ? '<div class="pillar__banner" data-rvimg data-parallax-soft>' +
            '<img src="' + esc(photo.src) + '" alt="' + esc(photo.alt) + '" loading="lazy" decoding="async"' +
              (photo.pos ? ' style="object-position:' + esc(photo.pos) + '"' : '') + '>' +
            '<div class="pbn">' +
              '<span class="pbn__n">Pillar ' + esc(p.n) + '</span>' +
              '<h3 class="pbn__t">' + esc(p.name) + '</h3>' +
              '<p class="pbn__l">' + esc(p.line) + '</p>' +
            '</div>' +
          '</div>'
        : '<header class="pillar__head" data-rv>' +
            '<div class="pillar__n">' + esc(p.n) + '</div>' +
            '<div><h3 class="pillar__name">' + esc(p.name) + '</h3>' +
            '<p class="pillar__line">' + esc(p.line) + '</p></div>' +
          '</header>';

      return '<article class="pillar" id="pillar-' + esc(p.id) + '">' +
        head +
        '<div class="pillar__grid">' +
          '<div data-rv>' +
            '<div class="pblock"><h4>What it is for</h4><p>' + esc(p.role) + '</p></div>' +
            '<div class="pblock"><h4>Why it works</h4><p>' + esc(p.insight) + '</p></div>' +
            '<div class="pblock"><h4>Tone</h4><p>' + esc(p.territory) + '</p></div>' +
            '<div class="pblock"><h4>What belongs here</h4><p>' + esc(p.includes) + '</p></div>' +
            '<div class="pblock"><h4>Look and production</h4><p>' + esc(p.production) + '</p></div>' +
            '<div class="pblock"><h4>Platforms</h4><p>' + esc(p.platforms) + '</p></div>' +
          '</div>' +
          '<div data-rv data-d="1">' +
            '<div class="pblock"><h4>Recurring formats</h4>' +
              p.formats.map(function (f) {
                return '<div class="fmt"><b>' + esc(f.name) + '</b><span>' + esc(f.desc) + '</span></div>';
              }).join('') + '</div>' +
            '<div class="pblock"><h4>Examples</h4><ul>' +
              p.executions.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
            '<div class="pblock"><h4>How we measure it</h4><p>' + esc(p.measurement) + '</p></div>' +
          '</div>' +
        '</div>' +
        (p.note ? '<div class="pflag" data-rv>' + esc(p.note) + '</div>' : '') +
        '<div class="pblock" style="margin-top:26px" data-rv><h4>Reference films</h4>' +
          videoGroups(p.videos) +
        '</div></article>';
    }).join('');
  }

  function renderFormatsTable() {
    var t = $('#formatsTable');
    if (!t || typeof FORMATS_GRID === 'undefined') return;
    t.innerHTML = '<thead><tr><th>Format</th><th>Pillar</th><th>Cadence</th><th>Platform</th><th>What it does</th></tr></thead><tbody>' +
      FORMATS_GRID.map(function (f) {
        return '<tr><td>' + esc(f.name) + '</td><td>' + esc(f.pillar) + '</td>' +
          '<td class="num">' + esc(f.cadence) + '</td><td class="num">' + esc(f.platform) + '</td>' +
          '<td>' + esc(f.job) + '</td></tr>';
      }).join('') + '</tbody>';
  }

  function renderCampaigns() {
    var el = $('#campaignGrid');
    if (!el || typeof CAMPAIGNS === 'undefined') return;
    el.innerHTML = CAMPAIGNS.map(function (c, i) {
      return '<div class="card" data-rv data-d="' + (i % 2) + '">' +
        '<p class="mono" style="color:var(--beam);margin-bottom:9px">' + esc(c.when) + '</p>' +
        '<h3>' + esc(c.title) + '</h3><p>' + esc(c.body) + '</p></div>';
    }).join('');
  }

  function renderPaidModel() {
    var el = $('#paidModel');
    if (!el || typeof PAID_MODEL === 'undefined') return;
    el.innerHTML = PAID_MODEL.map(function (p) {
      var colour = p.tone === 'bad' ? 'var(--critical-ink)' : p.tone === 'good' ? 'var(--beam-ink)' : 'var(--bone-txt-3)';
      return '<div class="occ occ--paid" data-rv>' +
        '<div><span class="occ__moment" style="color:' + colour + '">' + esc(p.layer) + '</span></div>' +
        '<div><p class="occ__pbody">' + esc(p.body) + '</p></div></div>';
    }).join('');
  }

  function renderJourney() {
    var el = $('#journeyFlow');
    if (el && typeof JOURNEY_STEPS !== 'undefined') {
      el.innerHTML = JOURNEY_STEPS.map(function (s, i) {
        return '<div class="jstepc" data-tone="' + esc(s.tone) + '">' +
          '<span class="jstepc__i">' + (i + 1) + '</span>' +
          '<span class="jstepc__l">' + esc(s.label) + '</span>' +
          (s.note ? '<span class="jstepc__n">' + esc(s.note) + '</span>' : '') +
          '</div>';
      }).join('');
    }
  }

  function renderBooking() {
    var m = $('#bookingMessage');
    if (m && typeof BOOKING_MESSAGE !== 'undefined') m.textContent = BOOKING_MESSAGE;
    var c = $('#bookingClose');
    if (c && typeof BOOKING_CLOSE !== 'undefined') c.textContent = BOOKING_CLOSE;
    var el = $('#bookingFindings');
    if (!el || typeof BOOKING_FINDINGS === 'undefined') return;
    el.innerHTML = BOOKING_FINDINGS.map(function (f, i) {
      return '<div class="card" data-rv data-d="' + (i % 2) + '">' +
        '<p class="mono" style="color:var(--beam-ink);margin-bottom:9px">' + ('0' + (i + 1)) + '</p>' +
        '<h3>' + esc(f.title) + '</h3><p>' + esc(f.body) + '</p>' +
        '<p class="mono" style="margin-top:14px">' + esc(f.gain) + '</p></div>';
    }).join('');
  }

  function renderVisual() {
    var el = $('#visualPrinciples');
    if (el && typeof VISUAL_PRINCIPLES !== 'undefined') {
      el.innerHTML = VISUAL_PRINCIPLES.map(function (p, i) {
        return '<div class="card" data-rv data-d="' + (i % 3) + '">' +
          '<p class="mono" style="color:var(--beam);margin-bottom:10px">' + esc(p.n) + '</p>' +
          '<h3>' + esc(p.title) + '</h3><p>' + esc(p.body) + '</p></div>';
      }).join('');
    }
    var g = $('#visualExamples');
    if (g && typeof VISUAL_SYSTEM_EXAMPLES !== 'undefined') {
      /* No hero emphasis here: these are four finished pieces of equal
         standing, and a spanning card would only break the grid. */
      g.innerHTML = VISUAL_SYSTEM_EXAMPLES.map(function (x) {
        return assetCard(x, false);
      }).join('');
    }
  }

  /* Shared placeholder component for design examples */
  function assetCard(x, hero) {
    var ratio = x.aspectRatio || '4 / 5';
    var filled = !isToken(x.assetUrl);
    var media;

    if (filled && x.type === 'video') {
      var embed = toDriveEmbed(x.assetUrl);
      media = embed
        ? '<button class="vscard__play vslot__play" data-embed="' + esc(embed) + '" data-direct="' + (isDirectVideo(embed) ? '1' : '0') + '" aria-label="Play ' + esc(x.title) + '">' +
          (!isToken(x.thumbnailUrl) ? '<img src="' + esc(x.thumbnailUrl) + '" alt="" loading="lazy">' : '') +
          '<i><svg viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0l12 7-12 7z"/></svg></i></button>'
        : placeholder(x, ratio);
    } else if (filled) {
      media = '<img src="' + esc(x.assetUrl) + '" alt="' + esc(x.alt || x.title) + '" loading="lazy" decoding="async">';
    } else {
      media = placeholder(x, ratio);
    }

    var tags = [];
    if (x.platform) tags.push(x.platform);
    if (x.format) tags.push(x.format);
    if (x.pillar && x.pillar !== '—') tags.push(x.pillar);

    return '<figure class="vscard' + (hero ? ' vscard--hero' : '') + '">' +
      '<div class="vscard__media" style="aspect-ratio:' + esc(ratio) + '">' + media +
        '<span class="vscard__corner" aria-hidden="true"></span>' +
        '<span class="vscard__corner vscard__corner--br" aria-hidden="true"></span>' +
      '</div>' +
      '<figcaption class="vscard__meta">' +
        (x.title && !isToken(x.title) ? '<span class="vscard__name">' + esc(x.title) + '</span>' : '') +
        (x.rationale ? '<span class="vscard__r">' + esc(x.rationale) + '</span>' : '') +
        (tags.length ? '<span class="vscard__tags">' + tags.map(function (t) {
          return '<span class="vslot__tag">' + esc(t) + '</span>';
        }).join('') + '</span>' : '') +
      '</figcaption></figure>';
  }

  function placeholder(x, ratio) {
    return '<div class="vscard__ph">' +
      '<span class="spec">' + esc(String(ratio).replace('/', ':')) + (x.format ? ' · ' + esc(x.format) : '') + '</span>' +
      '</div>';
  }

  function renderCalendar() {
    var el = $('#timeline');
    if (!el || typeof CALENDAR === 'undefined') return;
    el.innerHTML = CALENDAR.map(function (c) {
      return '<div class="tlrow" data-tier="' + esc(c.tier) + '" data-rv>' +
        '<div class="tlrow__m">' + esc(c.month) + '</div>' +
        '<div><h3 class="tlrow__t">' + esc(c.title) + '</h3><p class="tlrow__n">' + esc(c.notes) + '</p></div>' +
        '<div class="tlrow__f">' + esc(c.films || '') + '</div></div>';
    }).join('');

    var bar = $('#intensity');
    if (bar) {
      var h = { peak: 100, high: 74, mid: 48, build: 30, low: 18 };
      bar.innerHTML = CALENDAR.map(function (c) {
        return '<i data-t="' + esc(c.tier) + '" style="height:' + (h[c.tier] || 30) + '%" title="' + esc(c.month) + '"></i>';
      }).join('');
    }
  }

  function renderMetrics() {
    var note = $('#metricsNote');
    if (note && typeof METRICS_NOTE !== 'undefined') note.textContent = METRICS_NOTE;
    var fn = $('#metricsFootnote');
    if (fn && typeof METRICS_FOOTNOTE !== 'undefined') fn.textContent = METRICS_FOOTNOTE;

    var el = $('#metrics');
    if (!el || typeof METRICS === 'undefined') return;
    el.innerHTML = METRICS.map(function (m, i) {
      return '<div class="mtier" data-rv data-d="' + (i % 3) + '">' +
        '<div class="mtier__h"><h3 class="mtier__t">' + esc(m.tier) + '</h3></div>' +
        '<p class="mtier__l">' + esc(m.lens) + '</p>' +
        '<ul>' + m.items.map(function (it) {
          return '<li><b>' + esc(it.k) + '</b><span>' + esc(it.note) + '</span></li>';
        }).join('') + '</ul></div>';
    }).join('');
  }

  function renderNinety() {
    var el = $('#ninetyDays');
    if (!el || typeof NINETY_DAYS === 'undefined') return;
    el.innerHTML = NINETY_DAYS.map(function (d, i) {
      return '<div class="band" data-rv data-d="' + i + '">' +
        '<p class="horizon">' + esc(d.phase) + '</p>' +
        '<h3>' + esc(d.title) + '</h3>' +
        '<ul style="margin-top:12px">' + d.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
  }


  /* =======================================================================
     8 · PARALLAX
     Background plates drift slower than the page. Transform only, so it never
     triggers layout. Disabled outright when the user asks for reduced motion.
  ======================================================================== */
  function wireParallax() {
    if (reduceMotion) return;
    var layers = $$('[data-parallax] img, [data-parallax-soft] img');
    if (!layers.length) return;

    var visible = [];
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var host = en.target.closest('[data-parallax], [data-parallax-soft]');
          var i = visible.indexOf(host);
          if (en.isIntersecting && i === -1) visible.push(host);
          else if (!en.isIntersecting && i > -1) visible.splice(i, 1);
        });
        if (visible.length) tick();
      }, { rootMargin: '15% 0px' });
      layers.forEach(function (l) { io.observe(l); });
    } else {
      visible = layers.map(function (l) { return l.parentNode; });
    }

    var ticking = false;
    function tick() {
      ticking = false;
      var vh = window.innerHeight;
      for (var i = 0; i < visible.length; i++) {
        var host = visible[i];
        if (!host) continue;
        var img = host.querySelector('img');
        if (!img) continue;
        var r = host.getBoundingClientRect();
        /* -1 above the fold, +1 below it */
        var progress = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
        progress = Math.max(-1, Math.min(1, progress));
        var amp = host.hasAttribute('data-parallax-soft') ? 16 : 46;
        img.style.transform = 'translate3d(0,' + (progress * amp).toFixed(2) + 'px,0)';
      }
    }

    window.addEventListener('scroll', function () {
      if (!ticking && visible.length) { ticking = true; window.requestAnimationFrame(tick); }
    }, { passive: true });
    window.addEventListener('resize', tick, { passive: true });
    tick();
  }

  /* Imagery uses its own, slower reveal than the text */
  function wireImageReveal() {
    var els = $$('[data-rvimg]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* =======================================================================
     7 · BOOT
  ======================================================================== */
  function init() {
    try {
      buildIndex();
      renderLearned();
      renderTrend();
      renderSearch();
      renderProof();
      renderMarket();
      renderObjectives();
      renderOccasions();
      renderPlatforms();
      renderProduction();
      renderStrip();
      renderSnapchat();
      renderPillars();
      renderFormatsTable();
      renderCampaigns();
      renderPaidModel();
      renderJourney();
      renderBooking();
      renderVisual();
      renderCalendar();
      renderMetrics();
      renderNinety();
    } catch (err) {
      if (window.console) console.error('[Cinemacity deck] render error:', err);
    }

    wireIndex();
    wireScrollState();
    wireKeys();
    wireVideoPlay();
    wireReveal();
    wireBars();
    wireImageReveal();
    wireParallax();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
