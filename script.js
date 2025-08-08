
// Mobile menu toggle functionality
const menuIcon = document.getElementById('menu-icon');
const navList = document.querySelector('.navlist');

if (menuIcon && navList) {
    menuIcon.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.navlist a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
(function() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('overlay');
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const table = document.getElementById('campaignTable');

  // Sidebar toggle for mobile
  function openSidebar() {
    sidebar.classList.add('sidebar--open');
    overlay.classList.add('overlay--active');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    sidebar.classList.remove('sidebar--open');
    overlay.classList.remove('overlay--active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
  toggleBtn?.addEventListener('click', () => {
    if (sidebar.classList.contains('sidebar--open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
  overlay?.addEventListener('click', closeSidebar);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar(); });

  // Table sorting
  const getCellValue = (row, key) => {
    const cell = row.querySelector(`[data-key="${key}"]`);
    if (!cell) return '';
    const raw = cell.getAttribute('data-value');
    return raw ?? cell.textContent?.trim() ?? '';
  };
  function sortTableBy(key, asc = true) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isNumeric = ['budget','spent','progress'].includes(key) || /^(\d|\$)/.test(getCellValue(rows[0], key));

    rows.sort((a, b) => {
      const aVal = getCellValue(a, key);
      const bVal = getCellValue(b, key);
      if (isNumeric) {
        const aNum = Number(String(aVal).replace(/[^0-9.-]/g, ''));
        const bNum = Number(String(bVal).replace(/[^0-9.-]/g, ''));
        return asc ? aNum - bNum : bNum - aNum;
      }
      return asc ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });

    // Re-append in sorted order
    rows.forEach(r => tbody.appendChild(r));
  }

  let currentSort = { key: null, asc: true };
  table.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-sort-key');
      if (currentSort.key === key) {
        currentSort.asc = !currentSort.asc;
      } else {
        currentSort = { key, asc: true };
      }
      sortTableBy(key, currentSort.asc);
    });
  });

  // Filtering
  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase();
    const s = statusFilter?.value || '';
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const name = row.querySelector('[data-key="name"]').textContent.toLowerCase();
      const statusText = row.querySelector('[data-key="status"]').textContent.trim();
      const matchesQuery = !q || name.includes(q);
      const matchesStatus = !s || statusText.includes(s);
      row.style.display = (matchesQuery && matchesStatus) ? '' : 'none';
    });
  }
  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);

  // Notifications close
  document.querySelectorAll('.alert__close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const alert = e.currentTarget.closest('.alert');
      alert?.parentNode?.removeChild(alert);
    });
  });

  // Prevent layout shifts: ensure table headers align with body on resize
  new ResizeObserver(() => {}).observe(document.body);
})();
