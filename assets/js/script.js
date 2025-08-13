'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile (optional)
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
if (modalContainer && modalCloseBtn && overlay) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const titleEl = this.querySelector("[data-testimonials-title]");
      const textEl = this.querySelector("[data-testimonials-text]");
      if (avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt || "";
      }
      if (titleEl) modalTitle.innerHTML = titleEl.innerHTML;
      if (textEl) modalText.innerHTML = textEl.innerHTML;
      testimonialsModalFunc();
    });
  }
  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
if (select && selectValue) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add click event to all navigation links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function() {

    // Get the lowercase text content of the clicked navigation link
    const targetPage = this.textContent.toLowerCase().trim();
    console.log("Clicked on nav link:", targetPage);
    
    // Remove active class from all navigation links
    navigationLinks.forEach(link => {
      link.classList.remove("active");
    });

    // Add active class to clicked navigation link
    this.classList.add("active");

    // Remove active class from all pages, then add it to the matching page
    pages.forEach(page => {
      const pageName = page.getAttribute("data-page");
      console.log("Checking page:", pageName);
      
      if (pageName === targetPage) {
        page.classList.add("active");
        console.log("Activating page:", pageName);
      } else {
        page.classList.remove("active");
      }
    });
  });
}

// Collapsible timeline with arrow toggle
function initTimelineCollapsible() {
  const items = document.querySelectorAll('.timeline-item');

  // Helper: split at first <br> and measure summary height precisely
  const computeCollapsedHeight = (textEl) => {
    // Normalize malformed </br> into proper <br>
    if (textEl.innerHTML && /<\/br\s*>/i.test(textEl.innerHTML)) {
      textEl.innerHTML = textEl.innerHTML.replace(/<\/br\s*>/gi, '<br>');
    }

    const cs = window.getComputedStyle(textEl);
    const lineHeight = parseFloat(cs.lineHeight) || 24;

    // If already segmented, reuse
    let summary = textEl.querySelector('.timeline-summary');
    let details = textEl.querySelector('.timeline-details');

  if (!summary) {
      const firstBr = textEl.querySelector('br');
      if (!firstBr) return lineHeight; // fallback: one line

      // Build summary and details spans
      summary = document.createElement('span');
      summary.className = 'timeline-summary';
      details = document.createElement('span');
      details.className = 'timeline-details';

      // Move nodes before first <br> into summary
      let node = textEl.firstChild;
      while (node && node !== firstBr) {
        const next = node.nextSibling;
        summary.appendChild(node);
        node = next;
      }
      // Remove the first <br>
      const after = firstBr.nextSibling;
      firstBr.remove();
      // Move remaining nodes into details
      let rest = after;
      while (rest) {
        const next = rest.nextSibling;
        details.appendChild(rest);
        rest = next;
      }
      // Move any labels and sublists that follow the row into details (preserve order)
      const parentLi = textEl.closest('li.timeline-item');
      if (parentLi) {
        const rowEl = textEl.parentElement && textEl.parentElement.classList.contains('timeline-row')
          ? textEl.parentElement
          : textEl;
        let node = rowEl.nextSibling;
        const toMove = [];
        while (node) {
          const next = node.nextSibling;
          if (node.nodeType === 1) { // element
            const cls = node.classList;
            if (cls && (cls.contains('timeline-sublist') || cls.contains('timeline-sublist-label'))) {
              toMove.push(node);
            }
          }
          node = next;
        }
        toMove.forEach(el => details.appendChild(el));
      }
      // Rebuild textEl content: summary, a separating <br>, then details
      textEl.innerHTML = '';
      textEl.appendChild(summary);
      textEl.appendChild(document.createElement('br'));
      textEl.appendChild(details);
    }

    // Measure summary height reliably
    const prevDisplay = summary.style.display;
    summary.style.display = 'inline-block';
    const height = Math.ceil(summary.getBoundingClientRect().height || lineHeight);
    summary.style.display = prevDisplay;
    return height;
  };

  items.forEach((item) => {
    // Allow per-item opt-out via class or data attribute
    const isOptedOut = item.classList.contains('no-collapse') || item.getAttribute('data-collapsible') === 'false';
    if (isOptedOut) return;

    const text = item.querySelector('.timeline-text');
    if (!text) return;

    // mark as collapsible
    text.classList.add('is-collapsible');

    // Create/ensure a row container so arrow sits next to first line
    let row = text.parentElement;
    if (!row || !row.classList.contains('timeline-row')) {
      row = document.createElement('div');
      row.className = 'timeline-row';
      text.replaceWith(row);
      row.appendChild(text);
    }

    // Find any existing toggles in item and move the first into the row; remove duplicates
    const existingToggles = item.querySelectorAll('.timeline-toggle');
    let toggle = row.querySelector('.timeline-toggle');
    if (existingToggles.length > 0) {
      toggle = existingToggles[0];
      if (toggle.parentElement !== row) {
        row.appendChild(toggle);
      }
      for (let i = 1; i < existingToggles.length; i++) existingToggles[i].remove();
    }
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'timeline-toggle';
      toggle.setAttribute('type', 'button');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<ion-icon name="chevron-down-outline"></ion-icon>';
      row.appendChild(toggle);
    }

    // Set initial collapsed height (up to first <br> if present)
    let collapsedHeight = computeCollapsedHeight(text);
    text.style.maxHeight = collapsedHeight + 'px';

    function setExpanded(expanded) {
      item.classList.toggle('expanded', expanded);
      toggle.setAttribute('aria-expanded', String(expanded));
      if (expanded) {
        text.style.maxHeight = text.scrollHeight + 'px';
      } else {
        // Recompute in case layout changed (e.g., resize)
        collapsedHeight = computeCollapsedHeight(text);
        text.style.maxHeight = collapsedHeight + 'px';
      }
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setExpanded(!item.classList.contains('expanded'));
    });

    const title = item.querySelector('.timeline-item-title');
    if (title) {
      title.style.cursor = 'pointer';
      title.addEventListener('click', () => setExpanded(!item.classList.contains('expanded')));
    }

    // Recompute collapsed heights on resize for non-expanded items
    let resizeTimer;
    window.addEventListener('resize', () => {
      if (item.classList.contains('expanded')) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        collapsedHeight = computeCollapsedHeight(text);
        text.style.maxHeight = collapsedHeight + 'px';
      }, 150);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimelineCollapsible);
} else {
  // DOM is already ready
  initTimelineCollapsible();
}