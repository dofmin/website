'use client';

import Link from 'next/link';
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef } from 'react';

const langsIcons = {
  ts: 'javascript-line',
  js: 'javascript-line',
  tsx: 'reactjs-line',
  jsx: 'reactjs-line',
  html: 'html5-line',
  css: 'css3-fill',
  txt: 'file-text-line',
  bash: 'terminal-box-line',
  sh: 'terminal-box-line',
  md: 'markdown-line',
  json: 'braces-line',
};

const langs = {
  ts: 'Typescript',
  js: 'Javascript',
  tsx: 'React',
  jsx: 'React',
  html: 'HTML',
  css: 'CSS',
  txt: 'Plain',
  bash: 'Terminal',
  sh: 'Terminal',
  rs: 'Rust',
  md: 'Markdown',
  json: 'JSON',
};

export const components = {
  h1: (props: any) => <h1 {...props}></h1>,
  a: (props: any) => {
    if (props.href.startsWith('http')) {
      return <Link {...props} target="_blank" passHref={true}></Link>;
    }

    return <Link {...props} prefetch={false}></Link>;
  },
  h2: (props: any) => {
    const id = props.children.toString().replace(/ /g, '-').toLowerCase();
    return (
      <h2 id={id} {...props.children.props}>
        <a href={`#${id}`}>#</a>
        {props.children}
      </h2>
    );
  },
  h3: (props: any) => <h3 {...props}></h3>,
  h4: (props: any) => <h4 {...props}></h4>,
  h5: (props: any) => <h5 {...props}></h5>,
  h6: (props: any) => <h6 {...props}></h6>,

  figure: (props: any) => {
    if (props['data-rehype-pretty-code-figure'] === '') {
      if (props.children[0]?.props['data-rehype-pretty-code-title'] !== '') {
        const lang = props.children.props['data-language'];
        const [copy, setCopy] = useState('copy');
        const ref = useRef<HTMLButtonElement>();
        return (
          <div data-rehype-pretty-code-fragment="">
            <div {...props.children.props} data-rehype-pretty-code-title="">
              <div className="code-lang">
                {/* @ts-ignore */}
                <i className={`ri-${langsIcons[lang] || langsIcons.txt}`}></i>
                {/* @ts-ignore */}
                <span>{langs[lang] || langs.txt}</span>
                <button
                  ref={ref as any}
                  className="copy-code"
                  onClick={() => {
                    const code =
                      // @ts-ignore
                      ref.current.parentNode.parentNode.parentNode.querySelector(
                        'code',
                      ).innerText;

                    window.navigator.clipboard.writeText(code).then(() => {
                      setCopy('copied!');
                      setTimeout(() => {
                        setCopy('copy');
                      }, 2000);
                    });
                  }}
                >
                  {copy}
                </button>
              </div>
            </div>
            {props.children}
          </div>
        );
      }
    }
    return <div {...props}></div>;
  },

  figcaption: (props: any) => {
    if (props['data-rehype-pretty-code-title'] === '') {
      const lang = props['data-language'];
      const [copy, setCopy] = useState('copy');
      const ref = useRef<HTMLButtonElement>();
      const title = props.children;

      return (
        <div {...props}>
          <div className="code-lang">
            {/* @ts-ignore */}
            <i className={`ri-${langsIcons[lang] || langsIcons.txt}`}></i>
            <span>{title}</span>
            <button
              ref={ref as any}
              className="copy-code"
              onClick={() => {
                const code =
                  // @ts-ignore
                  ref.current.parentNode.parentNode.parentNode.querySelector(
                    'code',
                  ).innerText;

                window.navigator.clipboard.writeText(code).then(() => {
                  setCopy('copied!');
                  setTimeout(() => {
                    setCopy('copy');
                  }, 2000);
                });
              }}
            >
              {copy}
            </button>
          </div>
        </div>
      );
    }
    return <div {...props}></div>;
  },
  pre: (props: any) => (
    <>
      <div className="code-block" style={props.style}>
        <pre {...props}></pre>
      </div>
    </>
  ),

  // custom components

  Box: (props: any) => (
    <div className={`box box-${props.type || 'info'}`}>
      <p className="box-title">{(props.type || 'info').toUpperCase()}</p>

      {props.children}
    </div>
  ),

  Badge: (props: any) => (
    <span className={`badge box-${props.type || 'info'}`}>{props.children}</span>
  ),
};
