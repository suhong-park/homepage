(function () {
  function closeAllExcept(exceptEl) {
    document.querySelectorAll('.oGuwee').forEach(function (sub) {
      if (sub !== exceptEl) sub.style.display = 'none';
    });
  }

  function submenuOf(el) {
    var li = el.closest('li');
    return li ? li.querySelector(':scope > .oGuwee') : null;
  }

  // Desktop: open on hover
  document.querySelectorAll('li.VsJjtf').forEach(function (li) {
    var submenu = li.querySelector(':scope > .oGuwee');
    if (!submenu) return;
    li.addEventListener('mouseenter', function () {
      closeAllExcept(submenu);
      submenu.style.display = 'block';
    });
    li.addEventListener('mouseleave', function () {
      submenu.style.display = 'none';
    });
  });

  // Chevron / touch: toggle on click. Category links have no href (they're
  // labels, not destinations) and visually overlap the small chevron icon,
  // so bind the same handler to both — whichever the user actually taps.
  document.querySelectorAll('.j10yRb, .mBHtvb, a[aria-haspopup="true"]').forEach(function (chevron) {
    chevron.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var submenu = submenuOf(chevron);
      if (!submenu) return;
      var isOpen = submenu.style.display === 'block';
      closeAllExcept(isOpen ? null : submenu);
      submenu.style.display = isOpen ? 'none' : 'block';
      if (!isOpen) {
        submenu.querySelectorAll('*').forEach(function (el) {
          if (getComputedStyle(el).opacity === '0') el.style.opacity = '1';
        });
      }
    });
  });

  // Mobile hamburger sidebar
  // Google's own stylesheet leaves this <nav> at its normal-flow static
  // position (off the left edge of the viewport) when merely toggling
  // display; the original JS also applied fixed positioning to slide it
  // into view. We replicate that explicitly instead of relying on rules
  // that only existed in the removed script.
  var hamburger = document.getElementById('s9iPrd');
  var sidebar = document.getElementById('yuynLe');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function () {
      var isOpen = sidebar.style.display === 'block';
      if (isOpen) {
        sidebar.style.display = 'none';
      } else {
        sidebar.style.display = 'block';
        sidebar.style.position = 'fixed';
        sidebar.style.top = '0';
        sidebar.style.left = '0';
        sidebar.style.right = 'auto';
        sidebar.style.height = '100vh';
        sidebar.style.overflowY = 'auto';
        sidebar.style.zIndex = '9999';
        // Item rows sit at opacity:0 as the resting state of an entrance
        // animation Google's own JS used to trigger on open; without that
        // JS they never fade in, so force them visible.
        sidebar.querySelectorAll('*').forEach(function (el) {
          if (getComputedStyle(el).opacity === '0') el.style.opacity = '1';
        });
      }
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // Click outside closes open dropdowns
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.VsJjtf') && !e.target.closest('.JzO0Vc')) {
      closeAllExcept(null);
    }
  });
})();
