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

  // Chevron / touch: toggle on click
  document.querySelectorAll('.j10yRb, .mBHtvb').forEach(function (chevron) {
    chevron.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var submenu = submenuOf(chevron);
      if (!submenu) return;
      var isOpen = submenu.style.display === 'block';
      closeAllExcept(isOpen ? null : submenu);
      submenu.style.display = isOpen ? 'none' : 'block';
    });
  });

  // Mobile hamburger sidebar
  var hamburger = document.getElementById('s9iPrd');
  var sidebar = document.getElementById('yuynLe');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function () {
      var isOpen = sidebar.style.display === 'block';
      sidebar.style.display = isOpen ? 'none' : 'block';
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
