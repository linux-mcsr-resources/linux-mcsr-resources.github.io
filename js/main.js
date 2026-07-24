fetch('resources/index.json', { cache: 'no-store' })
  .then(response => response.json())
  .then(filenames => {
    const fetchPromises = filenames.map(filename =>
      fetch(`resources/${filename}`, { cache: 'no-store' }).then(response => response.json())
    );

    return Promise.all(fetchPromises);
  })
  .then(resources => {
    const list = document.getElementById('resource-list');

    resources.forEach(resource => {
      const urlId = resource.name.trim().replace(/\s+/g, '-');
      const item = document.createElement('div');
      item.className = 'resource';
      item.id = urlId;

      item.innerHTML = `
        <div class="resource-title-row">
            <div class="resource-name"><a href="#${urlId}" class="hash-link">#</a><span class="resource-name-text">${resource.name}</span></div>
            <div class="resource-author">by ${resource.author}</div>
        </div>
        <div class="resource-description">${resource.description}</div>
        <div class="resource-buttons">
            <a href="${resource.link}" target="_blank" rel="noopener">View</a>
            ${resource.source ? `<a href="${resource.source}" target="_blank" rel="noopener">Source</a>` : ''}
        </div>
      `;

      list.appendChild(item);
    });
  });
