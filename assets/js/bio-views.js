(function() {
  'use strict';

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const bioContainer = document.querySelector('.bio-container');
    if (!bioContainer) return;

    // Get view buttons
    const proseBtn = document.getElementById('view-prose');
    const listBtn = document.getElementById('view-list');
    const timelineBtn = document.getElementById('view-timeline');
    const nowBtn = document.getElementById('view-now');

    // Get filter buttons (only visible in timeline view)
    const filterAll = document.getElementById('filter-all');
    const filterWork = document.getElementById('filter-work');
    const filterProjects = document.getElementById('filter-projects');

    // Get content containers
    const proseContent = document.getElementById('bio-prose');
    const listContent = document.getElementById('bio-list');
    const timelineContent = document.getElementById('bio-timeline');
    const nowContent = document.getElementById('bio-now');

    // Get current view from URL hash or default to prose
    let currentView = 'prose';
    const hash = window.location.hash.substring(1);
    if (hash === 'list' || hash === 'timeline' || hash === 'now') {
      currentView = hash;
    }

    // Get current filter from localStorage or default to all
    let currentFilter = localStorage.getItem('bio-timeline-filter') || 'all';

    // Set initial view
    setView(currentView);
    if (currentView === 'timeline') {
      setFilter(currentFilter);
    }

    // View button event listeners
    if (proseBtn) proseBtn.addEventListener('click', () => setView('prose'));
    if (listBtn) listBtn.addEventListener('click', () => setView('list'));
    if (timelineBtn) timelineBtn.addEventListener('click', () => setView('timeline'));
    if (nowBtn) nowBtn.addEventListener('click', () => setView('now'));

    // Filter button event listeners
    if (filterAll) filterAll.addEventListener('click', () => setFilter('all'));
    if (filterWork) filterWork.addEventListener('click', () => setFilter('work'));
    if (filterProjects) filterProjects.addEventListener('click', () => setFilter('projects'));

    function setView(view) {
      currentView = view;

      // Update URL hash
      if (view === 'prose') {
        history.replaceState(null, '', window.location.pathname);
      } else {
        history.replaceState(null, '', window.location.pathname + '#' + view);
      }

      // Update button states
      [proseBtn, listBtn, timelineBtn, nowBtn].forEach(btn => {
        if (btn) btn.classList.remove('active');
      });

      if (view === 'prose' && proseBtn) proseBtn.classList.add('active');
      if (view === 'list' && listBtn) listBtn.classList.add('active');
      if (view === 'timeline' && timelineBtn) timelineBtn.classList.add('active');
      if (view === 'now' && nowBtn) nowBtn.classList.add('active');

      // Show/hide content
      if (proseContent) proseContent.style.display = view === 'prose' ? 'block' : 'none';
      if (listContent) listContent.style.display = view === 'list' ? 'block' : 'none';
      if (timelineContent) timelineContent.style.display = view === 'timeline' ? 'block' : 'none';
      if (nowContent) nowContent.style.display = view === 'now' ? 'block' : 'none';

      // Show/hide filter buttons
      const filterControls = document.querySelector('.bio-filters');
      if (filterControls) {
        filterControls.style.display = view === 'timeline' ? 'flex' : 'none';
      }

      // If switching to timeline, apply current filter
      if (view === 'timeline') {
        setFilter(currentFilter);
      }
    }

    function setFilter(filter) {
      currentFilter = filter;
      localStorage.setItem('bio-timeline-filter', filter);

      // Update filter button states
      [filterAll, filterWork, filterProjects].forEach(btn => {
        if (btn) btn.classList.remove('active');
      });

      if (filter === 'all' && filterAll) filterAll.classList.add('active');
      if (filter === 'work' && filterWork) filterWork.classList.add('active');
      if (filter === 'projects' && filterProjects) filterProjects.classList.add('active');

      // Filter timeline events
      const timelineEvents = document.querySelectorAll('.timeline-event');
      timelineEvents.forEach(event => {
        const category = event.dataset.category;
        if (filter === 'all' || category === filter) {
          event.style.display = 'block';
        } else {
          event.style.display = 'none';
        }
      });

      // Update year groups visibility
      updateYearGroups();
    }

    function updateYearGroups() {
      const yearGroups = document.querySelectorAll('.timeline-year-group');
      yearGroups.forEach(group => {
        const events = group.querySelectorAll('.timeline-event');
        let hasVisibleEvent = false;
        events.forEach(event => {
          if (event.style.display !== 'none') {
            hasVisibleEvent = true;
          }
        });
        if (!hasVisibleEvent) {
          group.style.display = 'none';
        } else {
          group.style.display = 'block';
        }
      });
    }

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function() {
      const hash = window.location.hash.substring(1);
      if (hash === 'list' || hash === 'timeline' || hash === 'now') {
        setView(hash);
      } else {
        setView('prose');
      }
    });
  }
})();

