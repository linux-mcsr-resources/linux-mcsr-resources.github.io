Promise.all([
  fetch('resources/index.json', { cache: 'no-store' }).then(response => response.json()),
  fetch('resources/order.json', { cache: 'no-store' }).then(response => response.json()),
  fetch('resources/categories.json', { cache: 'no-store' }).then(response => response.json())
])
  .then(([allFilenames, orderedFilenames, categories]) => {
    const remaining = allFilenames
      .filter(filename => !orderedFilenames.includes(filename))
      .sort();

    const finalOrder = [...orderedFilenames, ...remaining];

    const fetchPromises = finalOrder.map(filename =>
      fetch(`resources/data/${filename}`, { cache: 'no-store' }).then(response => response.json())
    );

    return Promise.all(fetchPromises).then(resources => ({ resources, categories }));
  })
  .then(({ resources, categories }) => {
    const list = document.getElementById('resource-list');
    list.innerHTML = '';

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function renderDescription(text) {
      const escaped = escapeHtml(text);
      return escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (match, label, url) => {
        return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
      });
    }

    categories.forEach(category => {
      const categoryResources = resources.filter(resource => resource.category === category.id);

      if (categoryResources.length === 0) return;

      const seenAuthors = [];
      categoryResources.forEach(resource => {
        if (!seenAuthors.includes(resource.author)) seenAuthors.push(resource.author);
      });
      const groupedResources = [];
      seenAuthors.forEach(author => {
        groupedResources.push(...categoryResources.filter(resource => resource.author === author));
      });
      const heading = document.createElement('h2');
      heading.className = 'category-heading';
      heading.id = category.id;
      heading.innerHTML = `<a href="#${category.id}" class="hash-link">#</a><span class="category-heading-text">${category.label}</span>`;
      list.appendChild(heading);

      groupedResources.forEach(resource => {
        const urlId = resource.name.trim().toLowerCase().replace(/\s+/g, '-');
        const item = document.createElement('div');
        item.className = 'resource';
        item.id = urlId;

        const isSnippet = resource.category === 'waywall-config-snippets';

        const viewButton = isSnippet
          ? `<a href="#" class="view-snippet-btn" data-link="${resource.link}">View</a>`
          : `<a href="${resource.link}" target="_blank" rel="noopener">View</a>`;

        const copyButton = isSnippet
          ? `<a href="#" class="copy-snippet-btn" style="display:none;">Copy</a>`
          : '';

        item.innerHTML = `
          <div class="resource-title-row">
              <div class="resource-name"><a href="#${urlId}" class="hash-link">#</a><span class="resource-name-text">${resource.name}</span></div>
              <div class="resource-author">by ${resource.author}</div>
          </div>
          <div class="resource-description">${renderDescription(resource.description)}</div>
          <div class="resource-buttons">
              ${viewButton}
              ${resource.source ? `<a href="${resource.source}" target="_blank" rel="noopener">Source</a>` : ''}
              ${copyButton}
          </div>
          ${isSnippet ? `<div class="snippet-code-container" style="display:none;"></div>` : ''}
        `;

        if (isSnippet) {
          const viewBtn = item.querySelector('.view-snippet-btn');
          const copyBtn = item.querySelector('.copy-snippet-btn');
          const codeContainer = item.querySelector('.snippet-code-container');
          let loaded = false;
          let code = '';
          let copyResetTimeout = null;

          viewBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const isVisible = codeContainer.style.display !== 'none';

            if (isVisible) {
              codeContainer.style.display = 'none';
              copyBtn.style.display = 'none';
              viewBtn.textContent = 'View';
              return;
            }

            codeContainer.style.display = 'block';
            copyBtn.style.display = 'inline-block';
            viewBtn.textContent = 'Hide';

            if (loaded) return;
            loaded = true;

            codeContainer.innerHTML = `<p>Loading...</p>`;

            fetch(resource.link, { cache: 'no-store' })
              .then(response => response.text())
              .then(text => {
                code = text;
                codeContainer.innerHTML = `<pre class="snippet-code"><code class="language-lua"></code></pre>`;
                const codeEl = codeContainer.querySelector('code');
                codeEl.textContent = code;
                Prism.highlightElement(codeEl);
              })
          });

          copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!code) return;

            navigator.clipboard.writeText(code).then(() => {
              if (copyResetTimeout) clearTimeout(copyResetTimeout);
              copyBtn.textContent = 'Copied!';
              copyResetTimeout = setTimeout(() => {
                copyBtn.textContent = 'Copy';
                copyResetTimeout = null;
              }, 1500);
            });
          });
        }

        list.appendChild(item);
      });
    });

    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
