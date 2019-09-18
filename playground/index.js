const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL = getBlobURL(css, 'text/css')
  const jsURL = getBlobURL(js, 'text/javascript')

  const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `;

  return getBlobURL(source, 'text/html')
}

const onRun = function() {
  const url = getGeneratedPageURL({
    html: html.value,
    css: css.value,
    js: js.value
  })
  
  iframe.src = url;
}

const iframe = document.querySelector('#iframe');
const run = document.querySelector('#run');
const html = document.querySelector('#html');
const css = document.querySelector('#css');
const js = document.querySelector('#js');

run.addEventListener("click", onRun);
